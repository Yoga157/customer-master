import React from 'react';
import { Table } from 'semantic-ui-react';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import styles from './DedicatedResourcesServiceTable.module.scss';
import { Dispatch } from 'redux';
import DedicatedResourcesTableRow from './table-row/DedicatedResourcesTableRow';
import IDedicatedResourceTable from 'selectors/dedicated-resources/models/IDedicatedResourceTable';
import IDedicatedResourceTableRow from 'selectors/dedicated-resources/models/IDedicatedResourceTableRow';
import * as DedicatedResourcesActions from 'stores/dedicated-resources/DedicatedResourcesActions';
import FilterRenewalContractModel from 'stores/dedicated-resources/models/FilterRenewalContractModel';

interface IProps {
  readonly tableData: IDedicatedResourceTable;
  columns: string;
  setColumns: any;
  direction: any;
  setDirection: any;
  activePage: number;
  pageSize: number;
}

const DedicatedResourcesServiceTable: React.FC<IProps> = ({ tableData, columns, setColumns, direction, setDirection, activePage, pageSize }) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state))

  const filter: FilterRenewalContractModel = useSelector((state: IStore) => state.dedicatedresources.listData.filter)
 
  const reloads = (columns: any) => {
    setColumns(columns);
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    dispatch(DedicatedResourcesActions.requestRenewalContract(currentUser.employeeID, activePage, pageSize, columns, direction === 'ascending' ? 'descending' : 'ascending', ''));
    if(filter !== null)
    {
      const filterNew = new FilterRenewalContractModel(filter);
      filterNew.pageSize = pageSize;
      filterNew.page = activePage;
      filterNew.column = columns;
      filterNew.sorting = direction;

      dispatch(DedicatedResourcesActions.RequestFilterRenewalContract(filterNew))
    }
  };

  return (
    <Table sortable striped className="StickyHeader" id="export-dedicated-resource" data-cols-width="10,30,20,40,40,60">
      <Table.Header className={styles.CreditBillingServiceTable}>
        <Table.Row>
          <>
            <Table.HeaderCell textAlign="left"></Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'EmployeeID' ? direction : null} onClick={() => reloads('EmployeeID')} textAlign="left">Empl<br />ID</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'EmployeeName' ? direction : null} onClick={() => reloads('EmployeeName')} textAlign="left">Empl Name</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'EmployeeDept' ? direction : null} onClick={() => reloads('EmployeeDept')} textAlign="left">Dept</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'SupervisorName' ? direction : null} onClick={() => reloads('SupervisorName')} textAlign="left">Supervisor</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'EmployeeClassName' ? direction : null} onClick={() => reloads('EmployeeClassName')} textAlign="left">Empl<br />Class</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'LastProjectName' ? direction : null} onClick={() => reloads('LastProjectName')} textAlign="left">Last Project</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'LastContractBeginDate' ? direction : null} onClick={() => reloads('LastContractBeginDate')} textAlign="left">Contract<br />Begin Date</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'LastContractEndDate' ? direction : null} onClick={() => reloads('LastContractEndDate')} textAlign="left">Contract<br />End Date</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'NewContractBeginDate' ? direction : null} onClick={() => reloads('NewContractBeginDate')} textAlign="left">New Contract<br />Begin Date</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'NewContractEndDate' ? direction : null} onClick={() => reloads('NewContractEndDate')} textAlign="left">New Contract<br />End Date</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'NewContractPeriod' ? direction : null} onClick={() => reloads('NewContractPeriod')} textAlign="left">Days</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'ContractNo' ? direction : null} onClick={() => reloads('ContractNo')} textAlign="left">Contract<br />No</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'statusApprovalSubmit' ? direction : null} onClick={() => reloads('statusApprovalSubmit')} textAlign="left">Approval Status</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'contractStatusName' ? direction : null} onClick={() => reloads('contractStatusName')} textAlign="left">Contract Renewal Status</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'ReturnDoc' ? direction : null} onClick={() => reloads('ReturnDoc')} textAlign="left">Return<br />Doc</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'SubmittedBy' ? direction : null} onClick={() => reloads('SubmittedBy')} textAlign="left">Submited<br />By</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'SubmittedDate' ? direction : null} onClick={() => reloads('SubmittedDate')} textAlign="left">Submited<br />Date</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'ContractAdmin' ? direction : null} onClick={() => reloads('ContractAdmin')} textAlign="left">Admin</Table.HeaderCell>
          </>
        </Table.Row>
      </Table.Header>
      <Table.Body>

        {
          tableData.rows && tableData.rows.map((model: IDedicatedResourceTableRow) => (
            <DedicatedResourcesTableRow rowData={model} />
          ))
        }
        {tableData?.rows?.length === 0 || tableData?.rows === undefined && (
          <Table.Row>
            <Table.Cell colSpan={16} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export default DedicatedResourcesServiceTable;
