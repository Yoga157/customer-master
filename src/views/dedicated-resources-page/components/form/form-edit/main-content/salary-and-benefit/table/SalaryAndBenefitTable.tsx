import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import ICreditBillingTable from "selectors/main-cbv/models/ICreditBillingTable";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import { useSelector, useDispatch } from "react-redux";
import IStore from "models/IStore";
import styles from "./SalaryAndBenefitTable.module.scss";
import { Dispatch } from "redux";
import FilterMainCBV from "stores/main-cbv/models/FilterMainCBV";
import * as CreditBillingActions from "stores/main-cbv/CreditBillingActions";
import SalaryAndBenefitTableRow from "./table-row/SalaryAndBenefitTableRow";
import ISalaryBenefitTable from "selectors/dedicated-resources/models/SalaryBenefit/ISalaryBenefitTable";
import ISalaryBenefitTableRow from "selectors/dedicated-resources/models/SalaryBenefit/ISalaryBenenfitTableRow";

interface IProps {
  readonly tableData: ISalaryBenefitTable;
  flag?: string;
  //View/Edit
  validate?: any;

  //BulUpdate
  DataSalaryBenefit?: any;
  setDataSalaryBenefit: any;
  totalGrossNewAmount?: number;
  totalGrossCurrAmount?: number;
  tempSalary?: any;
  setTempSalary?: any;
  

  //InputDataFromLastContract
  setIsCheck?: any;
  isCheck?: any;
}

const SalaryAndBenefitTable: React.FC<IProps> = ({
  tableData,
  flag,
  validate,
  DataSalaryBenefit,
  setDataSalaryBenefit,
  totalGrossNewAmount,
  totalGrossCurrAmount,
  isCheck,
  setIsCheck,
  tempSalary,
  setTempSalary
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
            {flag === "InputData" ? (
              <>
                <Table.HeaderCell textAlign="left">Amount</Table.HeaderCell>
                <Table.HeaderCell textAlign="center"></Table.HeaderCell>
              </>
            ) : (
              <>
                <Table.HeaderCell textAlign="left">
                  Current Amount
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="left">New Amount</Table.HeaderCell>
                <Table.HeaderCell textAlign="left">Notes</Table.HeaderCell>
              </>
            )}
          </>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {flag !== "BulkUpdate" && tableData?.rows?.length === 0 ||
          flag !== "BulkUpdate" && DataSalaryBenefit?.length === 0 ||
          (JSON.parse(localStorage.getItem("SalaryBenefit"))?.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={11} textAlign="center">
                No data
              </Table.Cell>
            </Table.Row>
          ))}

        {
        flag === "BulkUpdate"
          ? tempSalary?.map((model: ISalaryBenefitTableRow) => 
           
              (
                <SalaryAndBenefitTableRow
                  flag={flag}
                  DataSalaryBenefit={DataSalaryBenefit}
                  setDataSalaryBenefit={setDataSalaryBenefit}
                  rowData={model}
                  tempSalary={tempSalary}
                  setTempSalary={setTempSalary}
                />
              )
          )
          : tableData?.rows?.map((model: ISalaryBenefitTableRow) => (
              <SalaryAndBenefitTableRow
                flag={flag}
                rowData={model}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
                DataSalaryBenefit={DataSalaryBenefit}
                setDataSalaryBenefit={setDataSalaryBenefit}
                validate={validate}
              />
            ))}

        {flag === "InputData" ? null : (
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              <p style={{ fontWeight: "bold" }}>Total Gross Gaji</p>
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell textAlign="left">
              Rp.
              {flag === "BulkUpdate"
                ? totalGrossCurrAmount?.toLocaleString()
                : tableData.totalGrossCurrAmount?.toLocaleString()}
            </Table.Cell>
            <Table.Cell textAlign="left">
              Rp.
              {flag === "BulkUpdate"
                ? totalGrossNewAmount?.toLocaleString()
                : tableData.totalGrossNewAmount?.toLocaleString()}
            </Table.Cell>
            <Table.Cell textAlign="left"></Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export default SalaryAndBenefitTable;
