import React, { useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Grid, Header } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import { LocationState } from 'history';
import { Dispatch } from 'redux';
import moment from 'moment';

import { selectWorklistDrp, selectWorklistDrpToStr } from 'selectors/work-list/WorklistSelector';
import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import { Button, CheckBoxInput, DateInput, DropdownInput } from 'views/components/UI';
import TicketPageHooks from 'views/ticket-page/page-ticket/hooks/TicketPageHooks';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { TicketFilterModel } from 'stores/ticket/models/TicketFilterModel';
import { selectTicketDrpToStr } from 'selectors/ticket/TicketSelector';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as TicketActions from 'stores/ticket/TicketActions';
import IUserResult from 'selectors/user/models/IUserResult';
import styles from './AdvanceSearch.module.scss';
import IStore from 'models/IStore';

interface IProps {
  setBtnCancel: any;
}

const AdvancedSearch: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const location = useLocation<LocationState>();
  const state: any = location?.state!;

  const { setBtnCancel } = props;

  const { getTicket, searcTicket, filterTicket } = TicketPageHooks();
  const [initialValues, setInitialValues] = useState({});
  const [projStatus, setProjStatus] = useState([]);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const search: any = useSelector((state: IStore) => state.ticket?.ticketList?.search);

  const secondaryResource: any = useSelector((state: IStore) => selectTicketDrpToStr(state, 'secoundaryResource'));
  const workStatus: any = useSelector((state: IStore) => selectWorklistDrpToStr(state, 'taskStatus'));
  const resource: any = useSelector((state: IStore) => selectTicketDrpToStr(state, 'resource'));
  const customer: any = useSelector((state: IStore) => selectTicketDrpToStr(state, 'customer'));

  useEffect(() => {
    if (state?.projectId) {
      dispatch(TicketActions.getDropdownBy('secoundaryResource', +state?.projectId));
      dispatch(TicketActions.getDropdownBy('resource', +state?.projectId));
    } else {
      if (currentUser.employeeID > 0) {
        dispatch(TicketActions.getDropdown('secoundaryResource', currentUser.employeeID));
        dispatch(TicketActions.getDropdown('resource', currentUser.employeeID));
        dispatch(TicketActions.getDropdown('customer', currentUser.employeeID));
      }
    }

    dispatch(WorkListActions.getFilterBy('statusWorkAll'));
  }, [dispatch, currentUser, state]);

  const dateToString = (date: any): string => {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS');
  };

  const onSubmitHandler = (values: any) => {
    const filterTicketList = new TicketFilterModel(values);
    filterTicketList.ticketStatusList = projStatus.length === 0 ? '' : projStatus.join(';');
    filterTicketList.primaryResourceList = values.resource === undefined ? '' : values.resource.join(';');
    filterTicketList.secondaryResourceList = values.secondaryResource === undefined ? '' : values.secondaryResource.join(';');
    filterTicketList.actualStartDate = values.actualStartDate === undefined ? '' : dateToString(values.actualStartDate);
    filterTicketList.actualEndDate = values.actualEndDate === undefined ? '' : dateToString(values.actualEndDate);
    filterTicketList.customerList = values.customerName === undefined ? '' : values.customerName.join(';');

    filterTicket(filterTicketList, 1, 15, 'ticketId', 'descending');
    dispatch(WorkListActions.setActivePage(1));
    setBtnCancel(false);
  };

  const onCancel = () => {
    setInitialValues({
      ...initialValues,
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

    if (search) {
      searcTicket(1, 15, 'ticketId', 'descending', search.search);
    } else {
      getTicket(1, 15, 'ticketId', 'descending');
    }
    dispatch(TicketActions.setActivePage(1));
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

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      TicketActions.GET_TICKET_LIST_FILTER,
      TicketActions.GET_DROPDOWN_TASK_RESOURCE,
      TicketActions.GET_DROPDOWN_SECONDARY_RESOURCE,
      TicketActions.GET_DROPDOWN_TASK_RESOURCE_BYPROJECTID,
      TicketActions.GET_DROPDOWN_SECONDARY_RESOURCE_BYPROJECTID,
      WorkListActions.GET_DROPDOWN_TASK_STATUS,
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
                <h4 className={styles.FilterSubtitle}>Ticket Status</h4>
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
                <h4 className={styles.FilterSubtitle}>Resource</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="resource" component={DropdownInput} options={resource} placeholder="- Choose Resource - " />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Secondary Resource</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="secondaryResource" component={DropdownInput} options={secondaryResource} placeholder="- Choose Secondary Resource -" />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {!state?.projectId && (
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
          )}

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Actual Date Range</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="actualStartDate" labelName="Actual Start Date" component={DateInput} placeholder="Start Date" date={true} />
                <Field name="actualEndDate" labelName="Actual End Date" component={DateInput} placeholder="End Date" date={true} dropUp={true} />
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
