import React, { useEffect, useState } from 'react';
import { Grid, Card, Divider, Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import moment from 'moment';

import { Button, RichTextEditor, SelectInput, TextInput } from 'views/components/UI';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import * as SupportRoleActions from 'stores/support-role/SupportRoleActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import ReAssignTicketModel from 'stores/ticket/models/ReAssignTicketModel';
import ReAssignWorkModel from 'stores/work-list/models/ReAssignWorkModel';
import TicketPageHooks from './../../../../../hooks/TicketPageHooks';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import { selectEmployeeOptions } from 'selectors/select-options';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as TicketActions from 'stores/ticket/TicketActions';
import IUserResult from 'selectors/user/models/IUserResult';
import * as PMOActions from 'stores/pmo/PMOActions';

interface IProps {
  rowData: any;
  page: string;
}

const ReassignTicketList: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;

  const [assignTo, setAssignTo] = useState(0);
  const [initialValue, setInitialValue] = useState(rowData);

  const { reloads } = TicketPageHooks();
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      TicketActions.REASSIGN_TICKET,
      WorkListActions.REASSIGN_WORK,
      EmployeeActions.REQUEST_EMPLOYEE,
      SupportRoleActions.REQUEST_SUPPORT_ROLE,
    ])
  );

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const employeeOptions = useSelector((state: IStore) => selectEmployeeOptions(state));
  const column: any = useSelector((state: IStore) => state.ticket?.ticketList?.column);

  const onCloseHandler = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onSubmitHandler = (values: any) => {
    const newValues = new ReAssignWorkModel({
      workId: values.ticketId,
      uid: values.ticketUID,
      primaryResources: `${values.AssignTo}`,
      remark: '',
      modifyUserID: currentUser.employeeID,
      modifyDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
    });

    dispatch(WorkListActions.reqReAssignWork(newValues)).then(() => {
      reloads(column, 'ascending');
      onCloseHandler();
    });
  };

  // useEffect(() => {
  //   if (currentUser.role === 'PMO' || currentUser.role === 'PMOS') {
  //     dispatch(SupportRoleActions.requestSupportRole());
  //   }
  // }, []);

  // useEffect(() => {
  //   if (currentUser.role === 'PMO' || currentUser.role === 'PMOS') {
  //     let supportRoleID = supportRoleOptions.find((item) => item.text === currentUser.role);
  //     if (typeof supportRoleID === 'object' && supportRoleID !== null) {
  //       dispatch(EmployeeActions.requestEmployeeByRole(supportRoleID.value));
  //     }
  //   }
  // }, [supportRoleOptions]);

  useEffect(() => {
    dispatch(EmployeeActions.requestEmployee());
  }, []);

  const onChangeAssignTo = (onChangeAssignTo) => {
    setAssignTo(onChangeAssignTo);
  };

  const validate = combineValidators({
    AssignTo: isRequired('Assign To'),
  });

  return (
    <FinalForm
      validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={initialValue}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Card.Header className="bold-8">{`ReAssign Ticket : ${rowData.ticketUID}`}</Card.Header>
          <Divider />
          <Grid className="mb-0 mt-1r">
            <Grid.Row columns={1}>
              <Grid.Column className="ViewLabel">
                <Field
                  name="primaryResources"
                  component={TextInput}
                  placeholder="e.g. Jhon Doe"
                  labelName="Resource Name"
                  mandatory={false}
                  disabled={true}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="ViewLabel">
                <Field
                  name="AssignTo"
                  component={SelectInput}
                  placeholder="e.g. Jhon Doe"
                  labelName="Assign To"
                  options={employeeOptions}
                  values={assignTo}
                  onChanged={onChangeAssignTo}
                  mandatory={false}
                />
              </Grid.Column>
            </Grid.Row>
            {/* <Grid.Row>
              <Grid.Column>
                <Field
                  name="remark"
                  component={RichTextEditor}
                  labelName="Remark"
                  // mandatorys={}
                />
              </Grid.Column>
            </Grid.Row> */}
          </Grid>
          <Button color="blue" floated="right" content="Submit" loading={isRequesting} disabled={isRequesting || assignTo === 0} />
          <Button className="ml-3r " floated="right" type="button" content="Cancel" onClick={onCloseHandler} />
        </Form>
      )}
    />
  );
};

export default ReassignTicketList;
