import React from 'react';
import { Table } from 'semantic-ui-react';
import AcceptenceDocumentRow from './table-row/AcceptenceDocumentRow';

interface IProps {
  tableData: any;
}
const AcceptenceDocumentTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <Table color="blue" striped inverted>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell>Action</Table.HeaderCell>
          {/* <Table.HeaderCell>
            Document <br />
            ID
          </Table.HeaderCell> */}
          <Table.HeaderCell>
            Document <br />
            Name
          </Table.HeaderCell>
          <Table.HeaderCell>
            Document <br />
            Type
          </Table.HeaderCell>
          <Table.HeaderCell>
            Document <br />
            Description
          </Table.HeaderCell>
          <Table.HeaderCell>
            Upload <br />
            Date
          </Table.HeaderCell>
          <Table.HeaderCell>
            TOP <br />
            Number
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.tableData?.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={6} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {props.tableData.map((model: any, key) => {
          return <AcceptenceDocumentRow key={key} rowData={model} />;
        })}
      </Table.Body>
    </Table>
  );
};

export default AcceptenceDocumentTable;
