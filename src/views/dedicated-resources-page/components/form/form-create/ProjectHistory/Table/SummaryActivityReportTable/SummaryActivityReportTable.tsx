import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import styles from './SummaryActivityReportTable.module.scss';
import { Dispatch } from 'redux';
import FilterAWSBillingModel from 'stores/aws-billing/models/FilterAWSBillingModel';
import SummaryActivityReportTableRow from './SummaryActivityReportTableRow/SummaryActivityReportTableRow';
import IGetActivityReportTable from 'selectors/dedicated-resources/models/IGetActivityReportTable';
import IGetActivityReportTableRow from 'selectors/dedicated-resources/models/IGetActivityReportTableRow';

interface IProps {
  readonly tableData: IGetActivityReportTable;
}

const SummaryActivityReportTable: React.FC<IProps> = ({ tableData }) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state))

  const [columns, setColumns] = useState('');
  const [direction, setDirection] = useState('ascending' as any);

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
            <Table.HeaderCell sorted={columns === 'SO' ? direction : null} onClick={() => reloads('SO')} textAlign="left">SO</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'CustomerName' ? direction : null} onClick={() => reloads('CustomerName')} textAlign="left">Customer Name</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'ProjectName' ? direction : null} onClick={() => reloads('ProjectName')} textAlign="left">Project Name</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'ActivityWithInProgressStatus' ? direction : null} onClick={() => reloads('ActivityWithInProgressStatus')} textAlign="left">Activity With<br />In Progress Status</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'ActivityWithPendingStatus' ? direction : null} onClick={() => reloads('ActivityWithPendingStatus')} textAlign="left">Activity With<br />Pending State</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'ActivityWithCloseStatus' ? direction : null} onClick={() => reloads('ActivityWithCloseStatus')} textAlign="left">Activity With<br />Closed State</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'TotalActivities' ? direction : null} onClick={() => reloads('TotalActivities')} textAlign="left">Total<br />Activities</Table.HeaderCell>
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


        {tableData?.rows && tableData?.rows?.map((model: IGetActivityReportTableRow) => (
          <SummaryActivityReportTableRow
            rowData={model}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

export default SummaryActivityReportTable;
