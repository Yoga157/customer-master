import React, { useEffect, useState } from "react";
import { Table, Dropdown } from "semantic-ui-react";
import ICreditBillingTableRow from "selectors/main-cbv/models/ICreditBillingTableRow";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { Button, CheckBox } from "views/components/UI";
import { Form as FinalForm, Field } from "react-final-form";
import IOtherBenefitTableRow from "selectors/dedicated-resources/models/OtherBenefit/IOtherBenefitTableRow";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import ModalDeleteRowOtherBenefit from "./ModalDeleteRowOtherBenefit";
import UpdateBenefit from "../../form/UpdateBenefit";

interface IProps {
  // readonly rowData?: IOtherBenefitTableRow;
  readonly rowData?: any;
  trigger?: any;
  flag?: string;
  validate?: any;
  FlagChecked?: string;
  setFlagChecked?: any;
  //BulkUpdate
  DataOtherBenefit?: any;
  setDataOtherBenefit?: any;
  tempOther?: any;
  setTempOther?: any;

  //InputDataFromLastContract
  setIsCheck?: any;
  isCheck?: any;
}

const OtherAndBenefitTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const {
    rowData,
    trigger,
    flag,
    validate,
    DataOtherBenefit,
    setDataOtherBenefit,
    isCheck,
    setIsCheck,
    tempOther,
    setTempOther
  } = props;

  const EditOtherBenefit = (contractID, benefitID, rowData) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        // <UpdateBenefit id={1} type={"Add"} />,
        <UpdateBenefit
          DataOtherBenefit={DataOtherBenefit}
          setDataOtherBenefit={setDataOtherBenefit}
          flag={flag}
          contractID={contractID}
          benefitID={benefitID}
          rowData={rowData}
          type={"Edit"}
             //BulkUpdate
             tempOther={tempOther}
             setTempOther={setTempOther}
        />,
        ModalSizeEnum.Small
      )
    );
  };

  const handleDelete = (id) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalDeleteRowOtherBenefit
          setDataOtherBenefit={setDataOtherBenefit}
          DataOtherBenefit={DataOtherBenefit}
          flag={flag}
          id={id}
          //BulkUpdate
          tempOther={tempOther}
          setTempOther={setTempOther}
        />,
        ModalSizeEnum.Tiny
      )
    );
  };

  const handleChecked = (e) => {
    const { id, checked } = e.target;
    const isSaveChange = JSON.parse(localStorage.getItem("OtherBenefit"))?.map(
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
    localStorage.setItem("OtherBenefit", JSON.stringify(isSaveChange));

    // const isSaveChange = JSON.parse(localStorage.getItem("OtherBenefit"))?.map(
    //   (item) => {
    //     if (item.deductID === ids) {
    //       if (checked.checked === true) {
    //         setFlagChecked("");
    //         return { ...item, isSave: 0 };
    //       } else {
    //         setFlagChecked("");
    //         return { ...item, isSave: 1 };
    //       }
    //     }
    //     return item;
    //   }
    // );
    // // console.log('isSaveChange',isSaveChange)
    // localStorage.setItem("OtherBenefit", JSON.stringify(isSaveChange));
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
        {flag !== "Contract" && (
          <Table.Cell textAlign="left" width="1">
             {validate ? null : (
            <Dropdown pointing="left" icon="ellipsis vertical">
              <Dropdown.Menu>
                <Dropdown.Item
                  text="View/Edit"
                  icon="edit"
                  onClick={() =>
                    EditOtherBenefit(
                      rowData.contractID,
                      rowData.benefitID,
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
                        ? rowData.benefitDesc
                        : rowData.benefitID
                    )
                  }
                />
              </Dropdown.Menu>
            </Dropdown>
             )}
          </Table.Cell>
        )}

        <Table.Cell textAlign="left">{rowData.benefitTypeStr}</Table.Cell>
        <Table.Cell textAlign="left">{rowData.benefitDescStr}</Table.Cell>

        {/* {flag === "Contract" && (
          <>
            <Table.Cell textAlign="left">
              <CheckBox />
            </Table.Cell>
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
                  // disabled={disableComponent || (!minimumHardware && i.value === false)}
                  // // disabled={disableComponent || (equelMinChoiceHardware && !minimumHardware)}
                  // checked={i.value}
                  defaultChecked={rowData.isSave === 1}
                  onChange={(e, checked) =>
                    handleChecked(e, checked, rowData.benefitID)
                  }
                />
              </span>
              <span>ON</span>
              {/* <Button content="SET" /> */}
        {/* </Table.Cell>
          </>
        )} */}

        {flag === "Contract" && (
          <>
            <Table.Cell textAlign="left">
              <CheckBox />
            </Table.Cell>
            <Table.Cell
              className="pt-1r pb-2 item-toggle"
              verticalAlign="middle"
              textAlign="right"
            >
              <span>OFF</span>
              {/* <span>
                <Field
                  name={"toggle"}
                  toggle
                  component={CheckBox}
                  // disabled={disableComponent || (!minimumHardware && i.value === false)}
                  // // disabled={disableComponent || (equelMinChoiceHardware && !minimumHardware)}
                  // checked={i.value}
                  defaultChecked={rowData.isSave === 1}
                  onChange={(e, checked) =>
                    handleChecked(e, checked, rowData.benefitID)
                  }
                />
              </span> */}
              <Checkbox
                id={rowData.benefitID}
                type="checkbox"
                handleClick={handleChecked}
                checked={isCheck.includes(rowData.benefitID)}
              />
              <span>ON</span>
              {/* <Button content="SET" /> */}
            </Table.Cell>
          </>
        )}
      </Table.Row>
    </>
  );
};

export default OtherAndBenefitTableRow;
