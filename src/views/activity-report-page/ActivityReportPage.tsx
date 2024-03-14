import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { Link, useLocation, useParams, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import ActivityReportTable from './components/table/ActivityReportTable';
import { Pagination, Button } from 'views/components/UI';
import InputSearch from './components/search/InputSearch';
import RouteEnum from 'constants/RouteEnum';
import * as ActivityReportActions from 'stores/activity-report/ActivityReportActions';
import IActivityReportTable from 'selectors/activity-report/models/IActivityReportTable';
import { selectActivityReports } from 'selectors/activity-report/ActivityReportSelector';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import ActivityReportFilter from 'stores/activity-report/models/ActivityReportFilter';
import ActivityReportSearch from 'stores/activity-report/models/ActivityReportSearch';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
  // readonly history: any;
}

interface LocationState {
 
}

const ActivityReportPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const location = useLocation<LocationState>();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPage] = useState(10);
  const activityReportTable: IActivityReportTable = useSelector((state: IStore) => selectActivityReports(state, [ActivityReportActions.REQUEST_ACTIVITY_REPORTS]));
  const columnSorting: string = useSelector((state: IStore) => state.activityReport.listData.column);
  const filter: ActivityReportFilter = useSelector((state: IStore) => state.activityReport.listData.filter);
  const search: ActivityReportSearch = useSelector((state: IStore) => state.activityReport.listData.search);
  const direction: string = useSelector((state: IStore) => state.activityReport.listData.sorting);
  
  const SplitParamsDedicated = location.pathname.split("activity-report/");
  // console.log("SplitParamsDedicated",SplitParamsDedicated);

  useEffect(() => {

    if (+SplitParamsDedicated[1] > 0) {
      JSON.parse(localStorage.getItem("TempDedicated")).map((item) => {
        if(+item.employeeID === +SplitParamsDedicated[1])
        {
          dispatch(ActivityReportActions.requestActivityReports(activePage, pageSize, 'activityReportGenID', 'descending', item.employeeEmail, item.employeeID));
        }
      })
    } else {
      dispatch(ActivityReportActions.requestActivityReports(activePage, pageSize, 'activityReportGenID', 'descending', currentUser.email, +currentUser.employeeID));
    }

  }, [dispatch, +SplitParamsDedicated[1] > 0]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    if (search !== null) {
      dispatch(ActivityReportActions.requestActivityReportSearch(data.activePage, pageSize, columnSorting, direction, search.search, currentUser.email, +currentUser.employeeID));
    } else if (filter != null) {
      const filterItem = new ActivityReportFilter(filter);
      filterItem.pageSize = pageSize;
      filterItem.page = data.activePage;
      filterItem.column = columnSorting;
      filterItem.sorting = direction;
      dispatch(ActivityReportActions.requestActivityReportFilterSearch(filterItem));
    } else {
      dispatch(ActivityReportActions.requestActivityReports(data.activePage, pageSize, 'activityReportGenID', 'descending', currentUser.email, +currentUser.employeeID));
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ActivityReportActions.REQUEST_ACTIVITY_REPORTS,
      ActivityReportActions.REQUEST_FILTER_SEARCH_ACTIVITY_REPORT,
      ActivityReportActions.REQUEST_SEARCH_ACTIVITY_REPORT]));


  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid columns='equal'>
          <Grid.Column textAlign='center'>
            <InputSearch />
          </Grid.Column>
        </Grid>

        <Grid columns='equal'>
          <Grid.Column width={4}>
            <Header as='h4'>
              <Header.Content className='ml-1r-767'>Activity Report List</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column width={12}>
            <Link to={RouteEnum.ActivityReportForm}>
              <Button icon="plus" color="yellow" disabled={false} floated="right" content="Add New" />
            </Link>
          </Grid.Column>
        </Grid>

        <Grid columns='equal'>
          <Grid.Column>
            <div className='x-ovflo-auto mb-1'>
              <ActivityReportTable
                tableData={activityReportTable}
              />
            </div>

            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={activityReportTable.totalRow}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid>

        <br />
      </LoadingIndicator>
    </Fragment>
  );
};

export default ActivityReportPage;