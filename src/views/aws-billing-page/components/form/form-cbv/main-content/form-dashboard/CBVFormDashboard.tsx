import React, { useState, useEffect } from 'react';
import { Grid, Form, Segment, Label, Card, Divider } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { NumberInput, TextInput } from 'views/components/UI';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import moment from 'moment';
import './CBVFormDashboard.scss';

interface IProps {
  dataBillingById: any;
}

const CBVFormDashboard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [disableComponent, setDisableComponent] = useState(true);

  const { dataBillingById } = props;

  const onSubmitHandler = (values: any) => {

  };
  // console.log('Condition',dataBillingById?.outstandingBilling?.toLocaleString()?.split("-")[1] ? "0" : "1")
  useEffect(() => {
    dispatch(FunnelActions.requestRate("USD", moment(new Date()).format('yyyy-MM-DD')));
  },[])
  const funnelRate = useSelector((state: IStore) => state.funnel.rate);
  console.log('dataBillingById',dataBillingById)
  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={dataBillingById}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Card.Header className='ModalHeader'>CBV Settlement</Card.Header>
          <Divider className='DividerHeader'></Divider>
          <Segment className="LightYellowNotif PadPmoNotif"  >
            <Grid>
              <Grid.Column>
                <Grid.Row>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column className={`ViewLabel ${disableComponent ? 'ReadOnly' : null}`} mobile={16} tablet={8} computer={5}>
                        <Field
                          name="accountId"
                          component={NumberInput}
                          placeholder="Ussage Account Id"
                          labelName="Ussage Account Id"
                          disabled={disableComponent}
                          // options={subSoftwareTypeStore}
                          TextAlign="left"
                          // values={accountId}
                        />
                      </Grid.Column>
                      <Grid.Column className="ViewLabel" mobile={16} tablet={8} computer={5}>
                        <Field
                          name="billingPeriod"
                          component={TextInput}
                          placeholder="Billing Period"
                          labelName="Billing Period"
                          disabled={disableComponent}
                          // options={subSoftwareTypeStore}
                          // values={billingPeriod}
                        />
                      </Grid.Column>
                      <Grid.Column className="ViewLabel" mobile={16} tablet={8} computer={5}>
                        <Field
                          name="picName"
                          component={TextInput}
                          placeholder="PIC"
                          labelName="PIC"
                          date={true}
                          disabled={disableComponent}
                          // values={pic}
                        />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column className="ViewLabel" mobile={16} tablet={8} computer={5}>
                        <Field
                          name="customerName"
                          component={TextInput}
                          labelColor="white"
                          thousandSeparator={true}
                          placeholder="Customer Name"
                          labelName="Customer Name"
                          disabled={disableComponent}
                          TextAlign="left"
                          // values={customerName}
                        />
                      </Grid.Column>
                      <Grid.Column className="ViewLabel" mobile={16} tablet={8} computer={5}>
                        <Field
                          name="projectName"
                          component={TextInput}
                          labelColor="white"
                          thousandSeparator={true}
                          placeholder="Project Name"
                          labelName="Project Name"
                          disabled={disableComponent}
                          TextAlign="left"
                          // values={projectName}
                        />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column className={`mb-0 ViewLabel ${disableComponent ? 'ReadOnly' : null}`} mobile={16} tablet={16} computer={4}>
                        <Field
                          name="totalBillingUsd"
                          component={NumberInput}
                          labelColor="white"
                          thousandSeparator={true}
                          placeholder="Total Billing"
                          labelName="Total Billing (USD)"
                          disabled={disableComponent}
                          TextAlign="left"
                          values={dataBillingById.totalBilling?.toLocaleString()}
                        />
                        <small><p style={{color:"#55637A", fontWeight: 400}}>In IDR Rate {dataBillingById.totalBillingIdr.toLocaleString()} (Rp. {dataBillingById.rate.toLocaleString()}/USD)</p></small>
                      </Grid.Column>
                      {/* WrapperOutStanding */}
                      <Grid.Column className={`mb-0 ViewLabel ${disableComponent ? 'ReadOnly' : null} `} mobile={6} tablet={4} computer={3}>
                        <Field
                          name="outstandingBilling"
                          component={NumberInput}
                          labelColor="white"
                          thousandSeparator={true}
                          placeholder="Outstanding Billing"
                          labelName="Outstanding Billing (USD)" 
                          disabled={disableComponent}
                          TextAlign="left"
                          values={dataBillingById?.outstandingBilling?.toLocaleString()?.split("-")[1] ? "0" : dataBillingById?.outstandingBilling?.toLocaleString()}
                        />
                       <small><p style={{color:"#55637A", fontWeight: 400}}>In IDR Rate {dataBillingById.outstandingBillingIDR.toLocaleString()} (Rp. {dataBillingById.rate.toLocaleString()}/USD)</p></small> 
                        </Grid.Column>
                      <Grid.Column verticalAlign='middle' mobile={10} tablet={6} computer={4}>
                        <Label className={`ViewLabel ReadOnly WrapperAfterDiscount `} as='a' tag>
                          <h5>AFTER DISCOUNT</h5>
                          <p>-<span>USD {dataBillingById.sppDiscount.toLocaleString()}</span> Discount SPP Amount</p>
                          <p>-<span>USD {dataBillingById.discountUsage.toLocaleString()}</span> Discount Usage Amount</p>
                        </Label>
                      </Grid.Column>
                      <Grid.Column width={3} className="ViewLabel ReadOnly" mobile={8} tablet={4} computer={4}>
                        <Field
                          name="billingStatus"
                          component={TextInput}
                          labelColor="white"
                          thousandSeparator={true}
                          placeholder="Status"
                          labelName="Status"
                          disabled={disableComponent}
                          TextAlign="left"
                          // values={status}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Segment>
        </Form>
      )}
    />
  );
};

export default CBVFormDashboard;
