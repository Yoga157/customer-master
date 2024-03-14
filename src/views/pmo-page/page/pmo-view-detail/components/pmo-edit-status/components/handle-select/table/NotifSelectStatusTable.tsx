import React from 'react';
import { Table } from 'semantic-ui-react';
import { IPMORequirements } from 'selectors/pmo/models/IPMORequirementCloseProject';

import NotifSelectStatusTableRow from './table-row/NotifSelectStatusTableRow';

interface IProps {
  tableData: IPMORequirements[];
}

const NotifSelectStatusTable: React.FC<IProps> = ({ tableData }) => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell>No</Table.HeaderCell>
          <Table.HeaderCell>Verification Item Requirement</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData?.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={3} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {tableData?.map((model: IPMORequirements, key) => {
          return <NotifSelectStatusTableRow key={key + 1} rowData={model} no={key + 1} />;
        })}
      </Table.Body>
    </Table>
  );
};

export default NotifSelectStatusTable;
