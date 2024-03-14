import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import styles from './EmployeeBulkTable.module.scss';
import { Dispatch } from 'redux';
import EmployeeBulkTableRow from './table-row/EmployeeBulkTableRow';
import { CheckBox } from 'views/components/UI';

interface IProps {
  readonly tableData?: any;
  setDataEmployee: any;
  DeleteByID: any;
  isCheck: any;
  setIsCheck: any;
  setTempCheck: any;
  tempCheck: any;
}

const EmployeeBulkTable: React.FC<IProps> = ({ tableData, setDataEmployee,  DeleteByID, isCheck, setIsCheck, setTempCheck, tempCheck }) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const [isCheckAll, setIsCheckAll] = useState(false);
 
  
  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    const isSaveChange = tableData?.map((item) => {
     
      setIsCheck((oldArray) => [...oldArray, item.employeeID]);
      //TempCheck untuk Deduction,SalaryBenefit,OtherBenefit
      setTempCheck((oldArray) => [...oldArray, item]);
      if (isCheckAll) {
        setIsCheck([]);
        setTempCheck([]);
      }
    })
   
  };
  return (
    <Table sortable striped className="StickyHeader" id="export-main-cbv" data-cols-width="10,15,30,30,30,30,50,20,20,20,20">
      <Table.Header className={styles.CreditBillingServiceTable}>
        <Table.Row>
          <>
            <Table.HeaderCell textAlign="left"><CheckBox
                onChange={handleSelectAll}
                defaultChecked={isCheckAll}
              /></Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Empl ID</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Empl Name</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Dept</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Supervisor</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Empl<br />Class</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Last Project</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Contract<br />Begin Date</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Contract<br />End Date</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Days</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Contract<br />No</Table.HeaderCell>
          </>
        </Table.Row>
      </Table.Header>
      <Table.Body>

        {tableData?.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={11} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {tableData?.map((model: any) => (
          <EmployeeBulkTableRow
            DeleteByID={DeleteByID}
            rowData={model}
            isCheck={isCheck}
            setIsCheck={setIsCheck}
            tableData={tableData}
            setTempCheck={setTempCheck}
            tempCheck={tempCheck}
          />
        ))}

      </Table.Body>
    </Table>
  );
};

export default EmployeeBulkTable;
