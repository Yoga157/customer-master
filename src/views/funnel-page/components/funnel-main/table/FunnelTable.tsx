import React, { Fragment, useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import styles from "./FunnelTable.module.scss";
import "./FunnelTableStyle.scss";
import FunnelTableRow from "./table-row/FunnelTableRow";
import IFunnelTable from "selectors/funnel/models/IFunnelTable";
import IFunnelTableRow from "selectors/funnel/models/IFunnelTableRow";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import IStore from "models/IStore";
import { useSelector, useDispatch } from "react-redux";
import * as FunnelActions from "stores/funnel/FunnelActions";
import { Dispatch } from "redux";
import { selectFunnels } from "selectors/funnel/FunnelSelector";
import FunnelFilter from "stores/funnel/models/FunnelFilter";
import FunnelSearch from "stores/funnel/models/FunnelSearch";
import { selectPresalesViewResult } from "selectors/presales-view/PresalesViewSelector";
import * as PresalesViewAction from "stores/presales-view/PresalesViewAction";
interface IProps {
  readonly tableData: IFunnelTable;
  tabItem: string;
}

const FunnelTable: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { tabItem } = props;
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [columns, setColumns] = useState("");
  const [direction, setDirection] = useState("ascending" as any);
  const isExportExl = useSelector((state: IStore) => state.funnel.isExportExl);
  const filter: FunnelFilter = useSelector(
    (state: IStore) => state.funnel.data.filter
  );
  const search: FunnelSearch = useSelector(
    (state: IStore) => state.funnel.data.search
  );
  const confColumns = useSelector((state: IStore) => state.funnel.columns);

  const reloads = (columns: any) => {
    setColumns(columns);
    setDirection(direction === "ascending" ? "descending" : "ascending");
    //dispatch(FunnelActions.requestFunnel(currentUser.employeeID, currentUser.role,columns,direction,activePage,pageSize));
    if (search !== null) {
      if (tabItem === "funnel") {
        dispatch(
          FunnelActions.requestSearchFunnel(
            currentUser.employeeID,
            search.text,
            activePage,
            pageSize,
            "funnel",
            columns,
            direction
          )
        );
      } else {
        dispatch(
          FunnelActions.requestSearchSA(
            currentUser.employeeID,
            search.text,
            activePage,
            pageSize,
            columns,
            direction
          )
        );
      }
    } else if (filter !== null) {
      const filterNew = new FunnelFilter(filter);
      filterNew.pageSize = pageSize;
      filterNew.page = activePage;
      filterNew.column = columns;
      filterNew.sorting = direction;
      filterNew.type = tabItem === "funnel" ? "funnel" : "sa";

      if (tabItem === "funnel") {
        dispatch(FunnelActions.postFunnelFilter(filterNew));
      } else {
        dispatch(FunnelActions.postSAFilter(filterNew));
      }
    } else {
      if (tabItem === "funnel") {
        dispatch(
          FunnelActions.requestFunnel(
            currentUser.employeeID,
            currentUser.role,
            columns,
            direction,
            "funnel",
            activePage,
            pageSize
          )
        );
      } else {
        dispatch(
          FunnelActions.requestSA(
            currentUser.employeeID,
            currentUser.role,
            columns,
            direction,
            activePage,
            pageSize
          )
        );
      }
    }
  };

  const funnelTables: IFunnelTable = useSelector((state: IStore) =>
    selectFunnels(state)
  );
  
  const presalesView = useSelector((state: IStore) => selectPresalesViewResult(state));
  const presalesViewPrivilage = presalesView?.findIndex((p: any)=>p?.text1 === currentUser?.userName)
  useEffect(()=>{
    dispatch(PresalesViewAction.getPresalesView());
  }, [])
  let colWidthFunnel, colWidthSA: string;
  if (
    currentUser.role === "Sales" ||
    currentUser.role === "Sales Admin" ||
    presalesViewPrivilage > -1 ||
    currentUser.role === "SuperAdmin"
  ) {
    colWidthFunnel = "10,30,20,40,60,15,10,10,15,15,20";
    colWidthSA = "10,30,20,40,60,15,15,15,10,10,15,15,30,30";
  } else if (currentUser.role === "Admin") {
    colWidthFunnel = "10,30,20,40,60,15,15,20";
    colWidthSA = "10,30,20,40,60,15,15,15,10,15,15,30,30";
  } else if (currentUser.role === "PMO" || currentUser.role === "PMOS") {
    colWidthFunnel = "10,30,20,40,60,15,15,20";
    colWidthSA = "10,30,20,40,60,15,15,15,10,15,15,30,30";
  } else {
    colWidthFunnel = "10,30,20,40,60,15,10,15,15,20";
    colWidthSA = "10,30,20,40,60,15,15,15,10,15,15,30,30";
  }

  return (
    <Table
      sortable
      striped
      id={tabItem === "funnel" ? "export-funnel" : "export-sa"}
      data-cols-width={tabItem === "funnel" ? colWidthFunnel : colWidthSA}
      className="font-size-1"
    >
      {" "}
      <Table.Header>
        <Table.Row>
          {!isExportExl && <Table.HeaderCell></Table.HeaderCell>}

          <Table.HeaderCell
            sorted={columns === "funnelGenID" ? direction : null}
            onClick={() => reloads("funnelGenID")}
          >
            Funnel <br />
            ID
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "salesName" ? direction : null}
            onClick={() => reloads("salesName")}
            width={2}
          >
            Sales Name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "dept" ? direction : null}
            onClick={() => reloads("dept")}
          >
            Department
          </Table.HeaderCell>
          {(currentUser.role === "Presales" ||
            currentUser.role === "Product Manager") && (
            <Fragment>
              <Table.HeaderCell>{currentUser.role}</Table.HeaderCell>
            </Fragment>
          )}
          {tabItem === "salesAnalysis" && (
            <>
              <Table.HeaderCell
                sorted={columns === "soParent" ? direction : null}
                onClick={() => reloads("soParent")}
              >
                SO
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={columns === "soidc" ? direction : null}
                onClick={() => reloads("soidc")}
              >
                SO <br />
                IDC
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={columns === "saNumber" ? direction : null}
                onClick={() => reloads("saNumber")}
              >
                Sa <br />
                Number
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={columns === "saDate" ? direction : null}
                onClick={() => reloads("saDate")}
              >
                Sa <br />
                Date
              </Table.HeaderCell>
            </>
          )}
          <Table.HeaderCell
            sorted={columns === "customerName" ? direction : null}
            onClick={() => reloads("customerName")}
          >
            Customer <br />
            Name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "projectName" ? direction : null}
            onClick={() => reloads("projectName")}
          >
            Project Name
          </Table.HeaderCell>
          {(currentUser.role === "Sales" || 
            presalesViewPrivilage > -1 ||
            currentUser.role === "Sales Admin") && (
            <Fragment>
              <Table.HeaderCell
                sorted={columns === "totalOrderingItem" ? direction : null}
                onClick={() => reloads("totalOrderingItem")}
              >
                Total <br />
                Ordering
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={columns === "totalSellingPrice" ? direction : null}
                onClick={() => reloads("totalSellingPrice")}
              >
                Total <br />
                Selling
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={columns === "currency" ? direction : null}
                onClick={() => reloads("currency")}
              >
                Currency
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={columns === "rate" ? direction : null}
                onClick={() => reloads("rate")}
              >
                Rate
              </Table.HeaderCell>
              <Table.HeaderCell
                width={1}
                sorted={columns === "gpmPctg" ? direction : null}
                onClick={() => reloads("gpmPctg")}
              >
                %
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={columns === "gpmAmount" ? direction : null}
                onClick={() => reloads("gpmAmount")}
              >
                GPM <br />
                Amount
              </Table.HeaderCell>
            </Fragment>
          )}
          {(currentUser.role === "Presales" ||
            currentUser.role === "Product Manager") && (
            <Fragment>
              <Table.HeaderCell
                sorted={columns === "totalOrderingItem" ? direction : null}
                onClick={() => reloads("totalOrderingItem")}
              >
                Total <br />
                Ordering
              </Table.HeaderCell>
            </Fragment>
          )}
          <Table.HeaderCell
            sorted={columns === "dealCloseDate" ? direction : null}
            onClick={() => reloads("dealCloseDate")}
          >
            Deal Close <br />
            Date
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "createDate" ? direction : null}
            onClick={() => reloads("createDate")}
          >
            Created <br />
            Date
          </Table.HeaderCell>

          {tabItem === "funnel" && (
            <Table.HeaderCell
              sorted={columns === "funnelStatus" ? direction : null}
              onClick={() => reloads("funnelStatus")}
              width={2}
            >
              Status
            </Table.HeaderCell>
          )}

          {tabItem === "salesAnalysis" && (
            <>
              <Table.HeaderCell
                sorted={
                  columns === "commercialWorkflowStatus" ? direction : null
                }
                onClick={() => reloads("commercialWorkflowStatus")}
              >
                Commercial <br />
                Approval <br />
                Status
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={columns === "serviceWorkflowStatus" ? direction : null}
                onClick={() => reloads("serviceWorkflowStatus")}
              >
                Service <br />
                Approval <br />
                Status
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={columns === "reopenProjectStatusApproval" ? direction : null}
                onClick={() => reloads("reopenProjectStatusApproval")}
              >
                ReOpen <br />
                Project <br />
                Approval
              </Table.HeaderCell>
            </>
          )}
          {confColumns.flagManual && (
            <Table.HeaderCell
              sorted={columns === "flagManual" ? direction : null}
              onClick={() => reloads("flagManual")}
            >
              SA <br />
              Manual
            </Table.HeaderCell>
          )}

          {tabItem === "funnel" && (
            <>
              {confColumns.lastNotesActivityThisWeek && (
                <Table.HeaderCell>
                  Last Activity <br />
                  This Week
                </Table.HeaderCell>
              )}
              {confColumns.lastNotesActivityPrevWeek && (
                <Table.HeaderCell>
                  Last Activity <br />
                  Prev Week
                </Table.HeaderCell>
              )}
            </>
          )}
          {isExportExl && <Table.HeaderCell>Last Activity</Table.HeaderCell>}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell
              colSpan={16}
              textAlign="center"
              className={styles.nodata}
            >
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {funnelTables.rows.map((model: IFunnelTableRow, key) => (
          <FunnelTableRow key={key} presalesViewPrivilage={presalesViewPrivilage} rowData={model} tabItem={tabItem} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default FunnelTable;
