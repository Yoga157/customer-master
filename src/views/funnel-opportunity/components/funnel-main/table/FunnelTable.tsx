import React, { Fragment, useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import styles from './FunnelTable.module.scss';
import './FunnelTableStyle.scss';
import FunnelTableRow from './table-row/FunnelTableRow';
import IFunnelTable from 'selectors/funnel/models/IFunnelTable';
import IFunnelTableRow from 'selectors/funnel/models/IFunnelTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { useSelector, useDispatch } from 'react-redux';
import * as FunnelActions from 'stores/funnel-opportunity/FunnelActivityActions';
import { Dispatch } from 'redux';
import { selectFunnels } from 'selectors/funnel/FunnelSelector';
import ProductService from 'views/funnel-page/components/product-service/ProductService';
import FunnelOpportunityModel from 'stores/funnel-opportunity/models/FunnelOpportunityModel';

interface IProps {
  readonly tableData: any;
  readonly history: any;
}

const FunnelTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [columns, setColumns] = useState('');
  const [direction, setDirection] = useState('ascending' as any);
  //const search: FunnelOpportunityModel = useSelector((state: IStore) => state.funnel.data);

  const reloads = (columns: any) => {
    setColumns(columns);
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    dispatch(FunnelActions.requestFunnelOpp(activePage, pageSize, columns, direction));
  };

  const funnelTables: IFunnelTable = useSelector((state: IStore) => selectFunnels(state));

  return (
    <Table
      sortable
      striped
      id={window.location.pathname === '/data-quality/funnel-opportunity' ? 'exportopportunity' : 'exportopp'}
      data-cols-width={
        window.location.pathname === '/data-quality/funnel-opportunity' ? '10,10,10,20,40,30,30,15,15,15' : '10,20,40,30,30,15,15,15,15,15'
      }
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center"></Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'FunnelOpportunityID' ? direction : null} onClick={() => reloads('FunnelOpportunityID')}>
            Opp ID
          </Table.HeaderCell>
          {/*{window.location.pathname !== '/data-quality/funnel-opportunity' ? null : <Table.HeaderCell>Status</Table.HeaderCell>}
          {window.location.pathname !== '/data-quality/funnel-opportunity' ? null : <Table.HeaderCell>Funnel ID</Table.HeaderCell>}*/}
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Funnel ID</Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'EventName' ? direction : null} onClick={() => reloads('EventName')}>
            Event Name
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'VustomerName' ? direction : null} onClick={() => reloads('CustomerName')}>
            Customer Name
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'Brand' ? direction : null} onClick={() => reloads('Brand')}>
            Brand
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'Direktorat' ? direction : null} onClick={() => reloads('Direktorat')}>
            Direktorat
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'SalesName' ? direction : null} onClick={() => reloads('SalesName')}>
            Sales Name
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'AgingDays' ? direction : null} onClick={() => reloads('AgingDays')}>
            Aging Days
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'EventDate' ? direction : null} onClick={() => reloads('EventDate')}>
            Event Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'CreateUserID' ? direction : null} onClick={() => reloads('CreateUserID')}>
            Created By
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'createDate' ? direction : null} onClick={() => reloads('CreateDate')}>
            Created Date
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      {props.tableData.rows.length === 0 ? (
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={16} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      ) : (
        props.tableData.rows.map((item) => <FunnelTableRow history={props.history} key={item.funnelOpportunityID} rowData={item} />)
      )}
    </Table>
  );
};

export default FunnelTable;
