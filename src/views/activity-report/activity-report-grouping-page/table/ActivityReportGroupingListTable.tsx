import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import styles from "./ActivityReportGroupingListTable.module.scss";
import ActivityReportGroupingListTableRow from "./table-row/ActivityReportGroupingListTableRow";
import IActivityReportGroupingTable from "selectors/activity-report-grouping/models/ActivityReportGrouping/IActivityReportGroupingTable";
import IActivityReportGroupingTableRow from "selectors/activity-report-grouping/models/ActivityReportGrouping/IActivityReportGroupingTableRow";
interface IProps {
  readonly tableData: IActivityReportGroupingTable;
}

const ActivityReportGroupingListTable: React.FC<IProps> = ({ tableData }) => {
  return (
    <Table sortable striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          {/* sorted={column === 'activityReportGenID' ? direction : null} onClick={() => reloads('activityReportGenID')} */}
          <Table.HeaderCell textAlign="center">
            Group
            <br />
            ID
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="center">SO ID</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">AR In Group</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Customer Name</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Address</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Contact Name</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Create By</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Create Date</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">
            Customer
            <br />
            Sign Status
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.totalRows === 0 && (
          <Table.Row>
            <Table.Cell
              colSpan={13}
              textAlign="center"
              className={styles.nodata}
            >
              No data
            </Table.Cell>
          </Table.Row>
        )}
        
        {tableData.rows &&
          tableData.rows.map((model: IActivityReportGroupingTableRow, key) => (
            <ActivityReportGroupingListTableRow
              key={key}
              rowData={model}
            />
          ))}
      </Table.Body>
    </Table>
  );
};

export default ActivityReportGroupingListTable;
