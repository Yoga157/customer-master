import React, { useEffect, useState, Fragment, useLayoutEffect } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Grid, Divider, Card } from "semantic-ui-react";
import {
  Button,
  SelectInput,
  NumberInput,
  RichTextEditor,
  RadioButton,
} from "views/components/UI";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IStore from "models/IStore";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { combineValidators, isRequired } from "revalidate";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import "./DeductionsFormStyle.scss";
import * as DedicatedResourcesActions from "stores/dedicated-resources/DedicatedResourcesActions";
import {
  selectDropDownDeductionType,
  selectDropDownDeductionDesc,
  selectDeductionByID,
  selectSalaryBenefit,
  selectSalaryBenefitByID,
  selectDeductions,
} from "selectors/dedicated-resources/DedicatedResourcesServiceSelector";
import DeductionsModel from "stores/dedicated-resources/models/DedicatedResourcesViewEdit/Deductions/DeductionsModel";
import ISalaryBenefitTable from "selectors/dedicated-resources/models/SalaryBenefit/ISalaryBenefitTable";
import IDeductionsTable from "selectors/dedicated-resources/models/Deductions/IDeductionsTable";
import ToastStatusEnum from "constants/ToastStatusEnum";
import * as ToastsAction from "stores/toasts/ToastsAction";

interface IProps {
  contractID?: number;
  deductID?: number;
  type?: string;
  deductType?: string;
  deductDesc?: string;

  //BulkUpdate
  rowData?: any;
  flag?: string;
  setDataDeductions?: any;
  DataDeductions?: any;
  DataEmployeeBulkUpdate?: any;
  tempDeductions?: any;
  setTempDeductions?: any;
}

const validate = combineValidators({
  deductDesc: isRequired("Deduction Desc"),
  deductType: isRequired("Deduction Type"),
});

