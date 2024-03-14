import React, { Fragment, useEffect, useState } from 'react';
import { Form, Grid, Header, Icon, Placeholder, Segment } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import moment from 'moment';

import { selectQuotaMaster, selectQuotaMasterTeam, selectSummaryQuota } from 'selectors/quota/QuotaSelectors';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectEmployeeSubDqAll } from 'selectors/select-options/EmployeeSelector';
import EmployeeDqAllModel from 'stores/employee/models/EmployeeDqAllModel';
import AccordionMyQuota from './components/accordionList/AccordionMyQuota';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import AccordionNested from './components/accordionList/AccordionList';
import SummaryQuotaModel from 'stores/quota/models/SummaryQuotaModel';
import QuotaMasterModel from 'stores/quota/models/QuotaMasterModel';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import InputSearch from './components/search/InputSearch';
import * as QuotaActions from 'stores/quota/QuotaActions';
import * as ToastAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import { DateInput } from 'views/components/UI';
import RouteEnum from 'constants/RouteEnum';
import IStore from 'models/IStore';
import './QuotaSettingStyle.scss';

interface IProps {
  history: any;
}

const QuotaSetting: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');

  const employeeDqAll: EmployeeDqAllModel[] = useSelector((state: IStore) => selectEmployeeSubDqAll(state));
  const quotaMasterMyOwn: QuotaMasterModel = useSelector((state: IStore) => selectQuotaMaster(state));
  const summaryQuota: SummaryQuotaModel = useSelector((state: IStore) => selectSummaryQuota(state));
  const summarySharedQuota: any = useSelector((state: IStore) => state.quota.summarySharedQuota);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const quotaHeader = useSelector((state: IStore) => state.quota.quotaHeader[0]);

  const onSubmitHandler = (values: any) => {
    console.log('submit');
  };

  const onChangeSearch = (event: any, data: any) => {
    if (data.value.length >= 1) {
      setIsSearch(data.value);
      // dispatch(QuotaActions.getQuotaMasterMyTeamQuota(currentUser.userName, `${new Date().getFullYear()}`, 'SalesName', 'ascending', data.value));
    }

    if (data.value.length <= 0) {
      setIsSearch(data.value);
      // dispatch(QuotaActions.getQuotaMasterMyTeamQuota(currentUser.userName, `${new Date().getFullYear()}`, 'SalesName', 'ascending', ''));
    }
  };

  const handleSearchEmployee = (e, data) => {
    setSelectedEmployee(data.value);
    //dispatch(EmployeeActions.searchALL(data.value, '27'));
    dispatch(EmployeeActions.requestEmployeeByName(data.value, '27'));
  };

  const onResultEmployee = (e, data) => {
    setSelectedEmployee(data.result.title);
    dispatch(QuotaActions.getQuotaMasterMyOwnQuota(data.result.price, `${new Date().getFullYear()}`));
  };

  useEffect(() => {
    if (currentUser.employeeID) {
      dispatch(QuotaActions.getQuotaMasterMyOwnQuota(currentUser.employeeID, `${new Date().getFullYear()}`));

      if (currentUser.role !== 'Admin Quota') {
        dispatch(QuotaActions.getQuotaMasterMyTeamQuota(currentUser.userName, `${new Date().getFullYear()}`, 'SalesName', 'ascending'));
        dispatch(QuotaActions.getReportSummarySharedQuota(currentUser.userName, new Date().getFullYear()));
      }

      // dispatch(QuotaActions.getSummaryQuota(currentUser.employeeID, new Date().getFullYear())); // ga di pake
    }
    dispatch(QuotaActions.getQuotaByEntryKey('settingQuota'));
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (currentUser.role === 'Admin Quota') {
      dispatch(QuotaActions.getReportSummarySharedQuota(quotaMasterMyOwn?.salesDomain, new Date().getFullYear()));
      dispatch(EmployeeActions.requestEmployeeSubordinateDqAll('subordinate', quotaMasterMyOwn?.salesDomain));
    }
  }, [dispatch, quotaMasterMyOwn, currentUser]);

  const resultActions = useSelector((state: IStore) => state.quota.resultActions);
  useEffect(() => {
    if (resultActions?.errorNumber === '666') {
      dispatch(ToastAction.add(resultActions.message, ToastStatusEnum.Warning));
      dispatch(QuotaActions.removeResult());
    } else if (resultActions?.errorNumber === '0') {
      dispatch(ToastAction.add(resultActions.message, ToastStatusEnum.Success));
      dispatch(QuotaActions.removeResult());
    }
  }, [resultActions]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      QuotaActions.REQUEST_GET_QUOTA_MASTER_MYOWNQUOTA,
      QuotaActions.REQUEST_GET_QUOTA_MASTER_MYTEAM,
      QuotaActions.REQUEST_GET_QUOTA_MASTER_MYTEAM_SEARCH,
      QuotaActions.REQUEST_POST_QUOTA_MYTEAM,
      EmployeeActions.REQUEST_EMPLOYEE_SUBORDINATE_DQALL,
    ])
  );

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid columns="equal">
          <Grid.Column width={13} className="pt-2r" verticalAlign="middle">
            <Header as="h4">
              <Header.Content className="ml-1r-767">My Quota Setting</Header.Content>
              <span className="dangerText">
                You can setting quota until {quotaHeader ? moment(quotaHeader.dateTime2).format('DD MMMM yyyy - HH:mm') : ' - '}
              </span>
            </Header>
          </Grid.Column>
          <Grid.Column width={3} verticalAlign="middle">
            {currentUser.role !== 'Admin Quota' && (
              <FinalForm
                onSubmit={(values: any) => onSubmitHandler(values)}
                render={({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    {/* <Field
                      name="quotaDateFilter"
                      labelName="Quota Date Filter"
                      component={DateInput}
                      placeholder="Select your date.."
                      date={true}
                      className="leftDatePicker"
                      onChange={(e) => {
                        console.log('e', e);
                        dispatch(
                          QuotaActions.getQuotaMasterMyTeamQuotaSearch(currentUser.userName, 'SalesName', 'ascending', moment(e).format('yyyy-MM-DD'))
                        );
                      }}
                    /> */}
                    <Form.Input
                      onChange={(e) => {
                        e.target.value
                          ? dispatch(
                              QuotaActions.getQuotaMasterMyTeamQuotaSearch(
                                currentUser.userName,
                                'SalesName',
                                'ascending',
                                moment(e.target.value).format('yyyy-MM-DD')
                              )
                            )
                          : dispatch(
                              QuotaActions.getQuotaMasterMyTeamQuota(currentUser.userName, `${new Date().getFullYear()}`, 'SalesName', 'ascending')
                            );
                      }}
                      type="date"
                      fluid
                      label="Quota Date Filter"
                      className="leftDatePicker"
                      placeholder="Select your date.."
                    />
                  </Form>
                )}
              />
            )}
          </Grid.Column>
        </Grid>

        <Grid columns="equal">
          <Grid.Column textAlign="center">
            {currentUser.role === 'Admin Quota' && (
              <InputSearch
                onChangeSearch={'quota'}
                handleSearchEmployee={handleSearchEmployee}
                selectedEmployee={selectedEmployee}
                onResultEmployee={onResultEmployee}
              />
            )}
          </Grid.Column>
        </Grid>

        <Grid className="jumbotronQuota">
          <Grid.Row centered equal="true">
            {/* <Grid.Column className="jumbotronItem Blue">
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column width={3} className="FullGrid1200">
                    <h5>
                      <Icon size="big" circular name="money bill alternate" />
                    </h5>
                  </Grid.Column>
                  <Grid.Column className="FullGrid1200">
                    <span>My Total Quota (IDR)</span>
                    <h2>{summaryQuota.quotaGPM.toLocaleString()}</h2>
                    <span>1 XXXXXXX 2022 - 31 XXXXXX 2022</span>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column> */}

            {(quotaMasterMyOwn?.unsetQuotaPeople !== 0 || quotaMasterMyOwn?.notFullDistributed !== 0 || summarySharedQuota?.valueData) && (
              <>
                {summarySharedQuota?.valueData && (currentUser?.employeeID === 807 || currentUser?.hirarki?.length > 1 || employeeDqAll.length > 1) && (
                  <>
                    <Grid.Column width={4} className="jumbotronItem Blue">
                      <Grid columns="equal">
                        <Grid.Row>
                          <Grid.Column width={4} className="FullGrid1200">
                            <h5>
                              <Icon size="big" circular name="money bill alternate" />
                            </h5>
                          </Grid.Column>
                          <Grid.Column className="FullGrid1200">
                            <span>Shared GPM Quota (%)</span>
                            <h2>{summarySharedQuota?.valueData}%</h2>
                            <span>{summarySharedQuota?.textData}</span>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>
                  </>
                )}

                <Grid.Column width={4} className="jumbotronItem Yellow">
                  <Link
                    to={{
                      pathname: `${RouteEnum.UnsetQuota}`,
                      state: { userName: quotaMasterMyOwn?.salesDomain },
                    }}
                  >
                    <Grid columns="equal">
                      <Grid.Row>
                        <Grid.Column width={4} className="FullGrid1200">
                          <h5>
                            <Icon size="big" circular name="users" />
                          </h5>
                        </Grid.Column>
                        <Grid.Column className="FullGrid1200">
                          <span>Unset Quota (People)</span>
                          <h2>{quotaMasterMyOwn?.unsetQuotaPeople}</h2>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Link>
                </Grid.Column>
                <Grid.Column width={4} className="jumbotronItem Red">
                  <Link
                    to={{
                      pathname: `${RouteEnum.NotFullQuota}`,
                      state: { userName: quotaMasterMyOwn?.salesDomain },
                    }}
                    // to={RouteEnum.NotFullQuota}
                  >
                    <Grid columns="equal">
                      <Grid.Row>
                        <Grid.Column width={4} className="FullGrid1200">
                          <h5>
                            <Icon size="big" circular name="users" />
                          </h5>
                        </Grid.Column>
                        <Grid.Column className="FullGrid1200">
                          <span>Not Full Distributed Quota (People)</span>
                          <h2>{quotaMasterMyOwn?.notFullDistributed}</h2>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Link>
                </Grid.Column>
              </>
            )}
          </Grid.Row>
        </Grid>

        {(quotaMasterMyOwn?.hardware?.rows?.length > 0 ||
          quotaMasterMyOwn?.service?.rows?.length > 0 ||
          quotaMasterMyOwn?.software?.rows?.length > 0) && (
          <Grid>
            <Grid.Row centered columns={1}>
              <Grid.Column width={12} textAlign="center">
                <Segment className="LightYellowNotif">
                  <h5>Achievement Requirement for Brand and Service (SI Directorate)</h5>
                  <p>
                    SALES - Achieve 2 of 6 selected hardware products, achieve 2 of 8 selected software products & achieve 1 of 5 selected services{' '}
                    <br />
                    BM - Achieve 3 of 8 selected hardware products, 2 from 10 software products achieve & 1 from 5 services achieve
                    <br />
                    GM non P&L - Achieve 3 of 10 selected hardware products, 3 from 11 software products achieve & 1 from 5 services achieve
                  </p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}

        <div className="pb-1 mt-1r">
          {(currentUser.role !== 'Admin Quota' || quotaMasterMyOwn.salesDomain !== currentUser.userName) && (
            <AccordionMyQuota quotaMaster={quotaMasterMyOwn} />
          )}

          {currentUser.role !== 'Admin Quota' && (
            <AccordionNested currentUser={currentUser} quotaMasterMyOwn={quotaMasterMyOwn} isSearch={isSearch} />
          )}
        </div>
      </LoadingIndicator>
    </Fragment>
  );
};

export default QuotaSetting;
