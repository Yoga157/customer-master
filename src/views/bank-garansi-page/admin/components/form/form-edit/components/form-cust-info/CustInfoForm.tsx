import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { Grid, Header, Form, Segment, Divider } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { TextInput, NumberInput, Tooltips, Button, SearchInput } from 'views/components/UI';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import classes from './RequesterForm.module.scss';
import { selectLinkToFunnelSA, selectBGEditRequester } from 'selectors/bank-garansi/BankGaransiSelector';
import * as BondTypeAction from 'stores/bond-type/BondTypeAction';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import BankGaransiModel from 'stores/bank-garansi/models/BankGaransiModel';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as CustomerActions from 'stores/customer/CustomerActions';
import { selectCustomerSearchOptions } from 'selectors/select-options/CustomerSelector';
import { selectCustomer } from 'selectors/customer/CustomerSelector';
import BankGaransiEditViewRequesterModel from 'stores/bank-garansi/models/BankGaransiEditViewRequesterModel';

interface IProps {
  linkTo: string;
  username: string;
  expireds: boolean;
}

const CustInfoForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [customer, setCustomer] = useState(0);
  const isLoadingCustomer: boolean = useSelector((state: IStore) => selectRequesting(state, [CustomerActions.REQUEST_CUSTOMERS_BY_NAME]));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bankGaransi = useSelector((state: IStore) => selectLinkToFunnelSA(state));
  const bgRequester = useSelector((state: IStore) => selectBGEditRequester(state));

  const bRefreshPage: boolean = useSelector((state: IStore) => state.bankGaransi.refreshRequesterPage);

  useEffect(() => {
    dispatch(BondTypeAction.requestBondType());
    if (props.linkTo != '') dispatch(BankGaransiActions.requestLinkToFunnelSA(props.username.replace('@berca.co.id', ''), props.linkTo));
    //user creator
  }, [dispatch, currentUser.userName, props.linkTo]);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, []));

  const onSubmitHandler = (values: BankGaransiEditViewRequesterModel) => {
    if (!disableComponent) {
      setDisableComponent(true);
      const newValues = new BankGaransiEditViewRequesterModel(values);
      newValues.funnelGenID = 0;
      newValues.bankGuaranteeNo = bgRequester.bankGuaranteeNo;
      newValues.process = bgRequester.process;
      newValues.modifyUserID = currentUser.employeeID;
      newValues.customerAddress = customerObject.addr1.trim();

      dispatch(BankGaransiActions.putBankGaransiRequester(newValues));
    }
  };

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onCancel = () => {
    if (!disableComponent) {
      dispatch(BankGaransiActions.requestBGViewEditRequester(bgRequester.bankGuaranteeGenID));
      setDisableComponent(true);
    }
  };

  const handleSearchChangeCust = useCallback(
    (data) => {
      setCustomerName(data);
      if (data.length >= 2) {
        dispatch(CustomerActions.requestCustomerByName(data));
      }
    },
    [dispatch]
  );

  const onResultSelectCustomer = (data: any) => {
    setCustomer(data.result.price);
    setCustomerName(data.result.title);

    dispatch(CustomerActions.requestCustomerById(data.result.price));
  };

  const customerObject = useSelector((state: IStore) => selectCustomer(state));
  const customerStoreSearch = useSelector((state: IStore) => selectCustomerSearchOptions(state));

  let form: any;
  if (!isRequesting) {
    form = (
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        //initialValues={props.linkTo != '' ? bankGaransi : bgRequester}
        initialValues={bgRequester}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Segment className="LightGreyNotif p-0">
              <Grid padded className="pb-0">
                <Grid.Row>
                  <Grid.Column>
                    <Header>
                      <Header.Content>Customer Info</Header.Content>
                      <Header.Content className="FloatRight">
                        {disableComponent && currentUser.role != 'Admin' && !props.expireds && props.linkTo === '' && (
                          <Tooltips
                            position="top right"
                            content="Edit Customer Info"
                            trigger={
                              <Button
                                circular
                                basic
                                type="button"
                                compact
                                icon="edit"
                                onClick={(e: Event) => onHeaderSubmitHandler(e)}
                                floated="right"
                              />
                            }
                          />
                        )}
                        {!disableComponent && (
                          <Fragment>
                            <Tooltips
                              position="top right"
                              content="Cancel Update"
                              trigger={<Button onClick={onCancel} type="button" basic compact icon="cancel" circular />}
                            />
                            <Tooltips position="top right" content="Save Update" trigger={<Button basic compact icon="save" circular />} />
                          </Fragment>
                        )}
                      </Header.Content>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Divider className="m-0" />
                <Grid.Row columns={2}>
                  <Grid.Column className="ViewLabel FullGrid767">
                    {/* <Field
                      name="customerName"
                      component={TextInput}
                      placeholder="Customer Name"
                      labelName="Customer Name"
                      disabled={disableComponent}
                    /> */}
                    <Field
                      name="customerName"
                      component={SearchInput}
                      placeholder="e.g.PT. Customer .."
                      loading={isLoadingCustomer}
                      labelName="Customer Name"
                      handleSearchChange={handleSearchChangeCust}
                      onResultSelect={onResultSelectCustomer}
                      results={customerStoreSearch}
                      disabled={disableComponent}
                      //values={customerName}
                    />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel FullGrid767">
                    <Field
                      name="customerAddress"
                      component={TextInput}
                      placeholder="Address"
                      labelName="Address"
                      disabled={true}
                      //values={customerObject.customerGenID === 0 ? '' : customerObject.addr1.trim() === '' ? ' ' : customerObject.addr1.trim()}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column className={!disableComponent ? 'ViewLabel' : 'ViewLabel ReadOnly'}>
                    <Field
                      name="projectAmount"
                      component={NumberInput}
                      labelColor="white"
                      thousandSeparator={true}
                      placeholder="Funnel Amount"
                      labelName="Funnel Amount"
                      disabled={disableComponent}
                      TextAlign="left"
                    />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel"></Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Form>
        )}
      />
    );
  }

  return form;
};

export default CustInfoForm;
