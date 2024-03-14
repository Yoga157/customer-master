import React from 'react';
import IPOCRequirementTable from 'selectors/funnel-poc-requirement/models/IPOCRequirementTabel';
import IPOCRequirementTableRow from 'selectors/funnel-poc-requirement/models/IPOCRequirementTableRow';
import { Table } from 'semantic-ui-react';
import POCRequirementTableRow from './table-row/POCRequirementTableRow';

interface IProps {
  readonly tableData: IPOCRequirementTable;
}
const POCRequirementTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Requirement Type</Table.HeaderCell>
          <Table.HeaderCell>Source Type</Table.HeaderCell>
          <Table.HeaderCell>Qty</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>PIC</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Last Update By</Table.HeaderCell>
          <Table.HeaderCell>Last Update Time</Table.HeaderCell>
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
        {props.tableData.rows.map((model: IPOCRequirementTableRow) => (
          <POCRequirementTableRow key={model.pocGenReqID} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default POCRequirementTable;
