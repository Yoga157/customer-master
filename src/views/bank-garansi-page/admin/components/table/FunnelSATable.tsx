import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';
import styles from './GeneratedTable.module.scss';
import FunnelTableRow from './table-row/FunnelSATableRow';
import IFunnelTable from 'selectors/funnel/models/IFunnelTable';
import IFunnelTableRow from 'selectors/funnel/models/IFunnelTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { useSelector, useDispatch } from 'react-redux';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { Dispatch } from 'redux';
import { selectFunnels } from 'selectors/funnel/FunnelSelector';

interface IProps {
  readonly tableData: any;
  readonly modals: string;
  readonly funnelGenID: number;
}

const FunnelSATable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [columns, setColumns] = useState('');
  const [direction, setDirection] = useState('ascending' as any);

  const reloads = (columns: any) => {
    setColumns(columns);
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    dispatch(FunnelActions.requestFunnel(currentUser.employeeID, currentUser.role, columns, direction, 'funnel', activePage, pageSize));
  };

  return (
    <Table sortable striped className="StickyHeader" id="exportopp" data-cols-width="10,10,10,30,30,30,40,40,15">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>No Funnel</Table.HeaderCell>
          <Table.HeaderCell>No SA</Table.HeaderCell>
          <Table.HeaderCell>SO Number</Table.HeaderCell>
          <Table.HeaderCell>Project Name</Table.HeaderCell>
          <Table.HeaderCell>Customer Name</Table.HeaderCell>
          <Table.HeaderCell>Sales Name</Table.HeaderCell>
          <Table.HeaderCell>SA Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.tableData.rows.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={8} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        ) : (
          props.tableData.rows.map((item: any, index: any) => (
            <FunnelTableRow funnelGenID={props.funnelGenID} modals={props.modals} key={index} rowData={item} />
          ))
        )}
      </Table.Body>
    </Table>
  );
};

export default FunnelSATable;
