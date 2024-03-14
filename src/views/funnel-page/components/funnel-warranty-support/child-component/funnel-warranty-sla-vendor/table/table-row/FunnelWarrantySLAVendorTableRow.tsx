import React, { useState, useCallback, Fragment } from 'react';
import { Table, Dropdown, Confirm } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import IFunnelWarrantySLAVendorsTableRow from 'selectors/funnel-warranty-sla-vendor/models/IFunnelWarrantySLAVendorTableRow';
import { Link } from 'react-router-dom';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import SLAVendorForm from '../../form/form-sla-vendor/SLAVendorForm';
import * as FunnelWarrantyActions from 'stores/funnel-warranty/FunnelWarrantyActions';
import FunnelWarrantySLADetailModel from 'stores/funnel-warranty/models/FunnelWarrantySLADetailModel';

interface IProps {
  readonly rowData: IFunnelWarrantySLAVendorsTableRow;
}

const FunnelWarrantySLAVendorTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [openConfirm, setOpenConfirm] = useState(false);
  //const [pageSize] = useState(5)
  //const [activePage, setActivePage] = useState(1);

  const showConfirm = () => setOpenConfirm(true);
  const handleConfirm = () => {
    setOpenConfirm(false);
    const newItems = new FunnelWarrantySLADetailModel(rowData);
    if (rowData.warrantySLAGenID > 0) {
      dispatch(FunnelWarrantyActions.delWarrantySLADetail(rowData.warrantySLADetailID));
    } else {
      dispatch(FunnelWarrantyActions.deleteWarrantyDetailLocal(newItems, rowData.warrantySLADetailID));
    }

    //dispatch(FunnelWarrantyActions.requestFunnelWarrantyDetails(rowData.warrantySLAGenID,activePage,pageSize))
  };

  const { rowData } = props;

  const onEdit = useCallback((): void => {
    dispatch(
      ModalThirdLevelActions.OPEN(
        <SLAVendorForm warrantySLAGenID={rowData.warrantySLAGenID} warrantySLADetailID={rowData.warrantySLADetailID} type="edit" />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch, rowData.warrantySLAGenID, rowData.warrantySLADetailID]);

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

export default FunnelWarrantySLAVendorTableRow;
