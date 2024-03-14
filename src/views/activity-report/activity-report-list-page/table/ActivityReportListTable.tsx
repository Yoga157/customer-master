import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import styles from './ActivityReportListTable.module.scss';
import ActivityReportListTableRow from "./table-row/ActivityReportListTableRow";
interface IProps {
  // readonly tableData: IListActivityReport;
}

const ActivityReportListTable: React.FC<IProps> = ({}) => {
  return (
    <Table sortable striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          {/* sorted={column === 'activityReportGenID' ? direction : null} onClick={() => reloads('activityReportGenID')} */}
          <Table.HeaderCell textAlign="center">Funnel ID</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">
            AR ID
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="center">
            Ticket/Task Number
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="center">
            SO <br /> Number
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Customer <br/> Name</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">
           Address
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Contact <br/>Name</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Engineer/Team</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">
           Status
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="center">
            Start <br /> Date
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="center">
            Finish <br /> Date
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="center">
            Superior <br /> Review <br /> Status
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="center">
            Customer <br /> Sign <br /> Status
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Dept</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">IsDraft</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {/* {tableData.totalRow === 0 && ( */}
        {/* <Table.Row>
          <Table.Cell colSpan={13} textAlign="center" className={styles.nodata}>
            No data
          </Table.Cell>
        </Table.Row> */}
        {/* )} */}

        {/* {tableData.rows && tableData.rows.map((model: IActivityReportTableRow) => (
                    <ActivityReportTableRow key={model.activityReportGenID} rowData={model} setActivePage={setActivePage} />
                ))} */}
          <ActivityReportListTableRow />
      </Table.Body>
    </Table>
  );
};

export default ActivityReportListTable;
