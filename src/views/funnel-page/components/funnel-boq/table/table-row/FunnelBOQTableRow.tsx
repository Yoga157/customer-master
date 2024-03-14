import React, { useState, Fragment } from 'react';
import { Table, Dropdown, Confirm } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import IBoqTableRow from 'selectors/boq/models/IBoqTableRow';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as BoqActions from 'stores/boq/BOQActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { FunnelBOQForm } from '../../form';

interface IProps {
  readonly rowData: IBoqTableRow;
}

const FunnelBOQTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;
  const [openConfirm, setOpenConfirm] = useState(false);

  const showConfirm = () => setOpenConfirm(true);
  const handleConfirm = () => {
    dispatch(BoqActions.delBoq(rowData.boqGenID));
    const timeout = setTimeout(() => {
      dispatch(BoqActions.requestBoqByFunnelGenID(rowData.funnelGenID, 1, 10));
      setOpenConfirm(false);
    }, 1000);

    return () => clearTimeout(timeout);
  };

  const onShowForm = () => {
    dispatch(ModalSecondLevelActions.OPEN(<FunnelBOQForm boqGenID={rowData.boqGenID} funnelGenID={rowData.funnelGenID} />, ModalSizeEnum.Large));
  };

  const handleCancel = () => setOpenConfirm(false);

  return (
    <Fragment>
      <Confirm open={openConfirm} onCancel={handleCancel} onConfirm={handleConfirm} centered />
      <Table.Row key={rowData.boqGenID}>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item text="Edit/View" icon="edit outline" onClick={onShowForm} />
              <Dropdown.Item text="Delete" icon="trash alternate" onClick={showConfirm} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>{rowData.productNumber}</Table.Cell>
        <Table.Cell>{rowData.serialNumber}</Table.Cell>
        <Table.Cell>{ReactHtmlParser(rowData.description)}</Table.Cell>
        <Table.Cell>{rowData.warranty + `(${rowData.warrantyDurationType})`}</Table.Cell>
        <Table.Cell>{rowData.qty}</Table.Cell>
        <Table.Cell>{rowData.brandName}</Table.Cell>
        <Table.Cell>{rowData.subBrandName}</Table.Cell>
        <Table.Cell>{rowData.coverageHour}</Table.Cell>
        <Table.Cell>{rowData.responseTimeType}</Table.Cell>
        <Table.Cell>{rowData.responseTimeValue}</Table.Cell>
        <Table.Cell>{rowData.resolutionTimeType}</Table.Cell>
        <Table.Cell>{rowData.resolutionTimeValue}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default FunnelBOQTableRow;
