import React from 'react';
import { Header, Table } from 'semantic-ui-react';
import { IHistoryTable } from 'selectors/customer-transfer/models/ICustomerTransferTable';
import { IHistoryTableRow } from 'selectors/customer-transfer/models/ICustomerTransferTableRow';
import HistoryTableRow from './table-row/HistoryTableRow';

interface IProps {
  readonly tableData: IHistoryTable;
}

const HistoryTable: React.FC<IProps> = ({ tableData }) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Customer Name</Table.HeaderCell>
          <Table.HeaderCell>Funnel ID</Table.HeaderCell>
          <Table.HeaderCell>From To</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.rows.map((model: IHistoryTableRow) => (
          <HistoryTableRow key={model.id} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default HistoryTable;
