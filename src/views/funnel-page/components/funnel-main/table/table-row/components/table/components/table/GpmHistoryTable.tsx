import React from 'react';
import { Table } from 'semantic-ui-react';

import GpmHistoryTableRow from './table-row/GpmHistoryTableRow';
import './GpmHistoryTabel.scss';

interface IProps {
  tableData: any;
  from: string;
}

const GpmHistoryTable = ({ tableData, from }: IProps) => {
  return (
    <>
      <Table color="green" className="table-gpm-history" striped inverted>
        <Table.Header className={`header-black`}>
          <Table.Row textAlign="center">
            <Table.HeaderCell>Total Selling Product</Table.HeaderCell>
            <Table.HeaderCell>Total Cost Product</Table.HeaderCell>
            <Table.HeaderCell>Total Expend Product</Table.HeaderCell>
            <Table.HeaderCell>Gpm Product</Table.HeaderCell>

            <Table.HeaderCell>Total Selling Service</Table.HeaderCell>
            <Table.HeaderCell>Total Cost Service</Table.HeaderCell>
            <Table.HeaderCell>Total Expend Service</Table.HeaderCell>
            <Table.HeaderCell>Gpm Service</Table.HeaderCell>

            <Table.HeaderCell>Gpm Amount</Table.HeaderCell>
            <Table.HeaderCell>Gpm %</Table.HeaderCell>
            <Table.HeaderCell>Remark</Table.HeaderCell>
            <Table.HeaderCell>Create Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableData?.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={9} textAlign="center">
                No Data
              </Table.Cell>
            </Table.Row>
          )}

          {tableData.map((rowData: any, k) => (
            <GpmHistoryTableRow key={k} rowData={rowData} />
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default GpmHistoryTable;
