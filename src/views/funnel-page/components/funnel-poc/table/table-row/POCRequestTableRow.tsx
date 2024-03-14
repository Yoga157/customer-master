import React, { useState, Fragment, useCallback } from 'react';
import { Table, Dropdown, Confirm } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import IPOCTableRow from 'selectors/funnel-poc-request/models/IPOCTableRow';
import ReactHtmlParser from 'react-html-parser';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as POCActions from 'stores/funnel-poc-request/POCActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import POCFormEdit from '../../form/form-edit/POCFormEdit';

interface IProps {
  readonly rowData: IPOCTableRow;
}

const POCRequestTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [openConfirm, setOpenConfirm] = useState(false);

  const onOpenPopupChild = useCallback(
    (content: any, size: ModalSizeEnum): void => {
      dispatch(ModalSecondLevelActions.OPEN(content, size));
    },
    [dispatch]
  );

  const onShowConfirm = () => setOpenConfirm(true);
  const handleConfirm = () => {
    dispatch(POCActions.delPOC(rowData.pocGenHID));
    const timeout = setTimeout(() => {
      dispatch(POCActions.requestPOCByFunnelGenID(rowData.funnelGenID, 1, 10));
      setOpenConfirm(false);
    }, 1000);

    return () => clearTimeout(timeout);
  };

  const handleCancel = () => setOpenConfirm(false);
  const { rowData } = props;
  return (
    <Fragment>
      <Confirm open={openConfirm} onCancel={handleCancel} onConfirm={handleConfirm} centered />
      <Table.Row>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item
                text="Edit/View"
                icon="edit outline"
                onClick={() => onOpenPopupChild(<POCFormEdit pocGenHID={rowData.pocGenHID} />, ModalSizeEnum.Large)}
              />

              <Dropdown.Item text="Delete" icon="trash alternate" onClick={onShowConfirm} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>{rowData.createDate === null ? '' : format(new Date(rowData.createDate!), 'dd-MM-yyyy')}</Table.Cell>
        <Table.Cell>{rowData.requestor}</Table.Cell>
        <Table.Cell>{ReactHtmlParser(rowData.picName)}</Table.Cell>
        <Table.Cell>{rowData.pocExpectedDate === null ? '' : format(new Date(rowData.pocExpectedDate!), 'dd-MM-yyyy')}</Table.Cell>
        <Table.Cell>{rowData.pocActualDate === null ? '' : format(new Date(rowData.pocActualDate!), 'dd-MM-yyyy')}</Table.Cell>
        <Table.Cell>{rowData.pocStatus}</Table.Cell>
        <Table.Cell>{ReactHtmlParser(rowData.pocNotes)}</Table.Cell>
        <Table.Cell>{rowData.lastUpdateBy}</Table.Cell>
        <Table.Cell>{rowData.modifyDate === null ? '' : format(new Date(rowData.modifyDate!), 'dd-MM-yyyy')}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default POCRequestTableRow;
