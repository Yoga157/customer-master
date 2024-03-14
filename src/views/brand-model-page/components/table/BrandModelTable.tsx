import React from 'react';
import { Table } from 'semantic-ui-react';
import IBrandModelTable from 'selectors/brand-model/models/IBrandModelTable';
import IBrandModelTableRow from 'selectors/brand-model/models/IBrandModelTableRow';
import BrandModelTableRow from './table-row/BrandModelTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector } from 'react-redux';
import IStore from 'models/IStore';

interface IProps {
  readonly tableData: IBrandModelTable;
}

const BrandModelTable: React.FC<IProps> = ({ tableData }) => {
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  //const BrandModelTable:React.FC<IProps> = () => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Actions</Table.HeaderCell>
          <Table.HeaderCell>Brand</Table.HeaderCell>
          <Table.HeaderCell>Sub Brand</Table.HeaderCell>
          <Table.HeaderCell>Model Name</Table.HeaderCell>
          <Table.HeaderCell>Product Manager</Table.HeaderCell>
          <Table.HeaderCell>Created By</Table.HeaderCell>
          <Table.HeaderCell>Created Date</Table.HeaderCell>
          <Table.HeaderCell>Effective Date</Table.HeaderCell>
          <Table.HeaderCell>Expired Date</Table.HeaderCell>
          <Table.HeaderCell>Last Modified By</Table.HeaderCell>
          <Table.HeaderCell>Last Modified Date</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={12} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.rows.map((model: IBrandModelTableRow) => (
          <BrandModelTableRow key={model.brandModelGenID} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default BrandModelTable;
