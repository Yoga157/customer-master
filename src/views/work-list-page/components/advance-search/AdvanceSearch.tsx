import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Header } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import moment from 'moment';

import { selectWorklistDrp, selectWorklistDrpToStr } from 'selectors/work-list/WorklistSelector';
import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import WorkListAdvanceSearchModel from 'stores/work-list/models/WorkListAdvanceSearchModel';
import { Button, CheckBoxInput, DateInput, DropdownInput } from 'views/components/UI';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import styles from './AdvanceSearch.module.scss';
import IStore from 'models/IStore';

interface IProps {
  setBtnCancel: any;
}

const AdvancedSearch: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { setBtnCancel } = props;

  const [initialValues, setInitialValues] = useState({});
  const [projStatus, setProjStatus] = useState([]);
  const [worktype, setWorkType] = useState([]);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const search: any = useSelector((state: IStore) => state.workList?.workList?.search);

  const workStatus: any = useSelector((state: IStore) => selectWorklistDrpToStr(state, 'taskStatus'));
  const workType: any = useSelector((state: IStore) => selectWorklistDrpToStr(state, 'workType'));
  const customer: any = useSelector((state: IStore) => selectWorklistDrp(state, 'customer'));
  const employee: any = useSelector((state: IStore) => selectWorklistDrp(state, 'employee'));
  const project: any = useSelector((state: IStore) => selectWorklistDrp(state, 'project'));

  useEffect(() => {
    if (currentUser.employeeID > 0) {
      dispatch(WorkListActions.getFilterBy('statusWorkAll'));
      dispatch(WorkListActions.getDropdown('workType'));
      dispatch(WorkListActions.getDropdown('project', 0, currentUser.employeeID));
      dispatch(WorkListActions.getDropdown('customer', 0, currentUser.employeeID));
      dispatch(WorkListActions.getDropdown('employee', 0, currentUser.employeeID));
    }
  }, [dispatch, currentUser]);

  const dateToString = (date: any): string => {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS');
  };

  const onSubmitHandler = (values: any) => {
    const filterWorklist = new WorkListAdvanceSearchModel(values);

    filterWorklist.workTypeList = worktype.length === 0 ? '' : worktype.join(';');
    filterWorklist.workStatusList = projStatus.length === 0 ? '' : projStatus.join(';');
    filterWorklist.projectList = values.projectName === undefined ? '' : values.projectName.join(';');
    filterWorklist.customerList = values.customerName === undefined ? '' : values.customerName.join(';');
    filterWorklist.engineerList = values.engineerAssign === undefined ? '' : values.engineerAssign.join(';');

    filterWorklist.estimationStartDate = values.estimationStartDate === undefined ? '' : dateToString(values.estimationStartDate);
    filterWorklist.estimationEndDate = values.estimationEndDate === undefined ? '' : dateToString(values.estimationEndDate);
    filterWorklist.actualStartDate = values.actualStartDate === undefined ? '' : dateToString(values.actualStartDate);
    filterWorklist.actualEndDate = values.actualEndDate === undefined ? '' : dateToString(values.actualEndDate);

    filterWorklist.column = 'workId';
    filterWorklist.sorting = `descending`;
    filterWorklist.page = 1;
    filterWorklist.pageSize = 15;
    filterWorklist.userLoginId = currentUser.employeeID;

    dispatch(WorkListActions.getWorklistFilter(filterWorklist)).then(() => {
      dispatch(WorkListActions.setActivePage(1));
      setBtnCancel(false);
    });
  };

  const onCancel = () => {
    setInitialValues({
      ...initialValues,
      Task: false,
      Ticket: false,
      New: false,
      Assigned: false,
      Accepted: false,
      'On Progress': false,
      Hold: false,
      Completed: false,
      Void: false,
      Closed: false,
    });
    setProjStatus([]);
    setWorkType([]);

    if (search) {
      dispatch(WorkListActions.getWorklistSearch(1, 15, 'workId', 'descending', search?.search, currentUser.employeeID));
    } else {
      dispatch(WorkListActions.getWorklist(1, 15, 'workId', 'descending', currentUser.employeeID));
    }
    dispatch(WorkListActions.setActivePage(1));
    dispatch(SidebarContainerActions.CLOSE());
  };

  const onChangeProjectStatus = (values: boolean, statusID: string) => {
    if (values) {
      setProjStatus((projStatus) => [...projStatus, statusID]);
    } else {
      const projStatusArr = projStatus.filter((id) => id !== statusID);
      setProjStatus(projStatusArr);
    }
  };

  const onChangeWorkType = (values: boolean, statusID: string) => {
    if (values) {
      setWorkType((worktype) => [...worktype, statusID]);
    } else {
      const workType = worktype.filter((id) => id !== statusID);
      setWorkType(workType);
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      WorkListActions.GET_WORK_LIST_FILTER,
      WorkListActions.GET_DROPDOWN_TASK_STATUS,
      WorkListActions.GET_DROPDOWN_WORK_TYPE,
      WorkListActions.GET_DROPDOWN_PROJECT,
      WorkListActions.GET_DROPDOWN_CUSTOMER,
      WorkListActions.GET_DROPDOWN_EMPLOYEE,
    ])
  );
  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Grid padded columns="equal">
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <Header as="h3" inverted dividing>
                  <Header.Content className={styles.FilterTitle}>Advance Filter</Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Work Type</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Grid columns="equal" className="mh-5  mt-05r">
                  {workType?.length > 0 &&
                    workType.map((stt, k) => (
                      <Grid.Column width={4} key={k}>
                        <Field
                          name={stt?.text?.replace(' ', '')}
                          component={CheckBoxInput}
                          label={stt.text}
                          onChange={(val) => onChangeWorkType(val, stt.value)}
                        />
                      </Grid.Column>
                    ))}
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Work Status</h4>
              </Grid.Column>
              <Grid columns="equal" className="mh-5  mt-05r">
                {workStatus?.length > 0 &&
                  workStatus.map((stts: any, k: number) => (
                    <Grid.Column
                      className={
                        stts?.text === 'Not Started'
                          ? 'LabelGrayLight '
                          : stts?.text === 'New'
                          ? 'LabelGreenYellow'
                          : stts?.text === 'In Progress'
                          ? 'LabelPurple2'
                          : stts?.text === 'Hold'
                          ? 'LabelYellow'
                          : stts?.text === 'Closed'
                          ? 'LabelGreen'
                          : stts?.text === 'Assigned'
                          ? 'LabelPurple'
                          : stts?.text === 'Accepted'
                          ? 'LabelBrown'
                          : stts?.text === 'Resolved'
                          ? 'LabelBlue'
                          : 'LabelRed'
                      }
                      width={
                        stts?.text === 'Not Started'
                          ? 8
                          : stts?.text === 'New'
                          ? 6
                          : stts?.text === 'In Progress'
                          ? 8
                          : stts?.text === 'Hold'
                          ? 5
                          : stts?.text === 'Closed'
                          ? 6
                          : stts?.text === 'Assigned'
                          ? 6
                          : stts?.text === 'Accepted'
                          ? 6
                          : stts?.text === 'Resolved'
                          ? 7
                          : 5
                      }
                      key={k}
                    >
                      <Field
                        name={stts?.text?.replace(' ', '')?.toLowerCase()}
                        component={CheckBoxInput}
                        label={stts?.text?.toUpperCase()}
                        onChange={(e) => onChangeProjectStatus(e, stts?.value)}
                      />
                    </Grid.Column>
                  ))}
              </Grid>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Project Name</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="projectName" component={DropdownInput} options={project} placeholder="- Choose your Project - " />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Customer Name</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="customerName" component={DropdownInput} options={customer} placeholder="- Choose your costumer -" />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Engineer Assign</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="engineerAssign" component={DropdownInput} options={employee} placeholder="- Choose your PMO - " />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Estimate Date Range</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="estimationStartDate" labelName="Estimate Start Date" component={DateInput} placeholder="Start Date" date={true} />
                <Field name="estimationEndDate" labelName="Estimate End Date" component={DateInput} placeholder="End Date" date={true} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Actual Date Range</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="actualStartDate" labelName="Actual Start Date" component={DateInput} placeholder="Start Date" date={true} />
                <Field name="actualEndDate" labelName="Actual End Date" component={DateInput} placeholder="End Date" date={true} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal">
            <Grid.Row columns={1}>
              <Grid.Column width={16} className={styles.PadBtnFilter}>
                <Button fluid color="blue" disabled={isRequesting} loading={isRequesting}>
                  Apply Filter
                </Button>
              </Grid.Column>
              <Grid.Column width={16} className={styles.PadBtnFilter}>
                <Button type="button" fluid onClick={onCancel}>
                  Cancel
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    ></FinalForm>
  );
};

export default AdvancedSearch;
