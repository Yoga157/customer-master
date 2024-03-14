import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import * as CustomerTransferActions from 'stores/customer-transfer/CustomerTransferActions';
import { Dispatch } from 'redux';
import { History } from 'history';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card } from 'semantic-ui-react';
import { SelectInput, Button, DropdownInput } from 'views/components/UI';
import { selectEmployeeOptions } from 'selectors/select-options';
import { CustomerTransferModel, InsertModel } from 'stores/customer-transfer/models/CustomerTransferModel';
import CustomerFunnel from 'stores/customer/models/CustomerFunnel';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import * as CustomerActions from 'stores/customer/CustomerActions';
import classes from './CustomerTransferPage.module.scss';
import { ICustomerTransferTable, IHistoryTable } from 'selectors/customer-transfer/models/ICustomerTransferTable';
import { selectCustomerTransfers, selectHistory } from 'selectors/customer-transfer/CustomerTransferSelector';
import CustomerTransferTable from './components/table/CustomerTransferTable';
import HistoryCard from './components/card/HistoryCard';
import { ICustomerTransferTableRow } from 'selectors/customer-transfer/models/ICustomerTransferTableRow';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import { combineValidators, isRequired } from 'revalidate';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import RouteEnum from 'constants/RouteEnum';

interface IProps {
  history: History;
}

const CustomerTransferPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [fromSales, setFromSales] = useState(0);
  const [toSales, setToSales] = useState(0);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(EmployeeActions.requestEmployee());
    dispatch(CustomerTransferActions.requestHistory(currentUser.employeeID));
  }, [dispatch, currentUser.employeeID]);

  const ChangeCombo = (event: any) => {
    dispatch(CustomerTransferActions.requestCustomerTransfer(event, 1, 200, 'Sales'));
    dispatch(CustomerActions.requestCustomerFunnel(event));
    setFromSales(event);
  };

  const ChangeComboToSales = (event: any) => {
    setToSales(event);
  };

  const ChangeCustomer = (event: any) => {
    dispatch(CustomerTransferActions.dataFunnelCustomer([event]));
  };

  const validate = combineValidators({
    fromSales: isRequired('From Sales'),
    toSales: isRequired('To Sales'),
  });

  const customerTransferTables: ICustomerTransferTable = useSelector((state: IStore) =>
    selectCustomerTransfers(state, [CustomerTransferActions.REQUEST_CUSTOMER_TRANSFER])
  );
  const historyTables: IHistoryTable = useSelector((state: IStore) => selectHistory(state));
  const funnelStore = useSelector((state: IStore) => state.dataFunnel.dataFunnel);
  const funnelCustomerStore = useSelector((state: IStore) => state.dataFunnelCustomer.dataFunnelCustomer);
  let tempFunnelCust = [] as any;
  const customers: CustomerFunnel[] = useSelector((state: IStore) => state.customer.customerFunnel);
  const customerOptions = customers.map((model: CustomerFunnel, index) => ({
    key: model.customerGenID,
    text: model.customerName,
    value: model.customerGenID,
  }));

  funnelCustomerStore.map((data: any) => {
    return (tempFunnelCust = data);
  });

  if (tempFunnelCust.length <= 0) {
    customerTransferTables.rows.map((model: ICustomerTransferTableRow) => (tempFunnelCust = [...tempFunnelCust, model.customerGenID]));
  }

  //distinct array yang sudah diisi dari tempFunnelCust
  tempFunnelCust = tempFunnelCust.filter((item: any, i: any, ar: any) => ar.indexOf(item) === i);

  const employeeStore = useSelector((state: IStore) => selectEmployeeOptions(state));

  const onSubmitHandler = (values: CustomerTransferModel) => {
    if (funnelStore.length <= 0) {
      dispatch(ToastsAction.add('Choose funnel at least 1 data', ToastStatusEnum.Error));
      return;
    }

    const newValues = new InsertModel({
      salesIDFrom: Number(fromSales),
      salesIDTo: Number(toSales),
      createUserID: currentUser.employeeID,
      listFunnelID: funnelStore,
    });
    dispatch(CustomerTransferActions.postCustomerTransfer(newValues));
    dispatch(ToastsAction.add('Success', ToastStatusEnum.Success));
    props.history.push(RouteEnum.Funnel);

    //kosongkan state dataFunnel
    dispatch(CustomerTransferActions.dataFunnel([]));
  };

  return (
    <FinalForm
      validate={validate}
      onSubmit={(values: CustomerTransferModel) => onSubmitHandler(values)}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Card centered raised className={classes.Card}>
            <Card.Content>
              <Card.Header>Reassign Sales</Card.Header>
            </Card.Content>
            <Card.Content>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column className="FullGrid767" width={6}>
                    <Field
                      name="fromSales"
                      component={SelectInput}
                      placeholder="From Sales"
                      labelName="From Sales"
                      options={employeeStore}
                      onChanged={ChangeCombo}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="cmbCustomer"
                      component={DropdownInput}
                      placeholder="Customer"
                      labelName="Customer"
                      options={customerOptions}
                      onChanged={ChangeCustomer}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Column className="FullGrid767" width={6}>
                  <Field
                    name="toSales"
                    component={SelectInput}
                    placeholder="To Sales"
                    labelName="To Sales"
                    onChanged={ChangeComboToSales}
                    options={employeeStore}
                  />
                </Grid.Column>
              </Grid>
              <CustomerTransferTable tableData={customerTransferTables} funnelCustomer={tempFunnelCust} /> <br />
              {/* <div className="ui sub header">Your Customer Transfer History</div> */}
              <Card.Header>Customer Transfer History</Card.Header> <br />
              <HistoryCard tableData={historyTables} />
              <br />
              <Grid.Row>
                <Grid.Column width={3}>
                  <Button color="blue" floated="right">
                    Submit
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Card.Content>
          </Card>
        </Form>
      )}
    />
  );
};

export default CustomerTransferPage;
