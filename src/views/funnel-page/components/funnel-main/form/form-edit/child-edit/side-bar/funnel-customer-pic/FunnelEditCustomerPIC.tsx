import React, { Fragment, useState } from 'react';
import { Grid, Header, Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { TextInput, Button, LabelName, Tooltips } from 'views/components/UI';
import IStore from 'models/IStore';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as CustomerPICActions from 'stores/customer-pic/CustomerPICActions';
import CustomerPICModel from 'stores/customer-pic/models/CustomerPICModel';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {
  page: string;
  funnelGenID: number;
}

const FunnelEditCustomerPIC: React.FC<IProps> = ({ funnelGenID }) => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER, CustomerPICActions.PUT_CUSTOMER_PIC])
  );
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };
  const onSubmitHandler = (values: any) => {
    const customer = new CustomerPICModel(values);
    customer.customerPICID = viewFunnelCustomer.customerPICID;
    customer.salesID = currentUser.employeeID;

    dispatch(CustomerPICActions.putCustomerPIC(customer));

    if (!disableComponent) {
      setDisableComponent(true);
    }
  };

  const onCancel = () => {
    if (!disableComponent) {
      dispatch(FunnelActions.requestViewFunnelCustomerById(funnelGenID));
      setDisableComponent(true);
    }
  };

  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={viewFunnelCustomer}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header>
                  <Header.Content>PIC Details</Header.Content>
                  <Header.Content className="FloatRight">
                    {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && disableComponent && (
                      <>
                        {/* <Tooltips
                          position="top right"
                          content="History Customer PIC"
                          trigger={
                            <Button
                              circular
                              basic
                              type="button"
                              compact
                              icon="history"
                              onClick={(e: Event) => dispatch(ModalFirstLevelActions.OPEN(<AccordionCustomerPIC />, ModalSizeEnum.Small))}
                            />
                          }
                        /> */}
                        <Tooltips
                          position="top right"
                          content="Edit Customer PIC"
                          trigger={<Button circular basic type="button" compact icon="edit" onClick={(e: Event) => onHeaderSubmitHandler(e)} />}
                        />
                      </>
                    )}
                    {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && !disableComponent && (
                      <Fragment>
                        <Tooltips
                          position="top right"
                          content="Cancel Update"
                          trigger={<Button type="button" basic compact icon="cancel" circular onClick={onCancel} />}
                        />
                        <Tooltips position="top right" content="Save Update" trigger={<Button basic compact icon="save" circular />} />
                      </Fragment>
                    )}
                  </Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <div className="ui divider FullHdivider mt-0"></div>
            <Grid.Row>
              <Grid.Column className="ViewLabel">
                <Field name="picName" component={LabelName} placeholder="PIC Name" disabled={disableComponent} labelName="PIC Name" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="ViewLabel">
                <Field name="picMobilePhone" component={TextInput} placeholder="Phone" labelName="Phone" disabled={disableComponent} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="ViewLabel EmailText">
                <Field name="picEmailAddr" component={TextInput} placeholder="Email" labelName="Email" disabled={disableComponent} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelEditCustomerPIC;
