import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';
// import CreditBillingTableRow from './table-row/CreditBillingTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import styles from './TerminateTable.module.scss';
import { Dispatch } from 'redux';
import FilterAWSBillingModel from 'stores/aws-billing/models/FilterAWSBillingModel';
// import DedicatedResourcesTableRow from './table-row/DedicatedResourcesTableRow';

interface IProps {
//   readonly tableData: IAWSBillingTable;
    readonly tableData?: any;
//   tabItem: string;
}

const TerminateTable: React.FC<IProps> = ({ tableData }) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state))

  const [pageSize] = useState(15);
  const [activePage, setActivePage] = useState(1);
  const [columns, setColumns] = useState('');
  const [direction, setDirection] = useState('ascending' as any);
  const filter: FilterAWSBillingModel = useSelector((state: IStore) => state.awsBilling.listData.filter)
    
  const reloads = (columns: any) => {
    // setColumns(columns);
    // setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    // dispatch(AWSBillingActions.requestAWSBillings(currentUser.employeeID,'',direction,columns,activePage,pageSize));
    // if(filter !== null)
    // {
    //   const filterNew = new FilterAWSBillingModel(filter);
    //   filterNew.pageSize = pageSize;
    //   filterNew.page = activePage;
    //   filterNew.column = columns;
    //   filterNew.sorting = direction;

    //   dispatch(AWSBillingActions.RequestFilterAWSBilling(filterNew))
    // }
  };
  return (
    <Table sortable striped className="StickyHeader" id="export" data-cols-width="10,30,20,40,40,60">
      <Table.Header className={styles.CreditBillingServiceTable}>
        <Table.Row>
            <>
              <Table.HeaderCell sorted={columns === 'billingStatus' ? direction : null} onClick={() => reloads('billingStatus')} textAlign="left">Empl ID</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'billingPeriod' ? direction : null} onClick={() => reloads('billingPeriod')} textAlign="left">Empl Name</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'accountId' ? direction : null} onClick={() => reloads('accountId')} textAlign="left">Dept</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'picName' ? direction : null} onClick={() => reloads('picName')} textAlign="left">Employee Class</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'customerName' ? direction : null} onClick={() => reloads('customerName')} textAlign="left">Supervisor</Table.HeaderCell>
            </>
        </Table.Row>
      </Table.Header>
      <Table.Body>

        {tableData?.rows && tableData.rows.length === 0 || tableData?.rows === undefined ? (
          <Table.Row>
            <Table.Cell colSpan={11} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        ) : null}
        {/* {tableData.rows && tableData.rows.map((model: IAWSBillingTableRow) => (
          <CreditBillingTableRow 
            rowData={model} 
          />
        ))} */}
        {/* {
            tableData.map((row) => (
                <DedicatedResourcesTableRow rowData={row} />
            ))
        } */}
      </Table.Body>
    </Table>
  );
};

export default TerminateTable;
