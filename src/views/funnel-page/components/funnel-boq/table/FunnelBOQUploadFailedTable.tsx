import React from 'react';
import IBoqFailedTableRow from 'selectors/boq/models/IBoqFailedTableRow';
import { Table } from 'semantic-ui-react';
import FunnelBOQUploadFailedTableRow from './table-row/FunnelBOQUploadFailedTableRow';

interface IProps {
  readonly tableRow: IBoqFailedTableRow[];
}
const FunnelBOQUploadFailedTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Error Message</Table.HeaderCell>
          <Table.HeaderCell>ProductNumber</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Warranty</Table.HeaderCell>
          <Table.HeaderCell>WarrantyDurationType</Table.HeaderCell>
          <Table.HeaderCell>Qty</Table.HeaderCell>
          <Table.HeaderCell>Brand</Table.HeaderCell>
          <Table.HeaderCell>SubBrand</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.tableRow.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={4} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {props.tableRow.map((model: IBoqFailedTableRow) => (
          <FunnelBOQUploadFailedTableRow key={model.productNumber} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default FunnelBOQUploadFailedTable;
