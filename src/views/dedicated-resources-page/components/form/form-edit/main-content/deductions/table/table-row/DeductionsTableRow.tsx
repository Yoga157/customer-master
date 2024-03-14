import React, { useEffect, useState } from "react";
import { Table, Dropdown } from "semantic-ui-react";
import ICreditBillingTableRow from "selectors/main-cbv/models/ICreditBillingTableRow";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { Button, CheckBox } from "views/components/UI";
import { Form as FinalForm, Field } from "react-final-form";
import IDeductionsTableRow from "selectors/dedicated-resources/models/Deductions/IDeductionsTableRow";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import DeductionsForm from "../../form/DeductionsForm";
import ModalDeleteRowDeductions from "./ModalDeleteRowDeductions";

interface IProps {
  readonly rowData?: IDeductionsTableRow;
  readonly totalDeductions: number;
  trigger?: any;
  flag: string;
  validate?: any;
  //BulkUpdate
  setDataDeductions?: any;
  DataDeductions?: any;
  tempDeductions?: any;
  setTempDeductions?: any;

  //InputDataFromLastContract
  setIsCheck?: any;
  isCheck?: any;
}

const DeductionsTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const {
    rowData,
    trigger,
    flag,
    validate,
    setDataDeductions,
    DataDeductions,
    isCheck,
    setIsCheck,
    tempDeductions,
    setTempDeductions,
  } = props;

  const EditDeduction = (
    deductID,
    contractID,
    deductType,
    deductDesc,
    rowData
  ) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <DeductionsForm
          setDataDeductions={setDataDeductions}
          DataDeductions={DataDeductions}
          flag={flag}
          deductID={deductID}
          contractID={contractID}
          deductType={deductType}
          deductDesc={deductDesc}
          rowData={rowData}
          type={"Edit"}
          tempDeductions={tempDeductions}
          setTempDeductions={setTempDeductions}
        />,
        ModalSizeEnum.Small
      )
    );
  };

  const handleDelete = (deductID) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalDeleteRowDeductions
          DataDeductions={DataDeductions}
          flag={flag}
          setDataDeductions={setDataDeductions}
          id={deductID}
          tempDeductions={tempDeductions}
          setTempDeductions={setTempDeductions}
        />,
        ModalSizeEnum.Tiny
      )
    );
  };

  const handleChecked = (e) => {
    // const isSaveChange = JSON.parse(localStorage.getItem("Deductions"))?.map(
    //   (item) => {
    //     if (item.deductID === ids) {
    //       if (checked.checked === true) {
    //         return { ...item, isSave: 0 };
    //       } else {
    //         return { ...item, isSave: 1 };
    //       }
    //     }
    //     return item;
    //   }
    // );
    // // console.log('isSaveChange',isSaveChange)
    // localStorage.setItem("Deductions", JSON.stringify(isSaveChange));

    const { id, checked } = e.target;
    const isSaveChange = JSON.parse(localStorage.getItem("Deductions"))?.map(
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
    localStorage.setItem("Deductions", JSON.stringify(isSaveChange));
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
          <Table.Cell textAlign="center" width="1">
            {validate ? null : (
              <Dropdown pointing="left" icon="ellipsis vertical">
                <Dropdown.Menu>
                  <Dropdown.Item
                    text="View/Edit"
                    icon="edit"
                    onClick={() =>
                      EditDeduction(
                        rowData.deductID,
                        rowData.contractID,
                        rowData.deductType,
                        rowData.deductDesc,
                        rowData
                      )
                    }
                  />
                  <Dropdown.Item
                    text="Delete"
                    icon="trash alternate"
                    onClick={() =>
                      handleDelete(
                        flag === "BulkUpdate"
                          ? rowData.deductDesc
                          : rowData.deductID
                      )
                    }
                  />
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Table.Cell>
        )}

        <Table.Cell>{rowData.deductTypeStr}</Table.Cell>
        <Table.Cell>{rowData.deductDescStr}</Table.Cell>
        <Table.Cell>Rp.{rowData.amount?.toLocaleString()}</Table.Cell>
        {/* {flag === "InputData" ? (
          <Table.Cell
            className="pt-1r pb-2 item-toggle"
            verticalAlign="middle"
            textAlign="right"
          >
            <span>OFF</span>
            <span>
              <Field
                name={"toggle"}
                toggle
                component={CheckBox}
                defaultChecked={rowData.isSave === 1}
                onChange={(e, checked) => {
                  handleChecked(e, checked, rowData.deductID);
                }}
              />
            </span>
            <span>ON</span>
          </Table.Cell>
        ) : null} */}
        {flag === "InputData" ? (
          <>
            <Table.Cell
              className="pt-1r pb-2 item-toggle"
              verticalAlign="middle"
              textAlign="right"
            >
              <span>OFF</span>
              <Checkbox
                id={rowData.deductID}
                type="checkbox"
                handleClick={handleChecked}
                checked={isCheck.includes(rowData.deductID)}
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
                      handleChecked(e, checked, rowData.deductID);
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
                      handleChecked(e, checked, rowData.deductID);
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
                      handleChecked(e, checked, rowData.deductID);
                    }}
                  />
                </span>
              )} */}

              <span>ON</span>
            </Table.Cell>
            {/* )} */}
          </>
        ) : null}
      </Table.Row>

      {/* Pembatas */}
      {/* {
        flag === "InputData" ?
          null
          :
          <Table.Row>
            <Table.Cell textAlign="center" width="1">

            </Table.Cell>
            <Table.Cell style={{ fontWeight: 'bold' }}>Total Potongan</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>Rp.{props.totalDeductions.toLocaleString()}</Table.Cell>
          </Table.Row>
      } */}
    </>
  );
};

export default DeductionsTableRow;
