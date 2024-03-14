import IStore from "models/IStore";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { Grid, Header } from "semantic-ui-react";
import { Button, Pagination } from "views/components/UI";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import ActivityReportListTable from "./table/ActivityReportListTable";

interface IProps {}

const ActivityReportListPage: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPage] = useState(10);

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
  
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
    ])
  );

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid columns="equal">
          <Grid.Column textAlign="center">{/* <InputSear /> */}</Grid.Column>
        </Grid>

        <Grid columns="equal">
          <Grid.Column width={4}>
            <Header as="h4">
              <Header.Content className="ml-1r-767">
                Activity Report List
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column width={12}>
            <Link
              to={""}
              // to={RouteEnum.ActivityReportForm}
            >
              <Button
                icon="plus"
                color="yellow"
                disabled={false}
                floated="right"
                content="Add New AR"
              />
            </Link>
          </Grid.Column>
        </Grid>

        <Grid columns="equal">
          <Grid.Column>
            <div className="x-ovflo-auto mb-1">
              <ActivityReportListTable 
                // tableData={activityReportTable}
              />
            </div>

            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={1}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid>

        <br />
      </LoadingIndicator>
    </Fragment>
  );
};

export default ActivityReportListPage;
