import React, { useEffect, Fragment, useState } from 'react';
import { SelectInput, TextInput, Button, NumberInput, RichTextEditor, DateInput } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { combineValidators, isRequired, composeValidators, createValidator } from 'revalidate';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as CustomerCreditActions from 'stores/customer-credit-service/CustomerCreditActions';
import TicketModels from 'stores/customer-credit-service/models/TicketModels';
import TicketModel from 'stores/customer-credit-service/models/TicketModel';
import { selecTicketDetail, selectTicketDetailRow } from 'selectors/customer-credit-service/CustomerCreditServiceSelector';
import { selectEmployeeOptions, selectResourceOptions } from 'selectors/select-options';
import UsageDetailModel from 'stores/customer-credit-service/models/UsageDetailModel';
import * as EmployeeActions from 'stores/employee/EmployeeActions';

interface IProps {
  typeForm: string;
  rowData: any;
  salesID: number;
}

const FormTicket: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { typeForm, rowData, salesID } = props;

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.customerCredit.refreshPage);

  const ticketDetail: TicketModels = useSelector((state: IStore) => selecTicketDetail(state));
  const ticketDetailRow: TicketModel = useSelector((state: IStore) => selectTicketDetailRow(state));

  useEffect(() => {
    dispatch(EmployeeActions.requestEmployeeByRole(28));
    if (typeForm === 'EDIT') {
      dispatch(CustomerCreditActions.requestTicketByCustCreditID(rowData.customerCreditServiceID));
      dispatch(CustomerCreditActions.requestSecondaryResource(rowData.ticketNumber, rowData.customerCreditServiceID));
      setPresalesID(3);
    } else {
      dispatch(CustomerCreditActions.requestTicketByCustCreditID(-1));
    }
  }, [dispatch]);

  const cancelClick = () => {
    dispatch(ModalFirstLevelActions.CLOSE());
  };

  const onSubmitHandler = (values: TicketModel) => {
    if (typeForm === 'ADD') {
      values.createUserID = currentUser.employeeID;
      values.salesID = salesID;
      values.resource = resourceText;
      values.isPrimary = ticketDetail.resultObj.isPrimary;
      values.emailResource = emailResource;

      //console.log(values);

      dispatch(CustomerCreditActions.postTicket(values));
    } else if (typeForm === 'EDIT') {
      values.modifyUserID = currentUser.employeeID;
      values.salesID = ticketDetailRow.salesID;
      values.resource = resourceText === '' ? ticketDetailRow.resource : resourceText;
      values.isPrimary = ticketDetailRow.isPrimary;
      values.emailResource = emailResource === '' ? ticketDetailRow.emailResource : emailResource;

      dispatch(CustomerCreditActions.putTicket(values));
    }
  };

  if (bRefreshPage) {
    dispatch(CustomerCreditActions.requestUsageDetail(1, 10, typeForm === 'EDIT' ? +ticketDetailRow.salesID : +salesID));
    dispatch(CustomerCreditActions.requestUsageAmount(1, 10, typeForm === 'EDIT' ? +ticketDetailRow.salesID : +salesID));
    cancelClick();
  }

  const onResource = (values: any) => {
    setEmailResource(values);
    const data = resourceStore.filter((item: any) => {
      return item.value === values;
    });

    if (data.length > 0) {
      setResourceText(data[0].text);
    }
  };

  const onPresales = (values: any) => {
    setPresalesID(values);
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerCreditActions.REQUEST_POST_TICKET,
      CustomerCreditActions.REQUEST_PUT_TICKET,
      CustomerCreditActions.REQUEST_TICKET_DETAIL,
      CustomerCreditActions.REQUEST_SECONDARY_RESOURCE,
    ])
  );

  const onKeyPress = (event: any) => {
    event.key === 'Enter' && event.preventDefault();
    if (event.key === 'Enter') {
      const ticketNumber = event.currentTarget.value;
      dispatch(CustomerCreditActions.requestGetTicketDetail(ticketNumber));
      dispatch(CustomerCreditActions.requestSecondaryResource(ticketNumber, 0));
    }
  };

  const validate = combineValidators({
    ticketNumber: isRequired('Ticket Number'),
    //emailResource: isRequired('Resource'),
  });

  const employeeStore = useSelector((state: IStore) => selectEmployeeOptions(state));
  const resourceStore = useSelector((state: IStore) => selectResourceOptions(state));

  const [presalesID, setPresalesID] = useState(0);
  const [resourceText, setResourceText] = useState('');
  const [emailResource, setEmailResource] = useState('');

  return (
    <Fragment>
      <Card.Header>{typeForm} TICKET</Card.Header>
      <Divider></Divider>

      <FinalForm
        validate={validate}
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={typeForm === 'EDIT' ? ticketDetailRow : ticketDetail.resultObj}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="ticketNumber"
                    component={TextInput}
                    placeholder="e.g. Ticket Number"
                    labelName="Ticket Number"
                    mandatory={false}
                    disabled={rowData.customerCreditServiceID > 0}
                    onKeyPress={onKeyPress}
                  />
                </Grid.Column>
                <Grid.Column className=" ViewLabel FullGrid1200">
                  <Field
                    name="ticketTitle"
                    component={TextInput}
                    placeholder="e.g. Ticket Title"
                    labelName="Ticket Title"
                    mandatory={false}
                    disabled={true}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column className=" ViewLabel FullGrid1200 ">
                  <Field
                    name="ticketDate"
                    component={DateInput}
                    mandatory={false}
                    labelName="Ticket Created"
                    placeholder="e.g. Ticket Created"
                    disabled={true}
                    date={true}
                  />
                </Grid.Column>
                <Grid.Column className=" ViewLabel FullGrid1200">
                  <Field name="customer" component={TextInput} mandatory={false} labelName="Customer" placeholder="e.g. Customer" disabled={true} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column className=" ViewLabel FullGrid1200">
                  <Field name="category" component={TextInput} mandatory={false} labelName="Category" placeholder="e.g. Category" disabled={true} />
                </Grid.Column>
                <Grid.Column className=" ViewLabel FullGrid1200">
                  <Field name="status" component={TextInput} mandatory={false} labelName="Status" placeholder="e.g. Status" disabled={true} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column className=" ViewLabel FullGrid1200">
                  <Field name="complexity" component={TextInput} mandatory={false} labelName="Complexity" placeholder="e.g. High" disabled={true} />
                </Grid.Column>
                <Grid.Column className=" ViewLabel FullGrid1200">
                  <Field
                    name="emailResource"
                    component={SelectInput}
                    placeholder="e.g.Adam.."
                    labelName="Resource"
                    mandatory={false}
                    options={resourceStore}
                    onChanged={onResource}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column className="ViewLabel">
                  <Field
                    name="description"
                    component={RichTextEditor}
                    mandatory={false}
                    labelName="Description"
                    placeholder="e.g. Description"
                    disabled={true}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="price"
                    component={NumberInput}
                    placeholder="e.g.99.000.00.."
                    labelName="Price"
                    disabled={ticketDetailRow.status === 'VOID' || currentUser.role !== 'Presales'}
                    thousandSeparator={true}
                    mandatory={false}
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="presalesID"
                    component={SelectInput}
                    placeholder="e.g.Presales Name.."
                    labelName="Presales"
                    mandatory={false}
                    options={employeeStore}
                    values={presalesID}
                    disabled={ticketDetailRow.status === 'Closed' || ticketDetailRow.status === 'Void'}
                    onChanged={onPresales}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column className="ViewLabel">
                  <Field name="notes" component={RichTextEditor} mandatory={false} labelName="Notes" placeholder="e.g. Notes" />
                </Grid.Column>
              </Grid.Row>
            </Grid>{' '}
            <br />
            <Button
              className="MarBot20"
              floated="right"
              type="submit"
              disabled={typeForm === 'ADD' ? pristine || invalid || presalesID == 0 : false}
              color="blue"
            >
              Save
            </Button>
            <Button floated="right" type="button" onClick={cancelClick}>
              Cancel
            </Button>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default FormTicket;
