import React from 'react';
import { Table } from 'semantic-ui-react';
import ConfigItemUploadFailedTableRow from './table-row/ConfigItemUploadFailedTableRow';

interface IProps {
  readonly tableRow: any[];
  isGenExcel: boolean;
}
const ConfigItemUploadFailedTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <Table striped id="upload-failed">
      <Table.Header>
        <Table.Row>
          {!props.isGenExcel && <Table.HeaderCell>Error Message</Table.HeaderCell>}
          <Table.HeaderCell>ConfigItemGenID</Table.HeaderCell>
          <Table.HeaderCell>ProjectId</Table.HeaderCell>
          <Table.HeaderCell>FunnelGenId</Table.HeaderCell>
          <Table.HeaderCell>PONumber</Table.HeaderCell>
          <Table.HeaderCell>DONumber</Table.HeaderCell>
          <Table.HeaderCell>DODate</Table.HeaderCell>
          <Table.HeaderCell>Brand</Table.HeaderCell>
          <Table.HeaderCell>ProductNumber</Table.HeaderCell>
          <Table.HeaderCell>ProductDescription</Table.HeaderCell>
          <Table.HeaderCell>SerialNumber</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.tableRow.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={11} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {props.tableRow.map((model: any, key) => (
          <ConfigItemUploadFailedTableRow key={key} rowData={model} isGenExcel={props.isGenExcel} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default ConfigItemUploadFailedTable;
