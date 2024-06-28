import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import styles from "./CustomerTable.module.scss";
import "./CustomerTableStyle.scss";
import CustomerTableRow from "./table-row/CustomerTableRow";
import { useDispatch } from "react-redux";
import * as CustomerActions from "stores/customer-setting/CustomerActivityActions";
import { Dispatch } from "redux";

interface IProps {
  readonly tableData: any;
  readonly history: any;
  readonly role: string;
  getRowData: (data: any) => void;
  data: any;
}

const CustomerTable: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [columns, setColumns] = useState("");
  const [direction, setDirection] = useState("ascending" as any);

  const reloads = (columns: any) => {
    setColumns(columns);
    setDirection(direction === "ascending" ? "descending" : "ascending");
    dispatch(
      CustomerActions.requestNoNameAcc(activePage, pageSize, columns, direction)
    );
  };

  return (
    <Table
      sortable
      striped
      id={
        window.location.pathname === "/data-quality/customer-setting-page"
          ? "exporttosetting"
          : "exportosett"
      }
      data-cols-width={
        window.location.pathname === "/data-quality/customer-setting-page"
          ? "20,10,10,20,40,30,30,15,15,15"
          : "20,20,40,30,30,15,15,15,15,15"
      }
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center"></Table.HeaderCell>

          <Table.HeaderCell>Status</Table.HeaderCell>

          <Table.HeaderCell
            sorted={columns === "JDECustId" ? direction : null}
            onClick={() => reloads("JDECustId")}
          >
            JDE Cust. ID
          </Table.HeaderCell>

          <Table.HeaderCell
            sorted={columns === "customerID" ? direction : null}
            onClick={() => reloads("customerID")}
          >
            Cust. ID
          </Table.HeaderCell>

          <Table.HeaderCell
            sorted={columns === "Industry Class" ? direction : null}
            onClick={() => reloads("Industry Class")}
          >
            Industry Class
          </Table.HeaderCell>

          <Table.HeaderCell
            sorted={columns === "CustomerName" ? direction : null}
            onClick={() => reloads("CustomerName")}
          >
            Customer Name
          </Table.HeaderCell>

          <Table.HeaderCell
            sorted={columns === "CustomerAddress" ? direction : null}
            onClick={() => reloads("CustomerAddress")}
          >
            Customer Address
          </Table.HeaderCell>

          <Table.HeaderCell
            textAlign="center"
            sorted={columns === "PMOCustomer" ? direction : null}
            onClick={() => reloads("PMOCustomer")}
          >
            PMO Cust.
          </Table.HeaderCell>

          <Table.HeaderCell
            textAlign="center"
            sorted={columns === "Blacklist" ? direction : null}
            onClick={() => reloads("Blacklist")}
          >
            Blacklist
          </Table.HeaderCell>

          <Table.HeaderCell
            textAlign="center"
            sorted={columns === "Holdshipment" ? direction : null}
            onClick={() => reloads("Holdshipment")}
          >
            Holdshipment
          </Table.HeaderCell>

          <Table.HeaderCell
            textAlign="center"
            sorted={columns === "Cap" ? direction : null}
            onClick={() => reloads("Cap")}
          >
            Cap
          </Table.HeaderCell>

          <Table.HeaderCell
            textAlign="center"
            sorted={columns === "StatusApproval" ? direction : null}
            onClick={() => reloads("StatusApproval")}
          >
            Status Aprroval
          </Table.HeaderCell>

          <Table.HeaderCell
            textAlign="center"
            sorted={columns === "CeatedBy" ? direction : null}
            onClick={() => reloads("CreatedBy")}
          >
            Create By
          </Table.HeaderCell>

          <Table.HeaderCell
            sorted={columns === "CreatedDate" ? direction : null}
            onClick={() => reloads("CreatedDate")}
          >
            Created Date
          </Table.HeaderCell>

          <Table.HeaderCell
            sorted={columns === "modifiedUserID" ? direction : null}
            onClick={() => reloads("modifiedUserID")}
          >
            Modified By
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "modifiedDate" ? direction : null}
            onClick={() => reloads("modifiedDate")}
          >
            Modified Date
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      {props.tableData.rows.length === 0 ? (
        <Table.Body>
          <Table.Row>
            <Table.Cell
              colSpan={16}
              textAlign="center"
              className={styles.nodata}
            >
              No data
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      ) : (
        props.tableData.rows.map((item) => (
          <CustomerTableRow
            history={props.history}
            role={props.role}
            key={item.customerID}
            rowData={item}
            getRowData={props.getRowData}
            data={props.data}
          />
        ))
      )}
    </Table>
  );
};

export default CustomerTable;
