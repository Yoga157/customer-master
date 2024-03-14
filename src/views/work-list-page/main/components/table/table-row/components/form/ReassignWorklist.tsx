import React, { useEffect, useState } from 'react';
import { Grid, Card, Divider, Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import moment from 'moment';

import WorkListAdvanceSearchModel from 'stores/work-list/models/WorkListAdvanceSearchModel';
import { selectSupportRoleOptions } from 'selectors/select-options/SupportRoleSelector';
import { Button, RichTextEditor, SelectInput, TextInput } from 'views/components/UI';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import * as SupportRoleActions from 'stores/support-role/SupportRoleActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import ReAssignWorkModel from 'stores/work-list/models/ReAssignWorkModel';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import { selectEmployeeOptions } from 'selectors/select-options';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as PMOActions from 'stores/pmo/PMOActions';

interface IProps {
  rowData: any;
  page: string;
}

const ReassignWorklist: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;

  const [assignTo, setAssignTo] = useState(0);
  const [initialValue, setInitialValue] = useState(rowData);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [WorkListActions.REASSIGN_WORK, EmployeeActions.REQUEST_EMPLOYEE, SupportRoleActions.REQUEST_SUPPORT_ROLE])
  );
  const supportRoleOptions = useSelector((state: IStore) => selectSupportRoleOptions(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const employeeOptions = useSelector((state: IStore) => selectEmployeeOptions(state));
  const search: any = useSelector((state: IStore) => state.workList?.workList?.search);
  const column: any = useSelector((state: IStore) => state.workList?.workList?.column);
  const filter: any = useSelector((state: IStore) => state.workList?.workList?.filter);

  const onCloseHandler = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onSubmitHandler = (values: any) => {
    const newValues = new ReAssignWorkModel({
      workId: values.workId,
      uid: values.uid,
      primaryResources: `${values.AssignTo}`,
      remark: values.remark,
      modifyUserID: currentUser.employeeID,
      modifyDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
    });

    dispatch(WorkListActions.reqReAssignWork(newValues)).then(() => {
      if (search) {
        dispatch(PMOActions.reqPMOListBySearch(1, 15, 'projectId', 'descending', search?.search, currentUser.employeeID));
      } else if (filter) {
        const filterWorklist = new WorkListAdvanceSearchModel(filter);
        filterWorklist.page = 1;
        filterWorklist.pageSize = 15;
        dispatch(WorkListActions.getWorklistFilter(filterWorklist));
      } else {
        dispatch(WorkListActions.getWorklist(1, 15, column, 'descending', currentUser.employeeID));
      }

      dispatch(WorkListActions.setActivePage(1));
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
          <Card.Header className="bold-8">{`ReAssign Work : ${rowData.uid}`}</Card.Header>
          <Divider />
          <Grid className="mb-0 mt-1r">
            <Grid.Row columns={1}>
              <Grid.Column className="ViewLabel">
                <Field
                  name="engineerName"
                  component={TextInput}
                  placeholder="e.g. Jhon Doe"
                  labelName="Engineer Name"
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
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="remark"
                  component={RichTextEditor}
                  labelName="Remark"
                  // mandatorys={}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Button color="blue" floated="right" content="Submit" loading={isRequesting} disabled={isRequesting || assignTo === 0} />
          <Button className="ml-3r " floated="right" type="button" content="Cancel" onClick={onCloseHandler} />
        </Form>
      )}
    />
  );
};

export default ReassignWorklist;
