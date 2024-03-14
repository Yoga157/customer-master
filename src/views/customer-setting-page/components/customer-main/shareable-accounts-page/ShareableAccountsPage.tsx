import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Grid, Checkbox } from "semantic-ui-react";
import CustomerTable from "./components/shareablepage-main/table/CustomerTable";
import InputSearch from "./components/shareablepage-main/search/InputSearch";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import "./ShareableAccountsPage.scss";
import IStore from "models/IStore";
import { format } from "date-fns";
import * as CustomerActions from "stores/customer-setting/CustomerActivityActions";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { Pagination, Tooltips, Button } from "views/components/UI";
import TableToExcel from "@linways/table-to-excel";
import { selectShareableAccount } from "selectors/customer-setting/CustomerSettingSelector";
import ModalSizeEnum from "constants/ModalSizeEnum";
import FilterCustomer from "./components/shareablepage-main/filter/FilterCustomer";
import ModReleaseForm from "./components/shareablepage-main/form/modal-releases-edit/ModalRealesesEdit";

interface IProps {
  history: any;
  role: string;
}

interface FilterData {
  pmo_customer: any;
  newsalesAssign: any;
  holdshipment: any;
  blacklist: any;
}

const ShareableAccountsPage: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { role } = props;
  const [pageSize, setPage] = useState(10);
  const activePage = useSelector(
    (state: IStore) => state.customerSetting.activePage
  );
  const [filterData, setFilterData] = useState<FilterData | undefined>(
    undefined
  );
  const [rowData, setRowData] = useState([]);
  const [myAccount, setMyAccount] = useState(false);
  const currDate: string = format(new Date(), "cccc LLLL d, yyyy");

  const setNewRowData = (data) => {
    setRowData(data);
  };

  const onReleaseAccount = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModReleaseForm
          rowData={rowData}
          getRowData={setRowData}
          filterData={filterData}
          myAccount={myAccount}
        />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch, rowData]);

  const handleMyAccount = () => {
    const userId: any = localStorage.getItem("userLogin");

    if (myAccount == false) {
      setMyAccount(true);
      const salesID = JSON.parse(userId)?.employeeID;
      dispatch(
        CustomerActions.requestSearchShareabelAcc(
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
        CustomerActions.requestShareabledAcc(1, 10, "CustomerID", "ascending")
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
      name: "ShareableAccounts_" + currDate + ".xlsx",
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
        CustomerActions.requestSearchShareabelAcc(
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
            CustomerActions.requestShareabledAcc(
              1,
              pageSize,
              "CustomerID",
              search.value
            )
          );
        });
    } else {
      dispatch(
        CustomerActions.requestShareabledAcc(
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
            CustomerActions.requestShareabledAcc(
              1,
              pageSize,
              "CustomerID",
              "ascending"
            )
          );
        });
    }
  };

  useEffect(() => {
    dispatch(
      CustomerActions.requestShareabledAcc(
        1,
        pageSize,
        "CustomerID",
        "ascending"
      )
    );
    dispatch(CustomerActions.setActivePage(1));
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
          filterData.holdshipment
        )
      );
    } else if (myAccount) {
      const userId: any = localStorage.getItem("userLogin");
      const salesID = JSON.parse(userId)?.employeeID;
      dispatch(
        CustomerActions.requestSearchShareabelAcc(
          data.activePage,
          pageSize,
          "CustomerID",
          null,
          "ascending",
          salesID
        )
      );
    } else if (search.value.length > 0) {
      dispatch(
        CustomerActions.requestShareabledAcc(
          data.activePage,
          pageSize,
          "CustomerID",
          search.value
        )
      );
    } else {
      dispatch(
        CustomerActions.requestShareabledAcc(
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
      CustomerActions.REQUEST_SHAREABLE_ACCOUNTS,
      CustomerActions.REQUEST_SHAREABLE_SEARCH,
    ])
  );

  const tableData = useSelector((state: IStore) =>
    selectShareableAccount(state)
  );

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
            <Tooltips
              content="Shareable Accounts"
              trigger={
                <Button
                  className="btn-release"
                  icon="times circle"
                  disabled={rowData.length === 0}
                  size="mini"
                  content="Release Account"
                  onClick={onReleaseAccount}
                />
              }
            />
          </div>

          <div className="posision-container">
            {rowData.length === 0 ? (
              <p></p>
            ) : (
              <p className="p-account">
                {rowData.length} accounts has been pick.
              </p>
            )}
          </div>

          <div className="posision-container">
            <div className="myAccount-toggle" style={{}}>
              <div className="flex-center">
                <Checkbox
                  style={{ margin: "0.5rem", transform: "scale(0.9)" }}
                  toggle
                  checked={myAccount}
                  onChange={() => handleMyAccount()}
                ></Checkbox>
              </div>
              <p style={{ fontSize: "0.8rem", margin: "0.5rem" }}>My Account</p>
            </div>
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
                getRowData={setNewRowData}
                data={rowData}
                filterData={filterData}
                myAccount={myAccount}
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

      {openFilter && (
        <FilterCustomer
          setOpenFilter={setOpenFilter}
          openFilter={openFilter}
          rowData={rowData}
          getRowData={setRowData}
          getFilterData={setFilterData}
        />
      )}
    </Fragment>
  );
};

export default ShareableAccountsPage;
