import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Grid, Checkbox, Icon } from "semantic-ui-react";
import CustomerTable from "./components/allaccountspage-main/table/CustomerTable";
import InputSearch from "./components/allaccountspage-main/search/InputSearch";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import "./AllAccountsPage.scss";
import IStore from "models/IStore";
import { useHistory } from "react-router-dom";
import ModalSizeEnum from "constants/ModalSizeEnum";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import * as CustomerActions from "stores/customer-setting/CustomerActivityActions";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { Pagination, Tooltips, Button } from "views/components/UI";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import ModCloseNewRequest from "./components/allaccountspage-main/form/form-closerequestnew/FormRequestNew";
import TableToExcel from "@linways/table-to-excel";
import { selectAllAccount } from "selectors/customer-setting/CustomerSettingSelector";
import FilterCustomer from "./components/allaccountspage-main/filter/FilterCustomer";
import { format } from "date-fns";
import RouteEnum from "constants/RouteEnum";
import * as CustomerMasterActions from "stores/customer-master/CustomerMasterActivityActions";

interface IProps {
  history: any;
  role: string;
}

interface FilterData {
  nonameAccount: any;
  namedAccount: any;
  pmo_customer: any;
  newsalesAssign: any;
  holdshipment: any;
  blacklist: any;
  shareableAccount: any;
  isNew: any;
}