const DeductionsForm: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const onClose = () => {
    dispatch(ModalAction.CLOSE());
  };

  const [checkbox, setCheckbox] = useState("Percentage");
  const [deductionType, setDeductionType] = useState("");
  const [deductionDesc, setDeductionDesc] = useState("");
  const [deductionTypeStr, setDeductionTypeStr] = useState("");
  const [deductionDescStr, setDeductionDescStr] = useState("");
  const [remark, setRemark] = useState("");
  const [rasio, setRasio] = useState(0);
  const [amount, setAmount] = useState(0);
  const [gajiPokok, setGajiPokok] = useState(0);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      DedicatedResourcesActions.REQUEST_DROPDOWN_DEDUCTION_TYPE,
      DedicatedResourcesActions.REQUEST_DROPDOWN_DEDUCTION_DESC,
      DedicatedResourcesActions.REQUEST_GET_DEDUCTION_BYID,
    ])
  );

  const DeductionTypeDropDown = useSelector((state: IStore) =>
    selectDropDownDeductionType(state)
  );
  const DeductionDescDropDown = useSelector((state: IStore) =>
    selectDropDownDeductionDesc(state)
  );
  const DeductionGetByID = useSelector((state: IStore) =>
    selectDeductionByID(state)
  );
  const ListSalaryBenefit: ISalaryBenefitTable = useSelector((state: IStore) =>
    selectSalaryBenefit(state)
  );
  const ListDeductions: IDeductionsTable = useSelector((state: IStore) =>
    selectDeductions(state)
  );

  const handleSubmit = (values: any) => {
    const newValues = new DeductionsModel({});

    newValues.deductID = props.deductID;
    newValues.contractID = props.contractID;
    newValues.deductType = deductionType;
    newValues.deductDesc = deductionDesc;
    newValues.deductTypeStr = deductionTypeStr;
    newValues.deductDescStr = deductionDescStr;
    newValues.amount = amount;
    newValues.remark = values.remark;
    newValues.percentage = rasio;
    newValues.userLoginID = currentUser.employeeID;

    if (props.flag === "BulkUpdate" && props.type === "Add") {

      var condition = false;
      const CheckingDesc = ListDeductions.rows?.map((item) => {
        if (item.deductDescStr === deductionDescStr) {
          condition = true;
        }
      });

      if (condition) {
        dispatch(
          ToastsAction.add(
            `Deduction Desc ${deductionDescStr} Already Available`,
            ToastStatusEnum.Warning
          )
        );
      } else {
        const newState = props.DataEmployeeBulkUpdate.map((obj, index) => {
          props.setDataDeductions((oldArray) => [
            ...oldArray,
            {
              BulkDeductionID: Math.floor(Math.random() * 999999999),
              deductID: props.deductID,
              contractID: obj.contractID,
              deductType: deductionType,
              deductDesc: deductionDesc,
              deductTypeStr: deductionTypeStr,
              deductDescStr: deductionDescStr,
              amount: values.amount,
              remark: values.remark,
              percentage: values.percentage,
              userLoginID: obj.employeeID,
              isSave: 1,
            },
          ]);
        });
  
        //Temp Show UI Table BulkUpdate
        props.setTempDeductions((oldArray) => [
          ...oldArray,
          {
            BulkDeductionID: Math.floor(Math.random() * 999999999),
            deductID: 0,
            contractID: props.DataEmployeeBulkUpdate[0].contractID,
            deductType: deductionType,
            deductDesc: deductionDesc,
            deductTypeStr: deductionTypeStr,
            deductDescStr: deductionDescStr,
            amount: values.amount,
            remark: values.remark,
            percentage: values.percentage,
            userLoginID: props.DataEmployeeBulkUpdate[0].employeeID,
            isSave: 1,
          },
        ]);
  
        onClose();
      }
    } else if (props.flag === "BulkUpdate" && props.type === "Edit") {
      const newState = props.DataDeductions?.map((obj) => {
        if (obj.BulkDeductionID === props.rowData.BulkDeductionID) {
          return {
            ...obj,
            deductType: deductionType,
            deductDesc: deductionDesc,
            amount: values.amount > 0 ? values.amount : amount,
            remark: values.remark ? values.remark : remark,
            percentage: values.percentage ? values.percentage : rasio,
          };
        }

        return obj;
      });
      props.setDataDeductions(newState);

      const newStateUI = props.tempDeductions?.map((obj) => {
        if (obj.salaryDesc === props.rowData.salaryDesc) {
          //Temp Show UI Table BulkUpdate
          return {
            ...obj,
            deductType: deductionType,
            deductDesc: deductionDesc,
            amount: values.amount > 0 ? values.amount : amount,
            remark: values.remark ? values.remark : remark,
            percentage: values.percentage ? values.percentage : rasio,
          };
        }

        return obj;
      });

      props.setTempDeductions(newStateUI);
      onClose();
    } else if (props.type === "Edit" && +props.deductID > 0) {
      dispatch(
        DedicatedResourcesActions.requestPutDeductionData(newValues)
      ).then(() => {
        onClose();
      });
    } else {
      dispatch(DedicatedResourcesActions.requestpostDeduction(newValues)).then(
        () => {
          onClose();
        }
      );
    }
  };

  const onChangeDeductionType = (event: any) => {
    const docTypes = DeductionTypeDropDown.filter((item: any) => {
      return item.value === event;
    });
    // const docTypes = DeductionTypeDummy.filter((item: any) => {
    //     return item.value === event;
    // });
    setDeductionType(docTypes[0].value);
    setDeductionTypeStr(docTypes[0].text);
    dispatch(
      DedicatedResourcesActions.requestDropdownDeductionDesc(docTypes[0].value)
    );
  };

  const onChangeDeductionDesc = (event: any) => {
    const docTypes = DeductionDescDropDown.filter((item: any) => {
      return item.value === event;
    });
    // const docTypes = DeductionDescDummy.filter((item: any) => {
    //     return item.value === event;
    // });
    setDeductionDesc(docTypes[0].value);
    setDeductionDescStr(docTypes[0].text);
  };

  const [mandatory, setMandatory] = useState({
    deductType: false,
    deductDesc: false,
  });
  
  useEffect(() => {
    if (props.type === "Edit" && props.rowData?.deductID > 0) {
      dispatch(
        DedicatedResourcesActions.requestGetDeductionById(props.rowData?.deductID)
      );
      dispatch(DedicatedResourcesActions.requestDropdownDeductionType());
        dispatch(DedicatedResourcesActions.requestDropdownDeductionDesc(props.rowData?.deductType))
      setDeductionDesc(DeductionGetByID.deductDesc);
      setDeductionType(DeductionGetByID.deductType);
      setDeductionDescStr(DeductionGetByID.deductDescStr);
      setDeductionTypeStr(DeductionGetByID.deductTypeStr);
    }

    if (props.flag === "BulkUpdate" && props.type === "Edit") {
      setDeductionType(props.rowData?.deductType);
      setDeductionDesc(props.rowData?.deductDesc);
      setRasio(props.rowData?.percentage);
      setAmount(props.rowData?.amount);
      setRemark(props.rowData?.remark);
    }
  }, [DeductionGetByID.deductDesc, DeductionGetByID.deductType, props.rowData]);

  useEffect(() => {
    // if (props.flag === "BulkUpdate") {
    //   dispatch(
    //     DedicatedResourcesActions.requestDeductions(
    //       props.DataEmployeeBulkUpdate[0]?.contractID,
    //       1,
    //       20
    //     )
    //   );
    // }

    if (props.flag !== "BulkUpdate") {
      const GP = ListSalaryBenefit.rows?.map((item) => {
        if (item.salaryDescStr === "Gaji Pokok") {
          setGajiPokok(item.newAmount);
        }
      });
    } else {
      setGajiPokok(JSON.parse(localStorage.getItem("NewGP")));
    }

    if (props.type === "Add") {
      dispatch(DedicatedResourcesActions.requestDropdownDeductionType());

      // if (DeductionGetByID.contractID > 0) {
      //   return dispatch(
      //     DedicatedResourcesActions.requestGetDeductionById(props.deductID)
      //   );
      // }
    }

    if (
      props.type === "Edit" &&
      props.deductID > 0 &&
      props.deductType !== ""
    ) {
      dispatch(
        DedicatedResourcesActions.requestDropdownDeductionDesc(props.deductType)
      );
    }
  }, [
    ListSalaryBenefit.rows,
    props.rowData,
    JSON.parse(localStorage.getItem("NewGP")) > 0,
  ]);

  useLayoutEffect(() => {
    return () => {
      dispatch(
        DedicatedResourcesActions.requestGetDeductionById(
          DeductionGetByID.deductID
        )
      );
    };
  }, []);


  const onChangePercentage = (event: any) => {
    setRasio(event);
    let newAmount = (gajiPokok * event) / 100;
    setAmount(newAmount);
    if (event === 0 || event === undefined) {
      setAmount(0);
    }
  };

  const onChangeAmount = (event: any) => {
    setAmount(event);
    let rasio = (event / gajiPokok) * 100;
    setRasio(rasio);
    if (event === 0 || event === undefined) {
      setRasio(0);
    }
  };
  
  return (
    <Fragment>
      <Card.Header>{props.type} Deductions Data</Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          validate={validate}
          onSubmit={(values: DeductionsModel) => handleSubmit(values)}
          initialValues={
            props.flag === "BulkUpdate" ? props.rowData : DeductionGetByID
          }
          render={({ handleSubmit, invalid, pristine }) => (
            // loading={isRequesting}
            <Form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="deductType"
                      component={SelectInput}
                      options={DeductionTypeDropDown}
                      // options={DeductionTypeDummy}
                      placeholder="e.g.Gaji .."
                      labelName="Type"
                      onChanged={onChangeDeductionType}
                      mandatory={mandatory.deductType}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="deductDesc"
                      component={SelectInput}
                      options={DeductionDescDropDown}
                      // options={DeductionDescDummy}
                      placeholder="e.g.Gaji Pokok .."
                      labelName="Description"
                      onChanged={onChangeDeductionDesc}
                      mandatory={mandatory.deductDesc}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row verticalAlign="top" columns={3}>
                  <Grid.Column
                    mobile={8}
                    tablet={5}
                    computer={4}
                    style={{ paddingRight: "0px" }}
                  >
                    <Field
                      className="text-primary customeRadio"
                      name="creditType"
                      component={RadioButton}
                      label={"Percentage"}
                      disabled={amount > 0 && true}
                      // mandatory={false}
                      thousandSeparator={true}
                      checked={checkbox === "Percentage"}
                      onChange={() => setCheckbox("Percentage")}
                    />
                    <Field
                      className="customeNumber"
                      name="percentage"
                      component={NumberInput}
                      placeholder="e.g.99.000.00.."
                      labelName=""
                      values={rasio}
                      thousandSeparator={true}
                      disabled={checkbox === "Percentage" ? false : true}
                      onChange={onChangePercentage}
                    />
                  </Grid.Column>
                  <Grid.Column
                    verticalAlign={"middle"}
                    mobile={8}
                    tablet={3}
                    computer={2}
                    className="TotalCreditInfo"
                  >
                    <div>
                      <p>%</p>
                    </div>
                  </Grid.Column>
                  <Grid.Column
                    mobile={16}
                    tablet={8}
                    computer={10}
                    className="FullGrid767"
                  >
                    <Field
                      className="text-primary customeRadio"
                      name="creditType"
                      component={RadioButton}
                      label={"Amount"}
                      disabled={rasio > 0 && true}
                      // mandatory={false}
                      thousandSeparator={true}
                      checked={checkbox === "Amount"}
                      onChange={() => setCheckbox("Amount")}
                    />
                    {checkbox === "Percentage" ? (
                      <Field
                        className="customeNumber"
                        name="amount"
                        component={NumberInput}
                        placeholder="e.g.99.000.00.."
                        labelName=""
                        disabled={true}
                        // mandatory={false}
                        values={amount}
                        thousandSeparator={true}
                        onChange={onChangeAmount}
                      />
                    ) : (
                      <Field
                        className="customeNumber"
                        name="amount"
                        component={NumberInput}
                        placeholder="e.g.99.000.00.."
                        labelName=""
                        disabled={false}
                        // mandatory={false}
                        // values={amount}
                        thousandSeparator={true}
                        onChange={onChangeAmount}
                      />
                    )}
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    <Field
                      name="remark"
                      component={RichTextEditor}
                      placeholder="Notes"
                      labelName="Notes"
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    {/* || !errorCustomerName */}
                    <Button
                      type="button"
                      floated="right"
                      content="Cancel"
                      onClick={onClose}
                    />
                    {/* disabled={pristine || invalid}  */}
                    <Button
                      color="blue"
                      floated="right"
                      content="Submit"
                      disabled={invalid || pristine}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          )}
        />
      </LoadingIndicator>
    </Fragment>
  );
};

export default DeductionsForm;
