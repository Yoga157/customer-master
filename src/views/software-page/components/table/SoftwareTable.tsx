import React from 'react';
import { Table } from 'semantic-ui-react';
import ISoftwareTable from 'selectors/software/models/ISoftwareTable';
import ISoftwareTableRow from 'selectors/software/models/ISoftwareTableRow';
import SoftwareTableRow from './table-row/SoftwareTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector } from 'react-redux';
import IStore from 'models/IStore';

interface IProps {
  readonly tableData: ISoftwareTable;
}

const SoftwareTable: React.FC<IProps> = ({ tableData }) => {
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          {currentUser.role == 'Sales' ? null : <Table.HeaderCell></Table.HeaderCell>}
          <Table.HeaderCell>Software</Table.HeaderCell>
          <Table.HeaderCell>Sub Software</Table.HeaderCell>
          <Table.HeaderCell>Leaders</Table.HeaderCell>
          <Table.HeaderCell>Challengers</Table.HeaderCell>
          <Table.HeaderCell>Visionaires</Table.HeaderCell>
          <Table.HeaderCell>Niche Players</Table.HeaderCell>
          <Table.HeaderCell>Created By</Table.HeaderCell>
          <Table.HeaderCell>Created Date</Table.HeaderCell>
          <Table.HeaderCell>Last Modified By</Table.HeaderCell>
          <Table.HeaderCell>Last Modified Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={11} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.rows.map((model: ISoftwareTableRow) => (
          <SoftwareTableRow key={model.softwareID} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default SoftwareTable;
