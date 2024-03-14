import IStore from "models/IStore";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { Grid, Header } from "semantic-ui-react";
import { Button, Pagination } from "views/components/UI";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import ActivityReportGroupingListTable from "./table/ActivityReportGroupingListTable";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import ServiceFormARGrouping from "./form/ServiceFormARGrouping";
import { InputSearchARGrouping } from "./search/InputSearchARGrouping";
import * as ActivityReportGroupingActions from "stores/activity-report-grouping/ActivityReportGroupingActions";
import { selectActivityReportGrouping } from "selectors/activity-report-grouping/ActivityReportGroupingSelector";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';

interface IProps {}

const ActivityReportGroupingListPage: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(15);
  const [activePage, setActivePage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [columns, setColumns] = useState("");
  const [direction, setDirection] = useState("ascending" as any);

  const result: any = useSelector((state: IStore) => state.activityReportGrouping.resultActions);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    // if (search !== null) {
    //   dispatch(ActivityReportActions.requestActivityReportSearch(data.activePage, pageSize, columnSorting, direction, search.search, currentUser.email, +currentUser.employeeID));
    // } else if (filter != null) {
    //   const filterItem = new ActivityReportFilter(filter);
    //   filterItem.pageSize = pageSize;
    //   filterItem.page = data.activePage;
    //   filterItem.column = columnSorting;
    //   filterItem.sorting = direction;
    //   dispatch(ActivityReportActions.requestActivityReportFilterSearch(filterItem));
    // } else {
    //   dispatch(ActivityReportActions.requestActivityReports(data.activePage, pageSize, 'activityReportGenID', 'descending', currentUser.email, +currentUser.employeeID));
    // }
  };

  const dashboardARGroup = useSelector((state: IStore) =>
    selectActivityReportGrouping(state)
  );
  
  useEffect(() => {
    dispatch(
      ActivityReportGroupingActions.RequestActivityReportGrouping(
        activePage,
        pageSize,
        columns,
        direction,
        currentUser.employeeID
      )
    );
  }, []);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING,
      ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_SEARCH,
      ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_FILTER,
      ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_DETAIL,
    ])
  );

  const AddARGrouping = () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ServiceFormARGrouping type={"ADD"} />,
        ModalSizeEnum.Small
      )
    );
  };

  useEffect(() => {
    if (result?.errorNumber == "0") {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Success));
      dispatch(
        ActivityReportGroupingActions.RequestActivityReportGrouping(
          activePage,
          pageSize,
          columns,
          direction,
          currentUser.employeeID
        )
      );
      // dispatch(CreditBillingActions.removeResult())
    } else if (result?.bSuccess === false) {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Warning));
      // dispatch(CreditBillingActions.removeResult())
    }
  }, [result])

  let searchType = "";
  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid className="mt-10r">
          <Grid.Column textAlign="center">
            <InputSearchARGrouping
              searchText={searchText}
              setSearchText={setSearchText}
              pageSize={pageSize}
              page={activePage}
              columns={columns}
              direction={direction}
              searchType={searchType}
            />
          </Grid.Column>
        </Grid>

        <Grid columns="equal">
          <Grid.Column width={4}>
            <Header as="h4">
              <Header.Content className="ml-1r-767">
                AR Grouping List
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column width={12}>
            <Button
              icon="plus"
              color="yellow"
              disabled={false}
              floated="right"
              content="Add New AR Grouping"
              onClick={AddARGrouping}
            />
          </Grid.Column>
        </Grid>

        <Grid columns="equal">
          <Grid.Column>
            {/* <div className="x-ovflo-auto mb-1"> */}
              <ActivityReportGroupingListTable tableData={dashboardARGroup} />
            {/* </div> */}

            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={dashboardARGroup.totalRows}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid>

        <br />
      </LoadingIndicator>
    </Fragment>
  );
};

export default ActivityReportGroupingListPage;
