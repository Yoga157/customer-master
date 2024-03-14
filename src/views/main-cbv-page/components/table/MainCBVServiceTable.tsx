import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import ICreditBillingTable from 'selectors/main-cbv/models/ICreditBillingTable';
import ICreditBillingTableRow from 'selectors/main-cbv/models/ICreditBillingTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import styles from './MainCBVServiceTable.module.scss';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { Dispatch } from 'redux';
import CreditBillingServiceFormEdit from '../form/form-edit/CreditBillingServiceFormEdit';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import MainCBVTableRow from './table-row/MainCBVTableRow';
import FilterMainCBV from 'stores/main-cbv/models/FilterMainCBV';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions';

interface IProps {
  readonly tableData: ICreditBillingTable;
  columns: any;
  setColumns: any;
  direction: any;
  setDirection: any;
  page: number;
  pageSize: number;
}

const MainCBVServiceTable: React.FC<IProps> = ({ tableData, columns, setColumns, direction, setDirection, page, pageSize }) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const viewEditClick = (rowData) => {
    dispatch(ModalFirstLevelActions.OPEN(<CreditBillingServiceFormEdit rowData={rowData} />, ModalSizeEnum.Large));
  };

  useEffect(() => {

  }, [direction])


  // const [columns, setColumns] = useState('');
  // const [direction, setDirection] = useState('ascending' as any);
  const filter: FilterMainCBV = useSelector((state: IStore) => state.creditBilling.listData.filter)
  // console.log('columns',columns)
  const reloads = (columns: any) => {
    setColumns(columns);
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    console.log('directionReload', direction)
    console.log('dcolumnssReload', columns)
    dispatch(CreditBillingActions.requestCreditBillings(currentUser.employeeID, '', columns, direction === 'ascending' ? 'descending' : 'ascending', page, pageSize));
    if (filter !== null) {
      const filterNew = new FilterMainCBV(filter);
      filterNew.pageSize = pageSize;
      filterNew.page = page;
      filterNew.column = columns;
      filterNew.sorting = direction;

      dispatch(CreditBillingActions.RequestFilterMainCBV(filterNew))
    }


  };

  return (
    <Table sortable striped className="StickyHeader" id="export-main-cbv" data-cols-width="10,15,30,30,30,30,50,20,20,20,20">
      <Table.Header className={styles.CreditBillingServiceTable}>
        <Table.Row>
          <>
            <Table.HeaderCell textAlign="left"></Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'creditId' ? direction : null} onClick={() => reloads('creditId')} textAlign="left">Credit ID</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'voucherNo' ? direction : null} onClick={() => reloads('voucherNo')} textAlign="left">CBV No</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'accountID' ? direction : null} onClick={() => reloads('accountID')} textAlign="left">Account ID</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'sourceCustomerIDStr' ? direction : null} onClick={() => reloads('sourceCustomerIDStr')} textAlign="left">Source Customer Name</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'picName' ? direction : null} onClick={() => reloads('picName')} textAlign="left">PIC Name</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'voucherAmountH' ? direction : null} onClick={() => reloads('voucherAmountH')} textAlign="left">Voucher Amount</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'usedAmountH' ? direction : null} onClick={() => reloads('usedAmountH')} textAlign="left">Used Amount</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'remainingAmountH' ? direction : null} onClick={() => reloads('remainingAmountH')} textAlign="left">Remaining Amount</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'notes' ? direction : null} onClick={() => reloads('notes')} textAlign="left">Note</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'createdBy' ? direction : null} onClick={() => reloads('createdBy')} textAlign="left">Created By</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'createdDate' ? direction : null} onClick={() => reloads('createdDate')} textAlign="left">Created Date</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'modifiedBy' ? direction : null} onClick={() => reloads('modifiedBy')} textAlign="left">Modified By</Table.HeaderCell>
            <Table.HeaderCell sorted={columns === 'modifiedDate' ? direction : null} onClick={() => reloads('modifiedDate')} textAlign="left">Modified Date</Table.HeaderCell>
          </>
        </Table.Row>
      </Table.Header>
      <Table.Body>

        {tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={11} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.rows.map((model: ICreditBillingTableRow) => (
          <MainCBVTableRow
            trigger={(value) => viewEditClick(value)}
            key={model.creditId}
            rowData={model}
          />
        ))}

      </Table.Body>
    </Table>
  );
};

export default MainCBVServiceTable;
