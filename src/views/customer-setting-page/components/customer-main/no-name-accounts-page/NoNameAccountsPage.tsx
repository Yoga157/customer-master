import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Grid } from "semantic-ui-react";
import CustomerTable from "./components/nonamepage-main/table/CustomerTable";
import InputSearch from "./components/nonamepage-main/search/InputSearch";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import "./NoNameAccountsPage.scss";
import { format } from "date-fns";
import IStore from "models/IStore";
import * as CustomerActions from "stores/customer-setting/CustomerActivityActions";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { Pagination, Tooltips, Button } from "views/components/UI";
import TableToExcel from "@linways/table-to-excel";
import ModalSizeEnum from "constants/ModalSizeEnum";
import ClaimForm from "./components/nonamepage-main/modal/modal-claim/ModalClaim";
import { selectCustomerSetting } from "selectors/customer-setting/CustomerSettingSelector";
import FilterCustomer from "./components/nonamepage-main/filter/FilterCustomer";

interface IProps {
  history: any;
  role: string;
}

interface FilterData {
  pmo_customer: any;
  holdshipment: any;
  blacklist: any;
}

const NoNameAccountsPage: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize, setPage] = useState(10);
  const { role } = props;
  const activePage = useSelector(
    (state: IStore) => state.customerSetting.activePage
  );
  const [rowData, setRowData] = useState([]);
  const [filterData, setFilterData] = useState<FilterData | undefined>(
    undefined
  );
  const currDate: string = format(new Date(), "cccc LLLL d, yyyy");
  const setNewRowData = (data) => {
    setRowData(data);
  };

  const onClaimAccount = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ClaimForm
          rowData={rowData}
          getRowData={setRowData}
          filterData={filterData}
        />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch, rowData]);

  useEffect(() => {
    dispatch(
      CustomerActions.requestNoNameAcc(1, pageSize, "CustomerID", "ascending")
    );
    dispatch(CustomerActions.setActivePage(1));
  }, [dispatch]);

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
    TableToExcel.convert(tableClone, {
      name: "NoNameAccounts_" + currDate + ".xlsx",
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
        CustomerActions.requestSearchNoNameAcc(
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
            CustomerActions.requestNoNameAcc(
              1,
              pageSize,
              "CustomerID",
              search.value
            )
          );
        });
    } else {
      dispatch(
        CustomerActions.requestNoNameAcc(
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
            CustomerActions.requestNoNameAcc(
              1,
              pageSize,
              "CustomerID",
              "ascending"
            )
          );
        });
    }
  };

  const handlePaginationChange = (e: any, data: any) => {
    dispatch(CustomerActions.setActivePage(data.activePage));
    const search = document.querySelector(
      "#search-input-customer"
    )! as HTMLInputElement;

    // if (window.location.pathname === "/data-quality/customer-setting") {
    if (filterData != undefined) {
      dispatch(
        CustomerActions.requestSearchNoNameAcc(
          activePage,
          pageSize,
          "CustomerID",
          null,
          "ascending",
          filterData.pmo_customer,
          filterData.holdshipment,
          filterData.blacklist
        )
      );
    } else if (search.value.length > 0) {
      dispatch(
        CustomerActions.requestSearchNoNameAcc(
          data.activePage,
          pageSize,
          "CustomerID",
          search.value
        )
      );
    } else {
      dispatch(
        CustomerActions.requestNoNameAcc(
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
      CustomerActions.REQUEST_NO_NAME_SEARCH,
      CustomerActions.REQUEST_NO_NAME_ACCOUNTS,
    ])
  );

  const tableData = useSelector((state: IStore) =>
    selectCustomerSetting(state)
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
            color="yellow"
            size="big"
            disabled={false}
            onClick={() => setOpenFilter(!openFilter)}
          />
          <InputSearch />
        </div>

        <div className="fitur-container">
          <div className="center-fitur-container">
            <h2 className="h2-container">Customer List</h2>
          </div>
          <div className="posision-container">
            <Tooltips
              content="Claim Account"
              trigger={
                <Button
                  className="btn-claim"
                  color="yellow"
                  icon="check circle"
                  disabled={
                    rowData.length === 0 || role.toUpperCase() == "ADMIN"
                  }
                  size="mini"
                  content="Claim Account"
                  onClick={onClaimAccount}
                />
              }
            />
          </div>

          <div className="posision-container">
            <div className="posision-container">
              {rowData.length === 0 ? (
                <p></p>
              ) : (
                <p className="p-account">
                  {rowData.length} accounts has been pick.
                </p>
              )}
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

export default NoNameAccountsPage;
