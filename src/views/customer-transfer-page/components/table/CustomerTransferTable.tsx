import React from 'react';
import { Table } from 'semantic-ui-react';
import { ICustomerTransferTable } from 'selectors/customer-transfer/models/ICustomerTransferTable';
import { ICustomerTransferTableRow } from 'selectors/customer-transfer/models/ICustomerTransferTableRow';
import CustomerTransferTableRow from './table-row/CustomerTransferTableRow';

interface IProps {
  readonly tableData: ICustomerTransferTable;
  readonly funnelCustomer: any;
}

const CustomerTransferTable: React.FC<IProps> = ({ tableData, funnelCustomer }) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Funnel ID</Table.HeaderCell>
          <Table.HeaderCell>Customer Name</Table.HeaderCell>
          <Table.HeaderCell>Project Name</Table.HeaderCell>
          <Table.HeaderCell>Total Selling</Table.HeaderCell>
          <Table.HeaderCell>GPM Amount</Table.HeaderCell>
          <Table.HeaderCell>Deal Close Date</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {funnelCustomer.map((data: any) =>
          tableData.rows
            .filter((item) => item.customerGenID === data)
            .map((model: ICustomerTransferTableRow) => <CustomerTransferTableRow key={model.id} rowData={model} />)
        )}
      </Table.Body>
    </Table>
  );
};

export default CustomerTransferTable;
