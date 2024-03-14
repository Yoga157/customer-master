import React, { useState, Fragment, useCallback } from 'react';
import { Table, Dropdown, Confirm } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import IFunnelWarrantySLATableRow from 'selectors/funnel-warranty-sla/models/IFunnelWarrantySLATableRow';
import WarrantySLAFormEdit from '../../form/form-edit/WarrantySLAFormEdit';

interface IProps {
  readonly rowData: IFunnelWarrantySLATableRow;
}

const WarrantySLATableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [openConfirm, setOpenConfirm] = useState(false);

  const showConfirm = () => setOpenConfirm(true);
  const handleConfirm = () => {
    setOpenConfirm(false);
  };

  const handleCancel = () => setOpenConfirm(false);

  const onEdit = useCallback((): void => {
    dispatch(
      ModalSecondLevelActions.OPEN(<WarrantySLAFormEdit warrantySupportID={1} warrantySLAGenID={rowData.warrantySLAGenID} />, ModalSizeEnum.Small)
    );
  }, [dispatch]);
  const { rowData } = props;
  return (
    <Fragment>
      <Confirm open={openConfirm} onCancel={handleCancel} onConfirm={handleConfirm} centered />
      <Table.Row key={rowData.warrantySLAGenID}>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} text="View/Edit" icon="edit outline" onClick={onEdit} />
              <Dropdown.Item text="Delete" icon="trash alternate" onClick={showConfirm} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>{rowData.problemClassID}</Table.Cell>
        <Table.Cell>{rowData.brandID}</Table.Cell>
        <Table.Cell>{rowData.subBrandID}</Table.Cell>
        <Table.Cell>{rowData.startWarrantyVendor}</Table.Cell>
        <Table.Cell>{rowData.vendorWarranty}</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>{rowData.startWarrantyCust}</Table.Cell>
        <Table.Cell>{rowData.customerWarranty}</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default WarrantySLATableRow;
