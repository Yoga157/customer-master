import React, { Fragment, useState } from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import styles from './FunnelTable.module.scss';
import './FunnelTableStyle.scss';
import { Link } from 'react-router-dom';
import CustomerCreditTableRow from './table-row/CustomerCreditTableRow';

import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { useSelector, useDispatch } from 'react-redux';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { Dispatch } from 'redux';
import { selectFunnels } from 'selectors/funnel/FunnelSelector';
import FunnelFilter from 'stores/funnel/models/FunnelFilter';
import FunnelSearch from 'stores/funnel/models/FunnelSearch';
import IDashboardListSales from 'selectors/customer-credit-service/models/IDashboardSalesTable';
import IDashboardSalesTableRow from 'selectors/customer-credit-service/models/IDashboardSalesTableRow';

interface IProps {
  readonly tableData: IDashboardListSales;
  readonly type: string;
  readonly history: any;
}

const FunnelTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { type } = props;
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [columns, setColumns] = useState('');
  const [direction, setDirection] = useState('ascending' as any);
  const filter: FunnelFilter = useSelector((state: IStore) => state.funnel.data.filter);
  const search: FunnelSearch = useSelector((state: IStore) => state.funnel.data.search);

  return (
    <Table sortable striped className="StickyHeader" id="export" data-cols-width="10,30,20,40,40,60,10,10,15,20">
      <Table.Header>
        <Table.Row>
          {type === 'sales' && (
            <>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>Dept</Table.HeaderCell>
              <Table.HeaderCell>Sales Name</Table.HeaderCell>
              <Table.HeaderCell>Customer Credit Amount</Table.HeaderCell>
              <Table.HeaderCell>Actual Credit Used Amount</Table.HeaderCell>
              <Table.HeaderCell>Remaining Amount</Table.HeaderCell>{' '}
            </>
          )}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={16} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {type === 'sales' &&
          props.tableData.rows.map((model: IDashboardSalesTableRow, index: number) => (
            <CustomerCreditTableRow index={index} key={model.salesID} rowData={model} />
          ))}
      </Table.Body>
    </Table>
  );
};

export default FunnelTable;
