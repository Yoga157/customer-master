import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import ICreditBillingTable from "selectors/main-cbv/models/ICreditBillingTable";
import ICreditBillingTableRow from "selectors/main-cbv/models/ICreditBillingTableRow";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import { useSelector, useDispatch } from "react-redux";
import IStore from "models/IStore";
import styles from "./OtherAndBenefitTable.module.scss";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import { Dispatch } from "redux";
// import CreditBillingServiceFormEdit from '../form/form-edit/CreditBillingServiceFormEdit';
import ModalSizeEnum from "constants/ModalSizeEnum";
// import MainCBVTableRow from './table-row/MainCBVTableRow';
import FilterMainCBV from "stores/main-cbv/models/FilterMainCBV";
import * as CreditBillingActions from "stores/main-cbv/CreditBillingActions";
import OtherAndBenefitTableRow from "./table-row/OtherAndBenefitTableRow";
import IOtherBenefitTable from "selectors/dedicated-resources/models/OtherBenefit/IOtherBenefitTable";
import IOtherBenefitTableRow from "selectors/dedicated-resources/models/OtherBenefit/IOtherBenefitTableRow";

interface IProps {
  readonly tableData: IOtherBenefitTable;
  flag?: string;
  validate?: any;
  //BulkUpdate
  readonly DataOtherBenefit?: any;
  setDataOtherBenefit?: any;
  tempOther?: any;
  setTempOther?: any;

    //InputDataFromLastContract
    setIsCheck?: any;
    isCheck?: any;
}

const OtherAndBenefitTable: React.FC<IProps> = ({
  tableData,
  flag,
  validate,
  DataOtherBenefit,
  setDataOtherBenefit,
  isCheck,
  setIsCheck,
  tempOther,
  setTempOther
}) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const viewEditClick = (rowData) => {
    // dispatch(ModalFirstLevelActions.OPEN(<CreditBillingServiceFormEdit rowData={rowData} />, ModalSizeEnum.Large));
  };

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
            {flag !== "Contract" && (
              <Table.HeaderCell textAlign="left"></Table.HeaderCell>
            )}
            <Table.HeaderCell textAlign="left">Benefit</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Description</Table.HeaderCell>
            {flag === "Contract" && (
              <>
                <Table.HeaderCell textAlign="left">
                  Last
                  <br />
                  Contract
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center"></Table.HeaderCell>
              </>
            )}
          </>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData?.rows?.length === 0 ||
          (DataOtherBenefit?.length === 0 && JSON.parse(localStorage.getItem("OtherBenefit"))?.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={11} textAlign="center">
                No data
              </Table.Cell>
            </Table.Row>
          ))}
        {tempOther?.map((model: any) => 
         
        (
          <OtherAndBenefitTableRow
            flag={flag}
            rowData={model}
            setDataOtherBenefit={setDataOtherBenefit}
            DataOtherBenefit={DataOtherBenefit}
            tempOther={tempOther}
            setTempOther={setTempOther}
          />
        ))}

        {flag !== "BulkUpdate" && tableData?.rows?.map((model: IOtherBenefitTableRow) => (
          <OtherAndBenefitTableRow
            flag={flag}
            // trigger={(value) => viewEditClick(value)}
            // key={model.creditId}
            validate={validate}
            rowData={model} 
            isCheck={isCheck}
            setIsCheck={setIsCheck}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

export default OtherAndBenefitTable;
