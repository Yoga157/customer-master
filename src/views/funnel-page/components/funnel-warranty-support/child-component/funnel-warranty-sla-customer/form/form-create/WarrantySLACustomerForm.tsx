import React, { useCallback, useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { Grid, List, Segment } from 'semantic-ui-react';
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
import ButtonMicro from 'views/components/UI/Button/ButtonMicro';
import moment from 'moment';

interface IProps {}
const WarrantySLACustomerForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [warrantyEndP, setWarrantyEndP] = useState(moment().format('DD/MM/YY'));
  const [warrantyEndL, setWarrantyEndL] = useState(moment().format('DD/MM/YY'));
  const [warrantyEndO, setWarrantyEndO] = useState(moment().format('DD/MM/YY'));
  const [startCustomer, setStartCustomer] = useState('');

  useEffect(() => {
    dispatch(FunnelWarrantyActions.requestWarrantyCustomerLocal());
  }, [activePage, dispatch, pageSize]);

  const onAdd = useCallback((): void => {
    dispatch(ModalThirdLevelActions.OPEN(<SLACustomerForm type="add" warrantySLADetailID={0} warrantySLAGenID={0} />, ModalSizeEnum.Small));
  }, [dispatch]);
  const onChangeP = (values: any) => {
    const startDate = moment(startCustomer);
    const endDate = startDate.add(values, 'years');

    setWarrantyEndP(endDate.format('DD/MM/YY'));
  };

  const onChangeL = (values: any) => {
    const startDate = moment(startCustomer);
    const endDate = startDate.add(values, 'years');

    setWarrantyEndL(endDate.format('DD/MM/YY'));
  };

  const onChangeO = (values: any) => {
    const startDate = moment(startCustomer);
    const endDate = startDate.add(values, 'years');

    setWarrantyEndO(endDate.format('DD/MM/YY'));
  };
  const onChangeDate = (values: any) => {
    setStartCustomer(values);
  };

  const warrantyCustomer: IFunnelWarrantySLACustomerTable = useSelector((state: IStore) =>
    selectFunnelWarrantyCustomers(state, [FunnelWarrantyActions.REQUEST_FUNNEL_WARRANTY_DETAILS])
  );
  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column>
          <Field
            name="startWarrantyCust"
            component={DateInput}
            mandatory={false}
            placeholder="Start Warranty"
            labelName="Start Warranty"
            date={true}
            onChange={onChangeDate}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Field name="pCustomer" component={NumberInput} placeholder="P" labelName="P" onChange={onChangeP} />
        </Grid.Column>
        <Grid.Column>
          <Field name="lCustomer" component={NumberInput} placeholder="L" labelName="L" onChange={onChangeL} />
        </Grid.Column>
        <Grid.Column>
          <Field name="oCustomer" component={NumberInput} placeholder="O" labelName="O" onChange={onChangeO} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Segment className="LightYellowNotif p-1r">
            <Grid centered columns={2}>
              <Grid.Row className="mb-0">
                <Grid.Column>
                  <List>
                    <List.Item>
                      <List.Icon name="warning circle" />
                      <List.Content>
                        Parts Warranty End On <strong>{warrantyEndP}</strong>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="warning circle" />
                      <List.Content>
                        Labour Warranty End On <strong>{warrantyEndL}</strong>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="warning circle" />
                      <List.Content>
                        OnSite Warranty End On <strong>{warrantyEndO}</strong>
                      </List.Content>
                    </List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <h4 className="ml-m-1r">SLA Data</h4>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <CheckBox label="Select All" />
        <ButtonMicro type="button" icon="trash" color="yellow" floated="right" size="mini" content="Delete" />
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
export default WarrantySLACustomerForm;
