import React from 'react';
import { Table } from 'semantic-ui-react';
import ISoftwareToolTable from 'selectors/software/models/ISoftwareToolTable';
import ISoftwareToolTableRow from 'selectors/software/models/ISoftwareToolTableRow';
import SoftwareToolTableRow from './table-row/SoftwareToolTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector } from 'react-redux';
import IStore from 'models/IStore';

interface IProps {
  readonly id: number;
  readonly tableData: ISoftwareToolTable;
}

const SoftwareToolTable: React.FC<IProps> = ({ tableData, id }) => {
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.HeaderCell>Software Tools Type</Table.HeaderCell>
          <Table.HeaderCell>Software Tools Name</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={3} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.rows.map((model: ISoftwareToolTableRow) => (
          <SoftwareToolTableRow key={model.softwareToolID} rowData={model} id={id} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default SoftwareToolTable;
