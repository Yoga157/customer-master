import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IPOCRequirementTableRow from 'selectors/funnel-poc-requirement/models/IPOCRequirementTableRow';
import { Confirm, Dropdown, Table } from 'semantic-ui-react';
import * as POCRequirementActions from 'stores/funnel-poc-requirement/POCRequirementActions';
import ReactHtmlParser from 'react-html-parser';
import { format } from 'date-fns';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';

interface IProps {
  readonly rowData: IPOCRequirementTableRow;
}

const POCRequirementTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [typeAction, setTypeAction] = useState('');
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const showConfirm = (type: string) => {
    setOpenConfirm(true);
    setTypeAction(type);
  };

  const handleConfirm = () => {
    if (typeAction === 'DELETE') {
      dispatch(POCRequirementActions.delPOCRequirement(rowData.pocGenReqID));
    } else if (typeAction === 'COMPELETED') {
      dispatch(POCRequirementActions.putPOCRequirementCompleted(rowData.pocGenReqID, currentUser.employeeID));
    }

    const timeout = setTimeout(() => {
      dispatch(POCRequirementActions.requestPOCReqByPOCGenHID(rowData.pocGenHID, 1, 5));
      setOpenConfirm(false);
    }, 1000);

    return () => clearTimeout(timeout);
  };

  const onShowForm = () => {
    //dispatch(ModalSecondLevelActions.OPEN(<FunnelBOQForm boqGenID={rowData.boqGenID}  funnelGenID={rowData.funnelGenID} />, ModalSizeEnum.Tiny ));
  };

  const handleCancel = () => {
    setOpenConfirm(false);
  };

  return (
    <Fragment>
      <Confirm open={openConfirm} onCancel={handleCancel} onConfirm={handleConfirm} centered />
      <Table.Row key={rowData.pocGenReqID}>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item text="Edit/View" icon="edit outline" onClick={onShowForm} />
              {rowData.pocReqStatusID === 0 && <Dropdown.Item text="Completed" icon="check" onClick={() => showConfirm('COMPELETED')} />}
              <Dropdown.Item text="Delete" icon="trash alternate" onClick={() => showConfirm('DELETE')} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>{rowData.requirementType}</Table.Cell>
        <Table.Cell>{rowData.sourceType}</Table.Cell>
        <Table.Cell>{rowData.itemQty}</Table.Cell>
        <Table.Cell>{ReactHtmlParser(rowData.itemDescription)}</Table.Cell>
        <Table.Cell>{rowData.pocReqPICName}</Table.Cell>
        <Table.Cell>{rowData.pocReqStatusID}</Table.Cell>
        <Table.Cell>{rowData.lastModifyBy}</Table.Cell>
        <Table.Cell>{rowData.modifyDate === null ? '' : format(new Date(rowData.modifyDate!), 'dd-MM-yyyy')}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default POCRequirementTableRow;
