import React, { Fragment, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import ActivityReportTableRow from './table-row/ActivityReportTableRow';
import IStore from 'models/IStore';

function ActivityReportTable({ tableData }) {
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, []));

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Table striped collapsing>
          {/* <Table striped fixed> */}
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width="1"></Table.HeaderCell>
              <Table.HeaderCell width="2">AR Number</Table.HeaderCell>
              <Table.HeaderCell width="3">Enginer Name</Table.HeaderCell>
              <Table.HeaderCell width="2">Activity Category</Table.HeaderCell>
              <Table.HeaderCell width="3">Status</Table.HeaderCell>
              <Table.HeaderCell width="2">Action Taken</Table.HeaderCell>
              <Table.HeaderCell width="2">Start Date</Table.HeaderCell>
              <Table.HeaderCell width="2">End Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tableData.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={8} textAlign="center">
                  No Data
                </Table.Cell>
              </Table.Row>
            )}
            {tableData.map((tableRow, i) => (
              <ActivityReportTableRow tableRow={tableRow} key={i} />
            ))}
          </Table.Body>
        </Table>
      </LoadingIndicator>
    </Fragment>
  );
}

export default ActivityReportTable;
