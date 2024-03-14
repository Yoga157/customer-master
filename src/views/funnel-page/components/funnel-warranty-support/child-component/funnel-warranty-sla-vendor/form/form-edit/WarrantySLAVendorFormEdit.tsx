import React, { useCallback, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CheckBox } from 'views/components/UI';
import FunnelWarrantySLAVendorTable from '../../table/FunnelWarrantySLAVendorTable';
import SLAVendorForm from '../form-sla-vendor/SLAVendorForm';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as FunnelWarrantyActions from 'stores/funnel-warranty/FunnelWarrantyActions';
import IFunnelWarrantySLAVendorTable from 'selectors/funnel-warranty-sla-vendor/models/IFunnelWarrantySLAVendorTable';
import IStore from 'models/IStore';
import { selectFunnelWarrantyVendors } from 'selectors/funnel-warranty-sla-vendor/FunnelWarrantySLAVendorSelector';
import WarrantySLAVendorPLO from './child-edit/WarrantySLAVendorPLO';

interface IProps {
  warrantySLAGenID: number;
}

const WarrantySLAVendorFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const { warrantySLAGenID } = props;

  const onAdd = useCallback((): void => {
    dispatch(
      ModalThirdLevelActions.OPEN(<SLAVendorForm type="add" warrantySLAGenID={warrantySLAGenID} warrantySLADetailID={0} />, ModalSizeEnum.Small)
    );
  }, [dispatch, warrantySLAGenID]);
  const warrantyCustomer: IFunnelWarrantySLAVendorTable = useSelector((state: IStore) =>
    selectFunnelWarrantyVendors(state, [FunnelWarrantyActions.REQUEST_FUNNEL_WARRANTY_DETAILS])
  );
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <WarrantySLAVendorPLO />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <p style={{ fontWeight: 'bold' }}>SLA Data</p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <CheckBox label="Select All" />
        <Button type="button" icon="trash" color="blue" floated="right" size="small" content="Delete" />
        <Grid.Column>
          <Button type="button" icon="plus" color="green" floated="right" size="small" content="Add" onClick={onAdd} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <FunnelWarrantySLAVendorTable tableData={warrantyCustomer} />
      </Grid.Row>
    </Grid>
  );
};
export default WarrantySLAVendorFormEdit;
