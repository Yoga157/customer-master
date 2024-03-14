import React from 'react';
import IVerificationFunnelTable from 'selectors/verification-funnel/models/IVerificationFunnelTable';
import IVerificationFunnelTableRow from 'selectors/verification-funnel/models/IVerificationFunnelTableRow';
import { Table } from 'semantic-ui-react';
import VerificationTableRow from './table-row/VerificationTableRow';

interface IProps {
  readonly tableData: IVerificationFunnelTable;
}

const VerificationTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row textAlign="left">
          <Table.HeaderCell>No</Table.HeaderCell>
          <Table.HeaderCell>Verification Check Item</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={4} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {props.tableData.rows.map((model: IVerificationFunnelTableRow) => (
          <VerificationTableRow key={model.no} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default VerificationTable;
