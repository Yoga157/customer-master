import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import ICreditBillingTable from "selectors/main-cbv/models/ICreditBillingTable";
import ICreditBillingTableRow from "selectors/main-cbv/models/ICreditBillingTableRow";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import { useSelector, useDispatch } from "react-redux";
import IStore from "models/IStore";
import styles from "./DeductionsTable.module.scss";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import { Dispatch } from "redux";
// import CreditBillingServiceFormEdit from '../form/form-edit/CreditBillingServiceFormEdit';
import ModalSizeEnum from "constants/ModalSizeEnum";
// import MainCBVTableRow from './table-row/MainCBVTableRow';
import FilterMainCBV from "stores/main-cbv/models/FilterMainCBV";
import * as CreditBillingActions from "stores/main-cbv/CreditBillingActions";
import DeductionsTableRow from "./table-row/DeductionsTableRow";
import IDeductionsTable from "selectors/dedicated-resources/models/Deductions/IDeductionsTable";
import IDeductionsTableRow from "selectors/dedicated-resources/models/Deductions/IDeductionsTableRow";

interface IProps {
  readonly tableData: IDeductionsTable;
  flag?: string;
  validate?: any;
  //BulUpdate
  readonly DataDeductions?: any;
  setDataDeductions?: any;
  pieceDeductions?: number;
  tempDeductions?: any;
  setTempDeductions?: any;

  //InputDataFromLastContract
  setIsCheck?: any;
  isCheck?: any;
}

const DeductionsTable: React.FC<IProps> = ({
  tableData,
  flag,
  validate,
  DataDeductions,
  setDataDeductions,
  pieceDeductions,
  isCheck,
  setIsCheck,
  tempDeductions,
  setTempDeductions
}) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  return (
    <Table
      sortable
      striped
      className="StickyHeader"
      id="export-main-cbv"
      data-cols-width="10,15,30,30,30,30,50,20,20,20,20"
    >
      <Table.Header className={styles.CreditBillingServiceTable}>
        <Table.Row>
          <>
            {flag !== "InputData" && (
              <Table.HeaderCell textAlign="left"></Table.HeaderCell>
            )}
            <Table.HeaderCell textAlign="left">Type</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Description</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Amount</Table.HeaderCell>
            {flag === "InputData" && (
              <Table.HeaderCell textAlign="center"></Table.HeaderCell>
            )}
          </>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData?.rows?.length === 0 ||
          (DataDeductions?.length === 0 && JSON.parse(localStorage.getItem("Deductions"))?.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={11} textAlign="center">
                No data
              </Table.Cell>
            </Table.Row>
          ))}
        {flag === "BulkUpdate" &&
          tempDeductions?.map((model: IDeductionsTableRow) => 
          
          (
            <DeductionsTableRow
              flag={flag}
              rowData={model}
              setDataDeductions={setDataDeductions}
              DataDeductions={DataDeductions}
              totalDeductions={tableData.totalDeductions}
              tempDeductions={tempDeductions}
              setTempDeductions={setTempDeductions}
            />
          )
          )}
        {flag !== "BulkUpdate" && tableData.rows?.map((model: IDeductionsTableRow) => (
          <DeductionsTableRow
            flag={flag}
            validate={validate}
            rowData={model}
            totalDeductions={tableData.totalDeductions}
            setDataDeductions={setDataDeductions}
            DataDeductions={DataDeductions}
            isCheck={isCheck}
            setIsCheck={setIsCheck}
          />
        ))}
        {/* Pembatas */}
        {flag === "InputData" ? null : (
          <Table.Row>
            <Table.Cell textAlign="center" width="1"></Table.Cell>
            <Table.Cell style={{ fontWeight: "bold" }}>
              Total Potongan
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              Rp.
              {flag === "BulkUpdate"
                ? pieceDeductions?.toLocaleString()
                : tableData.totalDeductions?.toLocaleString()}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export default DeductionsTable;
