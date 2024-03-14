import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Header, Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { SelectFunnelStatus, DateName, Button, LabelName, NumberInput, DateInput } from 'views/components/UI';
import { funnelStatusOptions } from 'constants/funnelStatusOptions';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectViewFunnelStatus } from 'selectors/funnel/FunnelSelector';
import FunnelViewEditStatus from 'stores/funnel/models/view-edit/FunnelViewEditStatus';
import { selectWarrantySLA } from 'selectors/funnel-warranty-sla/FunnelWarrantySLASelector';
import moment from 'moment';
import * as FunnelWarrantyActions from 'stores/funnel-warranty/FunnelWarrantyActions';
import FunnelWarrantySLAModel from 'stores/funnel-warranty/models/FunnelWarrantySLAModel';

interface IProps {
  //funnelGenID:string
}

const WarrantySLACustomerPLO: React.FC<IProps> = () => {
  const [disableComponent, setDisableComponent] = useState(true);
  const [warrantyEndP, setWarrantyEndP] = useState(moment().format('DD/MM/YY'));
  const [warrantyEndL, setWarrantyEndL] = useState(moment().format('DD/MM/YY'));
  const [warrantyEndO, setWarrantyEndO] = useState(moment().format('DD/MM/YY'));
  const [startCustomer, setStartCustomer] = useState(moment().format('DD/MM/YY'));

  const dispatch: Dispatch = useDispatch();
  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnel.refreshPage);

  const warrantySLA = useSelector((state: IStore) => selectWarrantySLA(state));

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onSubmitHandler = (values: FunnelWarrantySLAModel) => {
    if (!disableComponent) {
      setDisableComponent(true);
      values.customerWarranty = values.pCustomer + '/' + values.lCustomer + '/' + values.oCustomer;
      dispatch(FunnelWarrantyActions.putSLACustomer(values));
    }
  };

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

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={warrantySLA}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid padded>
            <Grid.Row>
              <Grid.Column>
                <Header className="ml-m-1r" as="h4">
                  <Header.Content>
                    To Customer Warranty
                    {disableComponent && <Button basic type="button" compact icon="edit" onClick={(e: Event) => onHeaderSubmitHandler(e)} />}
                    {!disableComponent && <Button basic compact icon="save" />}
                  </Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="startWarrantyCust"
                  component={DateInput}
                  mandatory={false}
                  placeholder="Start Warranty"
                  labelName="Start Warranty"
                  date={true}
                  disabled={disableComponent}
                  onChange={onChangeDate}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field name="pCustomer" component={NumberInput} placeholder="P" labelName="P" disabled={disableComponent} onChange={onChangeP} />
              </Grid.Column>
              <Grid.Column>
                <Field name="lCustomer" component={NumberInput} placeholder="L" labelName="L" disabled={disableComponent} onChange={onChangeL} />
              </Grid.Column>
              <Grid.Column>
                <Field name="oCustomer" component={NumberInput} placeholder="O" labelName="O" disabled={disableComponent} onChange={onChangeO} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <p>
                Parts Warranty End On {warrantyEndP} Labour Warranty End On {warrantyEndL}
              </p>
            </Grid.Row>
            <Grid.Row>
              <p>OnSite Warranty End On {warrantyEndO}</p>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default WarrantySLACustomerPLO;
