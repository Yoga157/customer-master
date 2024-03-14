import React, { useEffect, useState } from "react";
import { Table, Dropdown } from "semantic-ui-react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { Button } from "views/components/UI";
import { Form as FinalForm, Field } from "react-final-form";
import ISalaryBenefitTableRow from "selectors/dedicated-resources/models/SalaryBenefit/ISalaryBenenfitTableRow";
import ModalSizeEnum from "constants/ModalSizeEnum";
import ModalDeleteRowSalaryBenefit from "./ModalDeleteRowSalaryBenefit";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import SalaryBenefitForm from "../../form/SalaryBenefitForm";

interface IProps {
  readonly rowData?: ISalaryBenefitTableRow;
  flag?: string;
  validate?: any;

  //BulUpdate
  totalGrossNewAmount?: number;
  totalGrossCurrAmount?: number;
  // typeBulk?: string;
  DataSalaryBenefit?: any;
  setDataSalaryBenefit?: any;
  tempSalary?: any;
  setTempSalary?: any;

  //InputDataFromLastContract
  setIsCheck?: any;
  isCheck?: any;
}

const SalaryAndBenefitTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const {
    rowData,
    flag,
    validate,
    DataSalaryBenefit,
    setDataSalaryBenefit,
    isCheck,
    setIsCheck,
    tempSalary,
    setTempSalary
  } = props;

  const EditSalaryBenefit = (rowData) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <SalaryBenefitForm
          setDataSalaryBenefit={setDataSalaryBenefit}
          DataSalaryBenefit={DataSalaryBenefit}
          flag={flag}
          rowData={rowData}
          type={"Edit"}
          tempSalary={tempSalary}
          setTempSalary={setTempSalary}
        />,
        ModalSizeEnum.Small
      )
    );
  };
  
  const handleDelete = (id) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalDeleteRowSalaryBenefit
          setDataSalaryBenefit={setDataSalaryBenefit}
          DataSalaryBenefit={DataSalaryBenefit}
          tempSalary={tempSalary}
          setTempSalary={setTempSalary}
          id={id}
          flag={flag}
        />,
        ModalSizeEnum.Tiny
      )
    );
  };
  
  const handleClick = (e) => {
    const { id, checked } = e.target;
    const isSaveChange = JSON.parse(localStorage.getItem("SalaryBenefit"))?.map(
      (item) => {
        if (item.salaryID === parseInt(id)) {
          if (item.isSave !== 1) {
            return { ...item, isSave: 1 };
          } else {
            return { ...item, isSave: 0 };
          }
        }
        return item;
      }
    );
    setIsCheck([...isCheck, parseInt(id)]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== parseInt(id)));
    }
    localStorage.setItem("SalaryBenefit", JSON.stringify(isSaveChange));
  };
  const Checkbox = ({ id, type, handleClick, checked }) => {
    //
    return (
      <label className="switch">
        <input type={type} id={id} onChange={handleClick} checked={checked} />
        <span className="slider round"></span>
      </label>
    );
  };
 
  return (
    <>
      <Table.Row>
        {flag !== "InputData" && (
          <Table.Cell textAlign="left" width="1">
            {validate ? null : (
            <Dropdown pointing="left" icon="ellipsis vertical">
              <Dropdown.Menu>
                <Dropdown.Item
                  text="View/Edit"
                  icon="edit"
                  onClick={() => EditSalaryBenefit(rowData)}
                />
                <Dropdown.Item
                  text="Delete"
                  icon="trash alternate"
                  onClick={() =>
                    handleDelete(
                      flag === "BulkUpdate"
                        ? rowData.salaryDesc
                        : rowData.salaryID
                    )
                  }
                />
              </Dropdown.Menu>
            </Dropdown>)}
          </Table.Cell>
        )}

        <Table.Cell textAlign="left">{rowData.salaryTypeStr}</Table.Cell>
        <Table.Cell textAlign="left">{rowData.salaryDescStr}</Table.Cell>
        {/* .toLocaleString() */}

        {flag === "InputData" ? (
          <>
            <Table.Cell textAlign="left">
              Rp.{rowData.newAmount.toLocaleString()}
            </Table.Cell>
            <Table.Cell
              className="pt-1r pb-2 item-toggle"
              verticalAlign="middle"
              textAlign="right"
            >
              <span>OFF</span>
              <Checkbox
                id={rowData.salaryID}
                type="checkbox"
                handleClick={handleClick}
                checked={isCheck.includes(rowData.salaryID)}
              />
              {/* {FlagChecked === "All" ? (
                <span>
                  <Field
                    name={"toggle"}
                    toggle
                    component={CheckBox}
                    checked={FlagChecked === "All" ? true : false}
                    // defaultChecked={rowData.isSave === 1}
                    onChange={(e, checked) => {
                      handleChecked(e, checked, rowData.salaryID);
                    }}
                  />
                </span>
              ) : FlagChecked === "AllOff" ? (
                <span>
                  <Field
                    name={"toggle"}
                    toggle
                    component={CheckBox}
                    checked={FlagChecked === "AllOff" ? false : true}
                    // defaultChecked={rowData.isSave === 1}
                    onChange={(e, checked) => {
                      handleChecked(e, checked, rowData.salaryID);
                    }}
                  />
                </span>
              ) : (
                <span>
                  <Field
                    name={"toggle"}
                    toggle
                    component={CheckBox}
                    // checked={rowData.isSave === 1}
                    defaultChecked={rowData.isSave === 1}
                    onChange={(e, checked) => {
                      handleChecked(e, checked, rowData.salaryID);
                    }}
                  />
                </span>
              )} */}

              <span>ON</span>
            </Table.Cell>
            {/* )} */}
          </>
        ) : (
          <>
            <Table.Cell textAlign="left">
              Rp.{rowData.currentAmount?.toLocaleString()}
            </Table.Cell>
            <Table.Cell textAlign="left">
              Rp.{rowData.newAmount?.toLocaleString()}
            </Table.Cell>
            <Table.Cell textAlign="left">
              {ReactHtmlParser(rowData?.remark)}
            </Table.Cell>
          </>
        )}

        {/* .toLocaleString() */}
      </Table.Row>
    </>
  );
};

export default SalaryAndBenefitTableRow;
