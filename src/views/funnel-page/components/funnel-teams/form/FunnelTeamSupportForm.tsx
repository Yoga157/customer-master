import React, { useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Segment, Grid, Button, Card, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { SelectInput, RichTextEditor } from 'views/components/UI';
import IStore from 'models/IStore';
import { selectEmployeeOptions } from 'selectors/select-options';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import * as SupportRoleActions from 'stores/support-role/SupportRoleActions';
import * as FunnelSupportTeamActions from 'stores/funnel-support-teams/FunnelSupportTeamActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import { selectSupportRoleOptions } from 'selectors/select-options/SupportRoleSelector';
import FunnelSupportTeamModel from 'stores/funnel-support-teams/models/FunnelSupportTeamModel';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectSupportTeam } from 'selectors/funnel-support-teams/FunnelSupportTeamsSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {
  //history:History
  funnelGenID: number;
  type: string;
  page: string;
  employeeID: number;
  funnelSupportID: number;
  supportRoleID: number;
}

const FunnelTeamSupportForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [disableRole, setDisableRole] = useState(true);
  const [supportRoleID, setSupportRoleID] = useState(27 as any);
  const { type, page, funnelGenID, employeeID, funnelSupportID } = props;

  const onSubmitHandler = (values: any) => {
    values.createUserID = currentUser.employeeID;
    values.funnelGenID = funnelGenID;
    values.funnelSupportID = funnelSupportID;
    values.supportRoleID = values.supportRoleID ? values.supportRoleID : supportRoleID;

    if (type === 'ADD') {
      values.createUserID = currentUser.employeeID;
      values.createDate = new Date();
      const newItems = new FunnelSupportTeamModel(values);
      dispatch(FunnelSupportTeamActions.postSupportTeams(newItems));
    } else if (type === 'PRESALES') {
      values.createUserID = currentUser.employeeID;
      values.createDate = new Date();
      const newItems = new FunnelSupportTeamModel(values);
      dispatch(FunnelSupportTeamActions.postSupportTeams(newItems));
    } else {
      values.assignedByID = currentUser.employeeID;
      values.assignDate = new Date();
      values.modifyDate = new Date();
      const updateItems = new FunnelSupportTeamModel(values);
      dispatch(FunnelSupportTeamActions.putSupportTeams(updateItems));
    }
  };

  useEffect(() => {
    dispatch(SupportRoleActions.requestSupportRole());
    if (type === 'ASSIGN') {
      setSupportRoleID(props.supportRoleID);
      dispatch(EmployeeActions.requestEmployeeByRoleSubordinate(props.supportRoleID, currentUser.employeeID));
    } else if (type === 'PRESALES') {
      dispatch(EmployeeActions.requestEmployeeByRoleSubordinate(28, currentUser.employeeID));
      setSupportRoleID(28);
    } else {
      setSupportRoleID(props.supportRoleID);
      dispatch(EmployeeActions.requestEmployeeByRole(props.supportRoleID));
    }
  }, [dispatch]);

  const onChangeSupportRole = (value: any) => {
    dispatch(EmployeeActions.requestEmployeeByRole(value));
  };

  const employeeOptions = useSelector((state: IStore) => selectEmployeeOptions(state));
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const supportRoleOptions = useSelector((state: IStore) => selectSupportRoleOptions(state));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnelSupportTeams.refreshPage);
  const supportTeam = useSelector((state: IStore) => selectSupportTeam(state));

  const onClose = () => {
    dispatch(ModalSecondLevelActions.CLOSE());
  };

  if (bRefreshPage) {
    dispatch(FunnelSupportTeamActions.requestSupportTeamsByFunnelGenID(props.funnelGenID, 1, 5));
    onClose();
  }

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      EmployeeActions.REQUEST_EMPLOYEE_BY_ROLE_SUBORDINATE,
      EmployeeActions.REQUEST_EMPLOYEE_BY_ROLE,
      FunnelSupportTeamActions.REQUEST_POST_SUPPORT_TEAMS,
      FunnelSupportTeamActions.REQUEST_PUT_SUPPORT_TEAMS,
    ])
  );

  return (
    <FinalForm
      //validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      //initialValues={(type === "PRESALES" ) ? { supportRoleID:28 } :supportTeam}
      initialValues={supportTeam}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Card.Header>
            {type === 'ADD' ? 'Add' : 'Change'} team member for project # {viewFunnelCustomer.projectName}
          </Card.Header>
          <Divider />
          <Segment>
            <Grid>
              <Grid.Row columns="equal">
                <Grid.Column className="FullGrid767">
                  <Field
                    name="supportRoleID"
                    component={SelectInput}
                    placeholder="Role Type"
                    labelName="Role Type"
                    options={supportRoleOptions}
                    onChanged={onChangeSupportRole}
                    disabled={page === 'pmo-view-edit' ? false : disableRole}
                    values={supportRoleID}
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid767">
                  <Field name="employeeID" component={SelectInput} placeholder="Team Name" labelName="Team Name" options={employeeOptions} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field name="notes" component={RichTextEditor} labelName="Notes" placeholder="Notes" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Grid columns="equal">
            <Grid.Column>
              <Button color="blue" floated="right" content="Submit" disabled={pristine || invalid || isRequesting} />
              <Button type="button" floated="right" content="Cancel" onClick={onClose} />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelTeamSupportForm;
