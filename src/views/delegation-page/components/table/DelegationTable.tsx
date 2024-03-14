import React from 'react';
import { Table } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import IObjListDelegation from 'selectors/delegation/models/IObjListDelegation';
import IListDelegation from 'selectors/delegation/models/IListDelegation';
import BrandModelTableRow from './table-row/DelegationTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import classes from './DelegationTable.module.scss';
import IStore from 'models/IStore';

interface IProps {
  readonly tableData: IListDelegation;
  readonly setActivePage: any;
}

const DelegationTable: React.FC<IProps> = ({ tableData, setActivePage }) => {
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  return (
    <Table striped className={classes.StickyHeader}>
      <Table.Header>
        <Table.Row>
          {tableData?.rows?.find((e) => e.fromUser === currentUser.employeeID)?.hasOwnProperty('fromUserStr') && (
            <Table.HeaderCell>Actions</Table.HeaderCell>
          )}

          <Table.HeaderCell>From User</Table.HeaderCell>
          <Table.HeaderCell>To User</Table.HeaderCell>
          <Table.HeaderCell>Application</Table.HeaderCell>
          <Table.HeaderCell>Efective Date</Table.HeaderCell>
          <Table.HeaderCell>Expire Date</Table.HeaderCell>
          <Table.HeaderCell>Remarks</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={4} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {tableData.rows.map((model: IObjListDelegation, key) => (
          <BrandModelTableRow key={key} rowData={model} setActivePage={setActivePage} tableData={tableData} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default DelegationTable;