const AllAccountsPage: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { role } = props;
  const dispatch: Dispatch = useDispatch();
  const [pageSize, setPage] = useState(10);
  const history = useHistory();
  const activePage = useSelector(
    (state: IStore) => state.customerSetting.activePage
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const currDate: string = format(new Date(), "cccc LLLL d, yyyy");
  const [rowData, setRowData] = useState([]);
  const [filterData, setFilterData] = useState<FilterData | undefined>(
    undefined
  );
  const [myAccount, setMyAccount] = useState(false);

  const setNewRowData = (data) => {
    setRowData(data);
  };

  const handleMyAccount = () => {
    const userId: any = localStorage.getItem("userLogin");

    if (myAccount == false) {
      setMyAccount(true);
      const salesID = JSON.parse(userId)?.employeeID;
      dispatch(
        CustomerActions.requestSearchAllAcc(
          activePage,
          pageSize,
          "CustomerID",
          null,
          "ascending",
          salesID
        )
      );
    } else {
      setMyAccount(false);

      dispatch(
        CustomerActions.requestAllAcc(
          activePage,
          pageSize,
          "CustomerID",
          "ascending"
        )
      );
    }
  };

  const handleMyApproval = () => {
    const userId: any = localStorage.getItem("userLogin");

    if (myAccount == false) {
      setMyAccount(true);
      const salesID = JSON.parse(userId)?.employeeID;
      dispatch(
        CustomerActions.requestSearchAllAcc(
          activePage,
          pageSize,
          "CustomerID",
          null,
          "ascending",
          null,
          salesID
        )
      );
    } else {
      setMyAccount(false);

      dispatch(
        CustomerActions.requestAllAcc(
          activePage,
          pageSize,
          "CustomerID",
          "ascending"
        )
      );
    }
  };

  const generateExcel = () => {
    let tableSelect: any;
    let tableHead: any;

    if (window.location.pathname === "/data-quality/customer-setting-page") {
      tableSelect = document.getElementById(
        "exporttosetting"
      ) as HTMLTableElement;
      tableHead = document.querySelector(
        "#exporttosetting > thead > tr > th:nth-child(1)"
      ) as HTMLTableElement;
    } else {
      tableSelect = document.getElementById("exportosett") as HTMLTableElement;
      tableHead = document.querySelector(
        "#exportosett > thead > tr > th:nth-child(1)"
      ) as HTMLTableElement;
    }

    if (tableHead) {
      tableHead.style.display = "none";
    }

    const tableClone = tableSelect.cloneNode(true) as HTMLTableElement;

    for (let i = 0; i < tableClone.rows.length; i++) {
      const firstCol = tableClone.rows[i].cells[0];
      if (firstCol) {
        firstCol.remove();
      }
    }

    // Convert the cloned table to Excel
    TableToExcel.convert(tableClone, {
      name: "AllAccounts_" + currDate + ".xlsx",
      sheet: {
        name: "Sheet 1",
      },
    });
  };

  const exportTableToExcel = (tableID: string, filename: string): void => {
    const search = document.querySelector(
      "#search-input-customer"
    )! as HTMLInputElement;
    if (search.value.length > 0) {
      dispatch(
        CustomerActions.requestSearchAllAcc(
          1,
          tableData.totalRow,
          "CustomerID",
          search.value
        )
      )
        .then(() => {
          generateExcel();
        })
        .then(() => {
          dispatch(
            CustomerActions.requestAllAcc(
              1,
              pageSize,
              "CustomerID",
              search.value
            )
          );
        });
    } else {
      dispatch(
        CustomerActions.requestAllAcc(
          1,
          tableData.totalRow,
          "CustomerID",
          "ascending"
        )
      )
        .then(() => {
          generateExcel();
        })
        .then(() => {
          dispatch(
            CustomerActions.requestAllAcc(
              1,
              pageSize,
              "CustomerID",
              "ascending"
            )
          );
        });
    }
  };

  const isSuccess = useSelector(
    (state: IStore) => state.customerMaster.isSuccess
  );
  const openModal = useCallback(() => {
    if (isSuccess) {
      dispatch(
        ModalFirstLevelActions.OPEN(<ModCloseNewRequest />, ModalSizeEnum.Tiny)
      );
    }
  }, [dispatch, isSuccess]);

  // console.log("Nilai Allacount", isSuccess);
  useEffect(() => {
    if (isSuccess) {
      openModal();
      dispatch(CustomerMasterActions.setSuccessModal(false));
    }
  }, [isSuccess]);

  const OnrequestNewCustomer = () => {
    history.push({
      pathname: RouteEnum.AddNewCustomerSetting,
      state: { rowData },
    });
  };

  useEffect(() => {
    dispatch(
      CustomerActions.requestAllAcc(
        activePage,
        pageSize,
        "CustomerID",
        "ascending"
      )
    );
  }, [dispatch]);

  const handlePaginationChange = (e: any, data: any) => {
    dispatch(CustomerActions.setActivePage(data.activePage));
    const search = document.querySelector(
      "#search-input-customer"
    )! as HTMLInputElement;

    // if (window.location.pathname === "/data-quality/customer-setting") {

    if (filterData != undefined) {
      dispatch(
        CustomerActions.requestSearchAllAcc(
          data.activePage,
          pageSize,
          "CustomerID",
          null,
          "ascending",
          filterData.newsalesAssign,
          filterData.pmo_customer,
          filterData.blacklist,
          filterData.holdshipment,
          filterData.nonameAccount,
          filterData.namedAccount,
          filterData.shareableAccount,
          filterData.isNew
        )
      );
    } else if (myAccount) {
      const userId: any = localStorage.getItem("userLogin");
      const salesID = JSON.parse(userId)?.employeeID;
      if (JSON.parse(userId).role == "Sales") {
        dispatch(
          CustomerActions.requestSearchAllAcc(
            data.activePage,
            pageSize,
            "CustomerID",
            null,
            "ascending",
            salesID
          )
        );
      } else {
        dispatch(
          CustomerActions.requestSearchAllAcc(
            data.activePage,
            pageSize,
            "CustomerID",
            null,
            "ascending",
            null,
            salesID
          )
        );
      }
    } else if (search.value.length > 0) {
      dispatch(
        CustomerActions.requestSearchAllAcc(
          data.activePage,
          pageSize,
          "CustomerID",
          search.value
        )
      );
    } else {
      dispatch(
        CustomerActions.requestAllAcc(
          data.activePage,
          pageSize,
          "CustomerID",
          "ascending"
        )
      );
    }
    // }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerActions.REQUEST_ALL_ACCOUNTS,
      CustomerActions.REQUEST_ALL_SEARCH,
    ])
  );

  const tableData = useSelector((state: IStore) => selectAllAccount(state));

  /** Advanced filter */
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <div className="search-container">
          <Button
            className="m-05r"
            icon="sliders horizontal"
            size="big"
            color="yellow"
            disabled={false}
            onClick={() => setOpenFilter(!openFilter)}
          />
          <InputSearch />
        </div>

        <div className="fitur-container">
          <div className=" center-fitur-container">
            <h2 className="h2-container">Customer List</h2>
          </div>

          <div className="posision-container">
            {role === "Admin" ? (
              <>
                <div className="tgl-account">
                  <div className="flex-center">
                    <Checkbox
                      style={{ margin: "0.5rem", transform: "scale(0.9)" }}
                      toggle
                      checked={myAccount}
                      onChange={() => handleMyApproval()}
                    ></Checkbox>
                  </div>
                  <p style={{ fontSize: "0.8rem", margin: "0.5rem" }}>
                    MY APPROVAL FILTER
                  </p>
                </div>
              </>
            ) : (
              <div className="tgl-account">
                <div className="flex-center">
                  <Checkbox
                    style={{ margin: "0.5rem", transform: "scale(0.9)" }}
                    toggle
                    checked={myAccount}
                    onChange={() => handleMyAccount()}
                  ></Checkbox>
                </div>
                <p style={{ fontSize: "0.8rem", margin: "0.5rem" }}>
                  My Account
                </p>
              </div>
            )}
          </div>

          <div className="posision-container-right">
            <Tooltips
              content="Export Excel"
              trigger={
                <Button
                  className="m-05r"
                  icon="file excel"
                  color="blue"
                  disabled={false}
                  floated="right"
                  size="small"
                  content="Export Excel"
                  onClick={exportTableToExcel}
                />
              }
            />
          </div>
        </div>

        <Grid columns="equal">
          <Grid.Column>
            <div className="wrapper-table">
              <CustomerTable
                history={props.history}
                role={props.role}
                tableData={tableData}
                myAccount={myAccount}
                getRowData={setNewRowData}
                data={rowData}
                filterData={filterData}
              />
            </div>
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={tableData.totalRow}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid>
      </LoadingIndicator>

      {(role === "Marketing" || role === "Sales") && (
        <div className="container-new-request-customer">
          <Button
            color="yellow"
            size="tiny"
            className="btn-p-new-request"
            onClick={OnrequestNewCustomer}
          >
            REQUEST NEW CUSTOMER
          </Button>
          <div className="btn-new-request" onClick={OnrequestNewCustomer}>
            <Icon
              name="user plus"
              style={{ fontSize: "1.4rem", margin: "0", padding: "0" }}
              circular
              inverted
              color="blue"
            />
          </div>
        </div>
      )}

      {openFilter && (
        <FilterCustomer
          setOpenFilter={setOpenFilter}
          openFilter={openFilter}
          rowData={rowData}
          getFilterData={setFilterData}
        />
      )}
    </Fragment>
  );
};

export default AllAccountsPage;
