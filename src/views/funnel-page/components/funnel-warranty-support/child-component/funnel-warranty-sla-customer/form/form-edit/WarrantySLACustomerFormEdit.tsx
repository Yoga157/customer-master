import React, { useCallback, useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { Grid } from 'semantic-ui-react';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DateInput, TextInput, CheckBox, NumberInput } from 'views/components/UI';
import FunnelWarrantySLACustomerTable from '../../table/FunnelWarrantySLACustomerTable';
import SLACustomerForm from '../form-sla-customer/SLACustomerForm';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as FunnelWarrantyActions from 'stores/funnel-warranty/FunnelWarrantyActions';
import IFunnelWarrantySLACustomerTable from 'selectors/funnel-warranty-sla-customer/models/IFunnelWarrantySLACustomerTable';
import IStore from 'models/IStore';
import { selectFunnelWarrantyCustomers } from 'selectors/funnel-warranty-sla-customer/FunnelWarrantySLACustomerSelector';
import WarrantySLACustomerPLO from './child-edit/WarrantySLACustomerPLO';

interface IProps {
  //isLocalFirst:boolean
  warrantySLAGenID: number;
}
const WarrantySLACustomerFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(5000);
  const [activePage, setActivePage] = useState(1);
  const { warrantySLAGenID } = props;

  useEffect(() => {
    dispatch(FunnelWarrantyActions.requestFunnelWarrantyDetails(+warrantySLAGenID, activePage, pageSize));
  }, [activePage, dispatch, warrantySLAGenID, pageSize]);

  const onAdd = useCallback((): void => {
    dispatch(
      ModalThirdLevelActions.OPEN(<SLACustomerForm type="add" warrantySLAGenID={warrantySLAGenID} warrantySLADetailID={0} />, ModalSizeEnum.Small)
    );
  }, [dispatch]);
  const warrantyCustomer: IFunnelWarrantySLACustomerTable = useSelector((state: IStore) =>
    selectFunnelWarrantyCustomers(state, [FunnelWarrantyActions.REQUEST_FUNNEL_WARRANTY_DETAILS])
  );
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <WarrantySLACustomerPLO />
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
        <FunnelWarrantySLACustomerTable tableData={warrantyCustomer} />
      </Grid.Row>
    </Grid>
  );
};
export default WarrantySLACustomerFormEdit;
