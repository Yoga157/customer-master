import React, { useEffect, useState } from 'react';
import { Grid, Card, Divider, Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import moment from 'moment';

import { selectEmployeeRolePMOSOptions } from 'selectors/select-options/EmployeeSelector';
import { selectSupportRoleOptions } from 'selectors/select-options/SupportRoleSelector';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import * as SupportRoleActions from 'stores/support-role/SupportRoleActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { Button, SelectInput, TextInput } from 'views/components/UI';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import ReassignPmoModel from 'stores/pmo/models/ReassignPmoModel';
import { selectEmployeeOptions } from 'selectors/select-options';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as PMOActions from 'stores/pmo/PMOActions';
import PMOFilter from 'stores/pmo/models/PMOFilter';

interface IProps {
  rowData: any;
  page: string;
}

const ReassignPMOS: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;

  const [assignTo, setAssignTo] = useState(0);
  const [initialValue, setInitialValue] = useState(rowData);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [PMOActions.REASSIGN_PMO, EmployeeActions.REQUEST_EMPLOYEE_BY_ROLE, SupportRoleActions.REQUEST_SUPPORT_ROLE])
  );
  const employeePmosOptions = useSelector((state: IStore) => selectEmployeeRolePMOSOptions(state));
  const supportRoleOptions = useSelector((state: IStore) => selectSupportRoleOptions(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const employeeOptions = useSelector((state: IStore) => selectEmployeeOptions(state));
  const filter: any = useSelector((state: IStore) => state.pmo.data.filter);
  const search: any = useSelector((state: IStore) => state.pmo.data.search);
  const result = useSelector((state: IStore) => state.pmo.resultActions);

  const onCloseHandler = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onSubmitHandler = (values: any) => {
    const newValues = new ReassignPmoModel({
      projectId: Number(values.projectId),
      pmoId: Number(assignTo),
      modifyUserID: currentUser.employeeID,
      modifyDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
    });

    dispatch(PMOActions.reqPutPMOReassign(newValues)).then(() => {
      if (search) {
        dispatch(PMOActions.reqPMOListBySearch(1, 15, 'projectId', 'descending', search?.search, currentUser.employeeID));
      } else if (filter) {
        const filterPMO = new PMOFilter(filter);
        filterPMO.page = 1;
        filterPMO.pageSize = 15;
        dispatch(PMOActions.postPMOFilter(filterPMO));
      } else {
        dispatch(PMOActions.reqPMOList(1, 15, 'projectId', 'descending', currentUser.employeeID));
      }

      dispatch(PMOActions.setActivePage(1));
      onCloseHandler();
    });
  };

  useEffect(() => {
    if (currentUser.role === 'PMO' || currentUser.role === 'PMOS') {
      dispatch(SupportRoleActions.requestSupportRole());
    }
  }, []);

  useEffect(() => {
    if (currentUser.role === 'PMO' || currentUser.role === 'PMOS') {
      // let supportRoleID = supportRoleOptions.find((item) => item.text === currentUser.role);
      // if (typeof supportRoleID === 'object' && supportRoleID !== null) {
      //   dispatch(EmployeeActions.requestEmployeeByRole(supportRoleID.value));
      // }

      let pmo = supportRoleOptions.find((item) => item.text === 'PMO');
      let pmos = supportRoleOptions.find((item) => item.text === 'PMOS');

      if (typeof pmo === 'object' && pmo !== null && currentUser.role === 'PMO') {
        dispatch(EmployeeActions.requestEmployeeByRole(pmo.value));
      }
      if (typeof pmos === 'object' && pmos !== null && currentUser.role === 'PMOS') {
        dispatch(EmployeeActions.requestEmployeeByRolePmos(pmos.value));
      }
    }
  }, [supportRoleOptions]);

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
          <Card.Header className="bold-8">{`Assign PMO/S : ${rowData.projectId}`}</Card.Header>
          <Divider />
          <Grid className="mb-0 mt-1r">
            <Grid.Row columns={1}>
              <Grid.Column className="ViewLabel">
                <Field name="pmoName" component={TextInput} placeholder="e.g. PMO/S" labelName="PMO/S" mandatory={false} disabled={true} />
              </Grid.Column>
              <Grid.Column className="ViewLabel">
                <Field
                  name="AssignTo"
                  component={SelectInput}
                  placeholder="e.g. Jhon Doe"
                  labelName="Assign To"
                  options={[...employeeOptions, ...employeePmosOptions]}
                  values={assignTo}
                  onChanged={onChangeAssignTo}
                  mandatory={false}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Button color="blue" floated="right" content="Submit" disabled={isRequesting || assignTo === 0} />
          <Button className="ml-3r " floated="right" type="button" content="Cancel" onClick={onCloseHandler} />
        </Form>
      )}
    />
  );
};

export default ReassignPMOS;
