import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Divider, Card } from 'semantic-ui-react';
import { TextInput, Button, SearchInput, CheckBox, CheckBoxInput } from 'views/components/UI';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { combineValidators, isRequired } from 'revalidate';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import BillingServiceForm from '../BillingServiceForm';
import { selectEmployeeSearch } from 'selectors/select-options/EmployeeSelector';
import * as AWSBillingActions from 'stores/aws-billing/AWSBillingActions';
import { selectUsageDetailPerProduct } from 'selectors/aws-billing/AWSBillingServiceSelector';
import ChangeAccountId from 'stores/aws-billing/models/ChangeAccountId';
import LoadingIndicator from '../../../../components/loading-indicator/LoadingIndicator';
import * as CustomerActions from 'stores/customer/CustomerActions';
import { selectCustomerTypeC, selectCustomerIDCNotNull, selectCustomerSearchOptionsWithFlag } from 'selectors/select-options/CustomerSelector';

interface IProps {
  id: number;
  type: string;
  item: any;
}

const validate = combineValidators({
  employeeName: isRequired('Employee Name'),
  customerName: isRequired('Customer Name')
});

const AWSBillingService: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const { item } = props;
  const usagedetailperproduct = useSelector((state: IStore) => selectUsageDetailPerProduct(state));

  const onClose = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onSubmitHandler = (values: any) => {
    const newValues = new ChangeAccountId({});

    newValues.accountId = item.accountId;
    newValues.picName = employeeId;
    newValues.userLoginID = currentUser.employeeID;
    newValues.customerId = customerId;

    dispatch(AWSBillingActions.UpdateAccountID(newValues));

    onClose();
  };

  const isLoadingEmployee: boolean = useSelector((state: IStore) => selectRequesting(state, [
    // EmployeeActions.REQUEST_EMPLOYEE_SEARCH_ALL
  ]));
  const EmployeStoreSearch = useSelector((state: IStore) => selectEmployeeSearch(state));
  const [employeeName, setEmployeeName] = useState(item.picName);
  const [errorEmployeeName, setErrorEmployeeName] = useState(false);
  const [employeeId, setEmployeeId] = useState(item.picNameID);
  const [mandatory, setMandatory] = useState({
    sEmployeeName: false,
    sCustomerName: false
  });

  useEffect(() => {
    dispatch(AWSBillingActions.requestDashboardUsagePerproduct(item.billingIdH));
  }, []);
  const handleSearchChangePIC = useCallback(
    (data) => {
      setEmployeeName(data);

      // if (data.length >= 2) {
      //   dispatch(EmployeeActions.searchALL(data, ''));
      // }
      EmployeStoreSearch &&
        EmployeStoreSearch.map((item: any) => {
          if (item.title === employeeName) {
            setErrorEmployeeName(true);
          } else if (employeeName !== data) {
            setErrorEmployeeName(false);
          }
        });
    },
    [dispatch, EmployeStoreSearch, employeeName]
  );

  const onResultSelectPIC = (data: any) => {
    setEmployeeName(data.result.title);
    setEmployeeId(data.result.employeeID);
    EmployeStoreSearch &&
      EmployeStoreSearch.map((item: any) => {
        if (item.title === data.result.title) {
          setErrorEmployeeName(true);
        }
      });
  };

  const resultRenderer = ({ image, price, title, valueData, textData, description, flag, id }) => {
    return (
      <div
        key={id}
        className="content"
        style={{
          backgroundColor: flag === '1' ? 'rgba(255, 248, 54, 0.5)' : '',
        }}
      >
        <div className="price">{price ? price : valueData}</div>
        <div className="title"> {title ? title : textData}</div>
      </div>
    );
  };

  const submitting: boolean = useSelector((state: IStore) => selectRequesting(state, [
    // EmployeeActions.REQUEST_EMPLOYEE_SEARCH_ALL
  ]));
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      AWSBillingActions.REQUEST_DASHBOARD_USAGE_DETAIL_PERPRODUCT,
      CustomerActions.REQUEST_CUSTOMERS_BY_NAME_BLACKLIST,
      CustomerActions.REQUEST_CUSTOMER_IDC_NOTNULL,
      CustomerActions.REQUEST_CUSTOMERS_TYPE_C,
      EmployeeActions.REQUEST_EMPLOYEE_SEARCH_ALL
    ])
  );
  const isLoadingCustomer: boolean = useSelector((state: IStore) => selectRequesting(state, [CustomerActions.REQUEST_CUSTOMERS_BY_NAME]));
  const customerStoreSearchAll = useSelector((state: IStore) => selectCustomerSearchOptionsWithFlag(state));
  // const customerStoreSearch = useSelector((state: IStore) => selectCustomerIDCNotNull(state));
  const customerStoreSearchTypeC = useSelector((state: IStore) => selectCustomerTypeC(state));

  const [errorCustomerName, setErrorCustomer] = useState(false);
  const [customerName, setCustomerName] = useState(item.customerName);
  const [customerId, setCustomerId] = useState(item.customerNameID);
  const [validateResultCustomer, setValidateResultCustomer] = useState(false)
  const [validateResultEmployee, setValidateResultEmployee] = useState(false)
  const [checkPOC, setCheckPOC] = useState(false)
    // console.log("checkPOC",checkPOC)
  const checkedPOC = (e: any, checked: any) => {
    // console.log('values',checked)
    if (checked.checked) {
      setCheckPOC(true);
      setCustomerName(" ")
      setCustomerId(0)
    } else {
      setCheckPOC(false);
      setCustomerName(" ")
      setCustomerId(0)
    }
  };

  // useEffect(() => {
  //   // if (validateResultCustomer) {
  //   //   setValidateResultCustomer(false)
  //   //   if(checkPOC === true)
  //   //   {
  //   //     dispatch(CustomerActions.requestCustomerIDCNotNull(customerName));
  //   //   } else {
  //   //     // dispatch(CustomerActions.requestCustomerByNameBlackList(customerName));
  //   //     dispatch(CustomerActions.requestCustomerTypeC(customerName));
  //   //   }
  //   // }

  //   // if (validateResultEmployee) {
  //   //   setValidateResultEmployee(false)
  //   //   dispatch(EmployeeActions.searchALL(employeeName, ''));
  //   // }

  //   if (customerId) {
  //     setErrorCustomer(true)
  //     dispatch(CustomerActions.requestCustomerIDCNotNull(""));
  //   }

  //   if (employeeId) {
  //     setErrorEmployeeName(true)
  //     dispatch(EmployeeActions.searchALL(employeeName, ''));
  //   }
  // }, [validateResultCustomer, validateResultEmployee])
  const initialValues = {
    accountId: item.accountId,
    employeeName: employeeName,
    customerName: customerName,
  };


  const handleSearchChangeCust = useCallback(
    (data) => {
      setCustomerName(data);

      customerStoreSearchAll &&
        customerStoreSearchAll.map((item: any) => {
          if (item.title === customerName) {
            setErrorCustomer(true);
          } else if (customerName !== data) {
            setErrorCustomer(false);
          }
        });
    },
    [dispatch]
  );

  const onResultSelectCustomer = (data: any) => {
    setCustomerName(data.result.title);
    setCustomerId(data.result.price);
    customerStoreSearchAll &&
      customerStoreSearchAll.map((item: any) => {
        if (item.title === data.result.title) {
          setErrorCustomer(true);
        }
      });

    customerStoreSearchAll &&
      customerStoreSearchAll.map((item: any) => {
        if (item.title === data.result.title) {
          setErrorCustomer(true);
        }
      });
  };


  return (
    <Fragment>
      <Card.Header>Set Account Id to PIC</Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          validate={validate}
          onSubmit={(values: any) => onSubmitHandler(values)}
          initialValues={initialValues}
          render={({ handleSubmit, invalid, pristine }) => (
            <Form onSubmit={handleSubmit} loading={submitting}>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column className="ViewLabel" mobile={16} tablet={8} computer={8}>
                    <Field
                      name="accountId"
                      component={TextInput}
                      disabled={true}
                      labelName="Usage Account Id"
                      mandatory={false}
                      values={item.accountId}
                      thousandSeparator={true}
                    />
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Field
                      name="employeeName"
                      component={SearchInput}
                      placeholder="e.g.PT. Customer .."
                      loading={isLoadingEmployee}
                      labelName="PIC"
                      handleSearchChange={handleSearchChangePIC}
                      onResultSelect={onResultSelectPIC}
                      results={EmployeStoreSearch}
                      mandatory={mandatory.sEmployeeName}
                      values={employeeName}
                      resultRenderer={resultRenderer}
                      onKeyPress={(event) => {
                        if (event.charCode == 13) {
                          // setValidateResultEmployee(true)
                          // dispatch(EmployeeActions.searchALL(employeeName,''));
                          event.preventDefault()
                          dispatch(EmployeeActions.searchALL(employeeName, ''));
                        }
                      }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p className="BtmFormNote">Press enter to see the results</p>
                    </div>
                    {/* } */}
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={2}>
                  <Grid.Column>

                  </Grid.Column>
                  <Grid.Column>
                    <CheckBox defaultChecked={checkPOC}
                    checked={checkPOC} label="POC Customer" onChange={checkedPOC} />
                    {/* <Field name="POCCustomer" component={CheckBoxInput} label="POC Customer" onChange={onChangePOC} /> */}
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={2}>
                  <Grid.Column></Grid.Column>
                  <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Field
                      name="customerName"
                      component={SearchInput}
                      placeholder="e.g.PT. Customer .."
                      loading={isLoadingCustomer}
                      labelName="Customer Name"
                      handleSearchChange={handleSearchChangeCust}
                      onResultSelect={onResultSelectCustomer}
                      results={checkPOC === true ? customerStoreSearchAll : customerStoreSearchTypeC}
                      mandatory={mandatory.sCustomerName}
                      disabled={item.isUsageDetail === 1 ? true : false}
                      values={customerName}
                      resultRenderer={resultRenderer}
                      onKeyPress={(event) => {
                        if (event.charCode == 13) {
                          // dispatch(CustomerActions.requestCustomerIDCNotNull(customerName));
                          // event.preventDefault()
                          if(checkPOC === true)
                          {
                            event.preventDefault()
                            dispatch(CustomerActions.requestCustomerByNameBlackList(customerName.trim()));
                            // dispatch(CustomerActions.requestCustomerIDCNotNull(customerName.trim()));
                          } else {
                            event.preventDefault()
                            dispatch(CustomerActions.requestCustomerTypeC(customerName.trim()));
                          }
                          // setValidateResultCustomer(true)
                          // dispatch(CustomerActions.requestCustomerByNameBlackList(customerName));
                        }
                      }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p className="BtmFormNote">Press enter to see the results</p>
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <BillingServiceForm DataPerProduct={usagedetailperproduct} />
                <Grid.Row>
                  <Grid.Column>
                    <Button
                      color="blue"
                      floated="right"
                      content="Submit"
                      // || !employeeName || !customerName || customerName?.length <= 5 || employeeName?.length <= 5 || !errorCustomerName || !errorEmployeeName
                      disabled={invalid }
                    />
                    {/* disabled={pristine || employeeName === ''} */}
                    <Button type="button" floated="right" content="Cancel" onClick={onClose} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          )}
        />
      </LoadingIndicator>
    </Fragment>
  );
};

export default AWSBillingService;
