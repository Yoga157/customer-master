import React, { useEffect, useState } from "react";
import IStore from "models/IStore";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import { Pagination, Tooltips, Button, CheckBox } from "views/components/UI";
import { Form, Grid, Header, Icon, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import RouteEnum from "constants/RouteEnum";
import FunnelFilter from "stores/funnel/models/FunnelFilter";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as FunnelActions from "stores/funnel/FunnelActions";
import FunnelSearch from "stores/funnel/models/FunnelSearch";
import TableToExcel from "@linways/table-to-excel";
import { selectFunnels } from "selectors/funnel/FunnelSelector";
import IFunnelTable from "selectors/funnel/models/IFunnelTable";
import { format } from "date-fns";
import FunnelTable from "../funnel-main/table/FunnelTable";
import RemoveAllLocalStorageFunnelFormEdit from "../funnel-main/form/form-edit/child-edit/main-content/approval-steps/components/hooks/removeAllLocalStorageFunnelFormEdit";
import "./TabComponentStyle.scss";
import { Form as FinalForm, Field } from "react-final-form";
import FunnelConfigColumnModel from "stores/funnel/models/FunnelConfigColumnModel";

interface IProps {
  history: any;
  tabItem: string;
}

const TabComponent: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { tabItem } = props;
  const dispatch: Dispatch = useDispatch();
  const [pageSize, setPage] = useState(50);
  const activePage = useSelector((state: IStore) => state.funnel.activePage);
  const [, removeAllStorage] = RemoveAllLocalStorageFunnelFormEdit();
  const [flagExport, setFlagExport] = useState(false);

  const onSubmitHandler = (values: any) => {};

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      FunnelActions.REQUEST_POST_FUNNEL_FILTER,
      FunnelActions.REQUEST_FUNNELS,
      FunnelActions.REQUEST_FUNNELS_SEARCH,
    ])
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const funnelTables: IFunnelTable = useSelector((state: IStore) =>
    selectFunnels(state)
  );
  const isMyApproval: boolean = useSelector(
    (state: IStore) => state.funnel.isMyApproval
  );
  const columnsorting: string = useSelector(
    (state: IStore) => state.funnel.data.column
  );
  const filter: FunnelFilter = useSelector(
    (state: IStore) => state.funnel.data.filter
  );
  const search: FunnelSearch = useSelector(
    (state: IStore) => state.funnel.data.search
  );
  const direction: string = useSelector(
    (state: IStore) => state.funnel.data.sorting
  );

  useEffect(() => {
    removeAllStorage(true);
  }, [dispatch]);

  useEffect(() => {
    dispatch(FunnelActions.myApproval(false));
  }, [tabItem]);

  useEffect(() => {
    dispatch(
      FunnelActions.setColumns(
        localStorage.getItem("@confColumns")
          ? JSON.parse(localStorage.getItem("@confColumns"))
          : new FunnelConfigColumnModel({})
      )
    );
  }, [dispatch, funnelTables]);

  const handleChecked = async (e: any, checked: any) => {
    const filter = new FunnelFilter({});
    filter.commerceWorkflowStatus = "my approval";
    filter.serviceWorkflowStatus = "my approval";
    filter.userLoginID = currentUser.employeeID;
    filter.page = 1;
    filter.pageSize = 50;
    filter.role = currentUser.role;
    filter.column = "funnelGenID";
    filter.sorting = "descending";
    filter.type = "sa";

    if (isMyApproval) {
      dispatch(
        FunnelActions.requestSA(
          currentUser.employeeID,
          currentUser.role,
          columnsorting,
          direction,
          activePage,
          pageSize
        )
      );
    } else {
      dispatch(FunnelActions.postSAFilter(filter));
    }

    dispatch(FunnelActions.myApproval(!isMyApproval));
  };

  const onClickMyApproval = () => {
    const filter = new FunnelFilter({});
    filter.commerceWorkflowStatus = "my approval";
    filter.serviceWorkflowStatus = "my approval";
    filter.userLoginID = currentUser.employeeID;
    filter.page = 1;
    filter.pageSize = 15;
    filter.role = currentUser.role;
    filter.column = "funnelGenID";
    filter.sorting = "descending";
    filter.type = "sa";

    if (isMyApproval) {
      dispatch(
        FunnelActions.requestSA(
          currentUser.employeeID,
          currentUser.role,
          columnsorting,
          direction,
          activePage,
          funnelTables.totalRow
        )
      );
    } else {
      dispatch(FunnelActions.postSAFilter(filter));
    }

    dispatch(FunnelActions.myApproval(!isMyApproval));
  };

  const getData = (activePage: any, isExport: boolean) => {
    if (search !== null) {
      if (tabItem === "funnel") {
        dispatch(
          FunnelActions.requestSearchFunnel(
            currentUser.employeeID,
            search.text,
            activePage,
            isExport ? funnelTables.totalRow : pageSize,
            "funnel",
            columnsorting,
            direction
          )
        ).then(() => {
          if (isExport) {
            genExportExcel();
          }
        });
      } else {
        dispatch(
          FunnelActions.requestSearchSA(
            currentUser.employeeID,
            search.text,
            activePage,
            isExport ? funnelTables.totalRow : pageSize,
            columnsorting,
            direction
          )
        ).then(() => {
          if (isExport) {
            genExportExcel();
          }
        });
      }
    } else if (filter !== null) {
      const filterNew = new FunnelFilter(filter);
      filterNew.pageSize = isExport ? funnelTables.totalRow : pageSize;
      filterNew.page = activePage;
      filterNew.column = columnsorting;
      filterNew.sorting = direction;
      filterNew.type = tabItem === "funnel" ? "funnel" : "sa";
      if (tabItem === "funnel") {
        dispatch(FunnelActions.postFunnelFilter(filterNew)).then(() => {
          if (isExport) {
            genExportExcel();
          }
        });
      } else {
        dispatch(FunnelActions.postSAFilter(filterNew)).then(() => {
          if (isExport) {
            genExportExcel();
          }
        });
      }
    } else {
      if (tabItem === "funnel") {
        dispatch(
          FunnelActions.requestFunnel(
            currentUser.employeeID,
            currentUser.role,
            columnsorting,
            direction,
            "funnel",
            activePage,
            isExport ? funnelTables.totalRow : pageSize
          )
        ).then(() => {
          if (isExport) {
            genExportExcel();
          }
        });
      } else {
        dispatch(
          FunnelActions.requestSA(
            currentUser.employeeID,
            currentUser.role,
            columnsorting,
            direction,
            activePage,
            isExport ? funnelTables.totalRow : pageSize
          )
        ).then(() => {
          if (isExport) {
            genExportExcel();
          }
        });
      }
    }
  };

  const genExportExcel = (): void => {
    if (isRequesting === false) {
      dispatch(FunnelActions.setExportExcel(true));

      setTimeout(() => {
        let tableSelect: any;
        let nameFile: string;

        if (tabItem === "funnel") {
          nameFile = "FunnelList ";
          tableSelect = document.getElementById(
            "export-funnel"
          ) as HTMLTableElement;
        } else {
          nameFile = "FunnelListSA ";
          tableSelect = document.getElementById(
            "export-sa"
          ) as HTMLTableElement;
        }

        TableToExcel.convert(tableSelect, {
          name: nameFile + currDate + ".xlsx",
          sheet: {
            name: "Sheet 1",
          },
        });
      }, 5);

      setTimeout(() => {
        dispatch(FunnelActions.setExportExcel(false));
        dispatch(FunnelActions.setActivePage(1));
        getData(1, false);
      }, 10);
    }
  };

  const exportTableToExcel = (tableID: string, filename: string): void => {
    dispatch(FunnelActions.setActivePage(1));
    getData(1, true);
  };

  const handlePaginationChange = (e: any, data: any) => {
    dispatch(FunnelActions.setActivePage(data.activePage));
    getData(data.activePage, false);
  };

  const currDate: string = format(new Date(), "cccc LLLL d, yyyy");
  return (
    <>
      <Grid columns="equal">
        <Grid.Column width={6} className="title-w-toggle">
          <Header as="h4" className="d-in-flex-w-toggle">
            <Header.Content>
              {filter !== null
                ? tabItem === "funnel"
                  ? "Funnels Filtered"
                  : "Sales Analysis Filtered"
                : search !== null
                ? tabItem === "funnel"
                  ? "Search Funnels"
                  : "Search Sales Analysis"
                : tabItem === "funnel"
                ? "On Going Funnels"
                : "Sales Analysis"}
            </Header.Content>

            {tabItem === "salesAnalysis" && (
              /*  <Tooltips
                content="My Approval"
                trigger={
                  <Icon
                    name={isMyApproval ? 'calendar times' : 'calendar check'}
                    className="ml-px-5 hover-pointer ic-my-approval"
                    onClick={() => onClickMyApproval()}
                  />
                }
              /> */
              <div>
                {
                  <FinalForm
                    onSubmit={(values: any) => onSubmitHandler(values)}
                    //initialValues={serviceCatalog}
                    render={() => (
                      <Form>
                        <Grid.Column>
                          {/* <span>InActive</span> */}
                          <span>
                            <Field
                              name={"asd"}
                              toggle
                              component={CheckBox}
                              // disabled={disableComponent}
                              //disabled
                              //checked={true}
                              onChange={(e, checked) =>
                                handleChecked(e, checked)
                              }
                            />
                          </span>
                          <span className="w-toggle-note">
                            My Approval Filter
                          </span>
                        </Grid.Column>
                      </Form>
                    )}
                  />
                }
              </div>
            )}
          </Header>
        </Grid.Column>

        <Grid.Column width={10}>
          <Tooltips
            content="Export this funnels table"
            trigger={
              <Button
                className="m-05r"
                icon="file excel"
                size="small"
                color="blue"
                content="Export Excel"
                floated="right"
                onClick={() =>
                  exportTableToExcel("export", `FunnelList ${currDate}`)
                }
              />
            }
          />

          {(currentUser.role === "Sales" ||
            currentUser.role === "SuperAdmin") && (
            <>
              <Link to={RouteEnum.CustomerTransfer}>
                <Tooltips
                  content="Reassign sales"
                  trigger={
                    <Button
                      className="m-05r"
                      icon="random"
                      size="small"
                      color="green"
                      floated="right"
                      content="Reassign Sales"
                    />
                  }
                />
              </Link>

              {tabItem === "funnel" && (
                <Link
                  to={{
                    pathname: `${RouteEnum.FunnelForm}`,
                    state: {
                      typePage: "funnel",
                      funnelGenID: 0,
                      tab: "funnel",
                    },
                  }}
                >
                  <Tooltips
                    content="Add new funnel"
                    trigger={
                      <Button
                        className="m-05r"
                        icon="plus"
                        color="yellow"
                        disabled={false}
                        floated="right"
                        size="small"
                        content="Add New Funnel"
                      />
                    }
                  />
                </Link>
              )}
            </>
          )}
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Row className="pt-0">
          <Grid.Column className="pt-0">
            <div className="wrapper-table mb-1r">
              <FunnelTable tableData={funnelTables} tabItem={tabItem} />
            </div>
            <Pagination
              activePage={
                filter !== null
                  ? filter.page
                  : search !== null
                  ? search.page
                  : activePage
              }
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={funnelTables.totalRow}
              pageSize={
                filter !== null
                  ? filter.pageSize
                  : search !== null
                  ? search.pageSize
                  : pageSize
              }
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {tabItem !== "funnel" && (
        <Grid centered columns={1} className="legendGrid">
          <Grid.Row>
            <Grid.Column className="FullGrid767" width={9}>
              <Segment>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={15}>
                      <h5>Notes :</h5>
                    </Grid.Column>
                    <Grid.Column className="FullGrid767" width={6}>
                      <Label
                        className="legendSA"
                        circular
                        color="yellow"
                        empty
                        key="yellow"
                      />
                      <p>My SA - Waiting for Approval</p>
                    </Grid.Column>
                    <Grid.Column className="FullGrid767" width={5}>
                      <Label
                        className="legendSA"
                        circular
                        color="green"
                        empty
                        key="green"
                      />
                      <p>Completed Sales Analysis</p>
                    </Grid.Column>
                    <Grid.Column className="FullGrid767" width={5}>
                      <Label
                        className="legendSA"
                        circular
                        color="red"
                        empty
                        key="red"
                      />
                      <p>Rejected Sales Analysis</p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </>
  );
};

export default TabComponent;
