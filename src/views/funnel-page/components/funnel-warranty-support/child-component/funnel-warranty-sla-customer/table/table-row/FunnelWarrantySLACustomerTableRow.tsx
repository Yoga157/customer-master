import React, { useState, useCallback, Fragment } from 'react';
import { Table, Dropdown, Confirm } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IFunnelWarrantySLACustomerTableRow from 'selectors/funnel-warranty-sla-customer/models/IFunnelWarrantySLACustomerTableRow';
import { Link } from 'react-router-dom';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import SLACustomerForm from '../../form/form-sla-customer/SLACustomerForm';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as FunnelWarrantyActions from 'stores/funnel-warranty/FunnelWarrantyActions';
import IStore from 'models/IStore';

interface IProps {
  readonly rowData: IFunnelWarrantySLACustomerTableRow;
}

const FunnelWarrantySLACustomerTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [openConfirm, setOpenConfirm] = useState(false);

  const showConfirm = () => setOpenConfirm(true);
  const handleConfirm = () => {
    dispatch(FunnelWarrantyActions.delWarrantySLADetail(rowData.warrantySLADetailID));

    const timeout = setTimeout(() => {
      dispatch(FunnelWarrantyActions.requestFunnelWarrantyDetails(rowData.warrantySLAGenID, 1, 15));
      setOpenConfirm(false);
    }, 1000);

    return () => clearTimeout(timeout);
  };

  const { rowData } = props;

  const onEdit = useCallback((): void => {
    dispatch(
      ModalThirdLevelActions.OPEN(
        <SLACustomerForm warrantySLAGenID={rowData.warrantySLAGenID} warrantySLADetailID={rowData.warrantySLADetailID} type="edit" />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch]);

  const handleCancel = () => setOpenConfirm(false);

  return (
    <Fragment>
      <Confirm open={openConfirm} size="mini" onCancel={handleCancel} onConfirm={handleConfirm} centered />
      <Table.Row key={rowData.warrantySLADetailID}>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} text="View/Edit" icon="edit outline" onClick={onEdit} />
              <Dropdown.Item text="Delete" icon="trash alternate" onClick={showConfirm} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>{rowData.productNumber}</Table.Cell>
        <Table.Cell>{rowData.serviceLocation}</Table.Cell>
        <Table.Cell>{rowData.coverageHour}</Table.Cell>
        <Table.Cell>{rowData.responseTime}</Table.Cell>
        <Table.Cell>{rowData.resolutionTime}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default FunnelWarrantySLACustomerTableRow;
