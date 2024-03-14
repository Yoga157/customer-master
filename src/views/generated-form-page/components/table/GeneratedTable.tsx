import React, { Fragment, useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import styles from './GeneratedTable.module.scss';
import GeneratedTableRow from './table-row/GeneratedTableRow';
import IFunnelTable from 'selectors/funnel/models/IFunnelTable';
import IFunnelTableRow from 'selectors/funnel/models/IFunnelTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { useSelector, useDispatch } from 'react-redux';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { Dispatch } from 'redux';
import { selectFunnels } from 'selectors/funnel/FunnelSelector';
import ProductService from 'views/funnel-page/components/product-service/ProductService';

interface IProps {
  readonly tableData: any;
  readonly history: any;
}

const GeneratedTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
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

  const funnelTables: IFunnelTable = useSelector((state: IStore) => selectFunnels(state));

  return (
    <Table sortable striped id="exportopp" data-cols-width="10,10,10,30,30,30,40,40,15">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Form ID</Table.HeaderCell>
          <Table.HeaderCell>Form Type</Table.HeaderCell>
          <Table.HeaderCell>FunnelGen ID</Table.HeaderCell>
          <Table.HeaderCell>No. SA</Table.HeaderCell>
          <Table.HeaderCell>Project Name</Table.HeaderCell>
          <Table.HeaderCell>Customer Name</Table.HeaderCell>
          <Table.HeaderCell>Customer PIC</Table.HeaderCell>
          <Table.HeaderCell>Sales Name</Table.HeaderCell>
          <Table.HeaderCell>Engineer / PM Name</Table.HeaderCell>
          <Table.HeaderCell>Created By</Table.HeaderCell>
          <Table.HeaderCell>Created Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.tableData.totalRow === 0 && (
          <Table.Row>
            <Table.Cell colSpan={16} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {props.tableData.rows && props.tableData.rows.map((item, index) => <GeneratedTableRow key={index} history={props.history} rowData={item} />)}
      </Table.Body>
    </Table>
  );
};

export default GeneratedTable;
