import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import CreditBillingTableRow from './table-row/CreditBillingTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import styles from './CreditBillingServiceTable.module.scss';
import { Dispatch } from 'redux';
import IAWSBillingTable from 'selectors/aws-billing/models/IAWSBillingTable';
import IAWSBillingTableRow from 'selectors/aws-billing/models/IAWSBillingTableRow';
import FilterAWSBillingModel from 'stores/aws-billing/models/FilterAWSBillingModel';
import * as AWSBillingActions from 'stores/aws-billing/AWSBillingActions';

interface IProps {
  readonly tableData: IAWSBillingTable;
  tabItem: string;
  columns: any;
  setColumns: any;
  direction: any;
  setDirection: any;
  page: number;
  pageSize: number;
}

const CreditBillingServiceTable: React.FC<IProps> = ({ tableData, tabItem, columns, setColumns, direction, setDirection, page, pageSize }) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state))

  // const [pageSize] = useState(15);
  // const [page, setActivePage] = useState(1);
  useEffect(() => {

  },[direction])
  
  const filter: FilterAWSBillingModel = useSelector((state: IStore) => state.awsBilling.listData.filter)

  const reloads = (columnss: any) => {
    setColumns(columnss);
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    dispatch(AWSBillingActions.requestAWSBillings(currentUser.employeeID,'',direction === 'ascending' ? 'descending' : 'ascending',columnss,page,pageSize));
    if(filter !== null)
    {
      const filterNew = new FilterAWSBillingModel(filter);
      filterNew.pageSize = pageSize;
      filterNew.page = page;
      filterNew.column = columnss;
      filterNew.sorting = direction;

      dispatch(AWSBillingActions.RequestFilterAWSBilling(filterNew))
    }
  };
  return (
    <Table sortable striped className="StickyHeader" id="export-aws-billing" data-cols-width="15,20,15,15,25,30,15,10,15,15,10,15,15,25,25,25">
      <Table.Header className={styles.CreditBillingServiceTable}>
        <Table.Row>
            <>
              <Table.HeaderCell textAlign="left"></Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'billingStatus' ? direction : null} onClick={() => reloads('billingStatus')} textAlign="left">Status</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'billingPeriod' ? direction : null} onClick={() => reloads('billingPeriod')} textAlign="left">Billing Period</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'accountId' ? direction : null} onClick={() => reloads('accountId')} textAlign="left">Account Id</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'so' ? direction : null} onClick={() => reloads('so')} textAlign="left">SO</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'picName' ? direction : null} onClick={() => reloads('picName')} textAlign="left">PIC Name</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'picNameDept' ? direction : null} onClick={() => reloads('picNameDept')} textAlign="left">Dept</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'customerName' ? direction : null} onClick={() => reloads('customerName')} textAlign="left">Customer Name</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'totalBillingUsd' ? direction : null} onClick={() => reloads('totalBillingUsd')} textAlign="left">Total Billing (USD)</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'rate' ? direction : null} onClick={() => reloads('rate')} textAlign="left">Rate</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'totalBillingUsd' ? direction : null} onClick={() => reloads('totalBillingIdr')} textAlign="left">Total Billing (IDR)</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'usageAmount' ? direction : null} onClick={() => reloads('usageAmount')} textAlign="left">Usage Amount</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'credit' ? direction : null} onClick={() => reloads('credit')} textAlign="left">Credit</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'discountUsage' ? direction : null} onClick={() => reloads('discountUsage')} textAlign="left">Discount Usage</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'sppDiscount' ? direction : null} onClick={() => reloads('sppDiscount')} textAlign="left">SPP Discount</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'invoiceNo' ? direction : null} onClick={() => reloads('invoiceNo')} textAlign="left">Invoice No</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'fee' ? direction : null} onClick={() => reloads('fee')} textAlign="left">Fee</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'riFee' ? direction : null} onClick={() => reloads('riFee')} textAlign="left">RI Fee</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'tax' ? direction : null} onClick={() => reloads('tax')} textAlign="left">Tax</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'savingPlanAmount' ? direction : null} onClick={() => reloads('savingPlanAmount')} textAlign="left">Saving Plan Amount</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'savingPlanNego' ? direction : null} onClick={() => reloads('savingPlanNego')} textAlign="left">Saving Plan Nego</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'savingPlanFee' ? direction : null} onClick={() => reloads('savingPlanFee')} textAlign="left">Saving Plan Fee</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'mpa' ? direction : null} onClick={() => reloads('mpa')} textAlign="left">Notes MPA</Table.HeaderCell>
              <Table.HeaderCell sorted={columns === 'flag' ? direction : null} onClick={() => reloads('flag')} textAlign="left">Flag Transfer</Table.HeaderCell>
            </>
        </Table.Row>
      </Table.Header>
      <Table.Body>

        {tableData.rows && tableData.rows.length === 0 || tableData.rows === undefined ? (
          <Table.Row>
            <Table.Cell colSpan={11} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        ) : null}
        {tableData.rows && tableData.rows.map((model: IAWSBillingTableRow) => (
          <CreditBillingTableRow 
            rowData={model} 
          />
        ))}

      </Table.Body>
    </Table>
  );
};

export default CreditBillingServiceTable;
