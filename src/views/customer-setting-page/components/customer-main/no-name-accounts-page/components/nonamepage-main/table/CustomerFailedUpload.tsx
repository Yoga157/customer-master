import React from "react";
import { Table } from "semantic-ui-react";
import FunnelFailedUploadRow from "./table-row/CustomerFailedUploadRow";

interface IProps {
  readonly tableRow: any[];
}
const FunnelFailedUpload: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Error Message</Table.HeaderCell>
          <Table.HeaderCell>Brand</Table.HeaderCell>
          <Table.HeaderCell>Customer Name</Table.HeaderCell>
          <Table.HeaderCell>Event Name</Table.HeaderCell>
          <Table.HeaderCell>Notes</Table.HeaderCell>
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
        {props.tableRow.map((model: any) => (
          <FunnelFailedUploadRow key={model.brand} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default FunnelFailedUpload;
