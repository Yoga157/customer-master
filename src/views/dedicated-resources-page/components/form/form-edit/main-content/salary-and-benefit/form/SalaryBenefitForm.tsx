import React, {
  useState,
  Fragment,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Grid, Divider, Card } from "semantic-ui-react";
import {
  Button,
  SelectInput,
  NumberInput,
  RadioButton,
  RichTextEditor,
  SearchInput,
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
import "./SalaryBenefitFormStyle.scss";
import * as DedicatedResourcesActions from "stores/dedicated-resources/DedicatedResourcesActions";
import {
  selectDropDownSalaryBenefitType,
  selectDropDownSalaryBenefitDesc,
  selectDropDownUMRYearSalaryBenefit,
  selectDropDownUMRSalaryBenefit,
  selectSalaryBenefitByID,
  selectCurrentSalary,
  selectSalaryBenefit,
} from "selectors/dedicated-resources/DedicatedResourcesServiceSelector";
import SalaryBenefitModel from "stores/dedicated-resources/models/DedicatedResourcesViewEdit/SalaryBenefit/SalaryBenefitModel";
import ToastStatusEnum from "constants/ToastStatusEnum";
import * as ToastsAction from "stores/toasts/ToastsAction";
import ISalaryBenefitTable from "selectors/dedicated-resources/models/SalaryBenefit/ISalaryBenefitTable";

interface IProps {
  contractID?: number;
  type: string;
  rowData?: any;
  flag?: string;
  //BulkUpdate
  setDataSalaryBenefit?: any;
  DataSalaryBenefit?: any;
  employeeID?: string;
  DataEmployeeBulkUpdate?: any;
  isCheckBulk?: any;
  setTempSalary?: any;
  tempSalary?: any;
}

const validate = combineValidators({
  salaryType: isRequired("Salary Type"),
  salaryDesc: isRequired("Salary Desc"),
  newAmount: isRequired("New Amount"),
  currentAmount: isRequired("Current Amount"),
});

const SalaryBenefitForm: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const onClose = () => {
    dispatch(ModalAction.CLOSE());
  };

  const [SalaryBenefitType, setSalaryBenefitType] = useState("");
  const [SalaryBenefitDesc, setSalaryBenefitDesc] = useState("");
  const [SalaryBenefitTypeStr, setSalaryBenefitTypeStr] = useState("");
  const [SalaryBenefitDescStr, setSalaryBenefitDescStr] = useState("");
  const [yearUmr, setYearUmr] = useState("");
  const [RangeUMR, setRangeUMR] = useState("");
  const [RegionUMR, setRegionUMR] = useState("");
  const [currentSalary, setCurrentSalary] = useState(0);
  const [newSalary, setNewSalary] = useState(0);
  const [rasio, setRasio] = useState(0);
  const [notes, setNotes] = useState("");
  const [flagNewSalary, setFlagNewSalary] = useState(0);

  const SalaryBenefitTypeDropDown = useSelector((state: IStore) =>
    selectDropDownSalaryBenefitType(state)
  );
  const SalaryBenefitDescDropDown = useSelector((state: IStore) =>
    selectDropDownSalaryBenefitDesc(state)
  );
  const SalaryBenefitUMRYear = useSelector((state: IStore) =>
    selectDropDownUMRYearSalaryBenefit(state)
  );
  const SalaryBenefitUMR = useSelector((state: IStore) =>
    selectDropDownUMRSalaryBenefit(state)
  );
  const SalaryBenefitByID = useSelector((state: IStore) =>
    selectSalaryBenefitByID(state)
  );
  const CurrentBenefitSalary = useSelector((state: IStore) =>
    selectCurrentSalary(state)
  );
  const ListSalaryBenefit: ISalaryBenefitTable = useSelector((state: IStore) =>
    selectSalaryBenefit(state)
  );

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_TYPE,
      DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_DESC,
      DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_UMR_YEAR,
      DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_UMR,
      DedicatedResourcesActions.REQUEST_CURRENT_SALARY,
    ])
  );

  const onChangeSalaryBenefitType = (event: any) => {
    const docTypes = SalaryBenefitTypeDropDown.filter((item: any) => {
      return item.value === event;
    });
    setSalaryBenefitType(docTypes[0].value);
    setSalaryBenefitTypeStr(docTypes[0].text);

    dispatch(
      DedicatedResourcesActions.requestDropdownSalaryBenefitDesc(
        parseInt(docTypes[0]?.value)
      )
    );
  };

  const onChangeSalaryBenefitDesc = (event: any) => {
    const docTypes = SalaryBenefitDescDropDown.filter((item: any) => {
      return item.value === event;
    });

    setSalaryBenefitDesc(docTypes[0].value);
    setSalaryBenefitDescStr(docTypes[0].text);

    if (docTypes[0].text === "Gaji Pokok") {
      if (props.type === "Edit") {
        dispatch(
          DedicatedResourcesActions.requestCurrentSalary(
            props.rowData?.contractID > 0
              ? props.rowData?.contractID
              : JSON.parse(localStorage.getItem("EmployeeContractID"))
          )
        );
      } else {
        dispatch(
          DedicatedResourcesActions.requestCurrentSalary(
            props?.contractID > 0
              ? props?.contractID
              : JSON.parse(localStorage.getItem("EmployeeContractID"))
              ? JSON.parse(localStorage.getItem("EmployeeContractID"))
              : 0
          )
        );
      }
    }
  };

  const onChangeSalaryBenefitUmrYear = (event: any) => {
    const docTypes = SalaryBenefitUMRYear.filter((item: any) => {
      return item.value === event;
    });

    setYearUmr(docTypes[0].text);
  };

  const handleSearchChangeUMR = useCallback(
    (data) => {
      dispatch(
        DedicatedResourcesActions.requestDropdownSalaryBenefitUmr(data, yearUmr)
      );
    },
    [dispatch, yearUmr]
  );

  const resultRenderer = ({
    image,
    valueData,
    textData,
    description,
    flag,
    id,
  }) => {
    return (
      <div
        key={id}
        className="content"
        style={{
          backgroundColor: flag === "1" ? "rgba(255, 248, 54, 0.5)" : "",
        }}
      >
        <div className="price">{valueData}</div>
        <div className="title"> {textData}</div>
      </div>
    );
  };

  const onResultSelectUMR = (data: any) => {
    setRegionUMR(data.result.text);
    setRangeUMR(data.result.value);
  };

  const handleSubmit = (values?: any) => {
    const newValues = new SalaryBenefitModel({});

    newValues.salaryID =
      props.rowData?.salaryID > 0 ? props.rowData?.salaryID : 0;
    newValues.contractID =
      props.type === "Add"
        ? props.contractID
        : props.flag === "BulkUpdate"
        ? JSON.parse(localStorage.getItem("EmployeeID"))
        : props.rowData.contractID;
    newValues.salaryType = SalaryBenefitType;
    newValues.salaryDesc = SalaryBenefitDesc;
    newValues.salaryTypeStr = SalaryBenefitTypeStr;
    newValues.salaryDescStr = SalaryBenefitDescStr;
    newValues.currentAmount = currentSalary;
    newValues.newAmount = newSalary;
    newValues.increase = rasio;
    newValues.remark = values.remark;
    newValues.userLoginID = currentUser.employeeID;

    if (props.flag === "BulkUpdate" && props.type === "Add") {
      // var condition = false;
      // const CheckingDesc = ListSalaryBenefit.rows?.map((item) => {
      //   if (item.salaryDescStr === SalaryBenefitDescStr) {
      //     condition = true;
      //   }
      // });

      // if (condition) {
      //   dispatch(
      //     ToastsAction.add(
      //       `SalaryBenefit Desc ${SalaryBenefitDescStr} Already Available`,
      //       ToastStatusEnum.Warning
      //     )
      //   );
      // } else {
      const newState = props.DataEmployeeBulkUpdate.map((obj, index) => {
        props.setDataSalaryBenefit((oldArray) => [
          ...oldArray,
          {
            BulkSalaryID: Math.floor(Math.random() * 999999999),
            salaryID: props.rowData?.salaryID > 0 ? props.rowData?.salaryID : 0,
            contractID: obj.contractID,
            salaryType: SalaryBenefitType,
            salaryTypeStr: SalaryBenefitTypeStr,
            salaryDescStr: SalaryBenefitDescStr,
            salaryDesc: SalaryBenefitDesc,
            currentAmount: values.currentAmount,
            newAmount: newSalary,
            increase: rasio,
            remark: values.remark,
            userLoginID: obj.employeeID,
            isSave: 1,
          },
        ]);
      });

      //Temp Show UI Table BulkUpdate
      props.setTempSalary((oldArray) => [
        ...oldArray,
        {
          BulkSalaryID: Math.floor(Math.random() * 999999999),
          salaryID: props.rowData?.salaryID > 0 ? props.rowData?.salaryID : 0,
          contractID: props.DataEmployeeBulkUpdate[0]?.contractID,
          salaryType: SalaryBenefitType,
          salaryTypeStr: SalaryBenefitTypeStr,
          salaryDescStr: SalaryBenefitDescStr,
          salaryDesc: SalaryBenefitDesc,
          currentAmount: values.currentAmount,
          newAmount: newSalary,
          increase: rasio,
          remark: values.remark,
          userLoginID: props.DataEmployeeBulkUpdate[0].employeeID,
          isSave: 1,
        },
      ]);

      if (SalaryBenefitDescStr === "Gaji Pokok") {
        localStorage.setItem("NewGP", JSON.stringify(newSalary));
      }
      onClose();
      // }
    } else if (props.flag === "BulkUpdate" && props.type === "Edit") {
      const newState = props.DataSalaryBenefit?.map((obj) => {
        if (obj.salaryDesc === props.rowData.salaryDesc) {
          return {
            ...obj,
            salaryType: SalaryBenefitType,
            salaryDesc: SalaryBenefitDesc,
            currentAmount:
              values.currentAmount > 0 ? values.currentAmount : currentSalary,
            newAmount: values.newAmount > 0 ? values.newAmount : newSalary,
            notes: values.remark ? values.remark : notes,
            salaryTypeStr: SalaryBenefitTypeStr,
            salaryDescStr: SalaryBenefitDescStr,
            increase: rasio
          };
        }

        return obj;
      });
      props.setDataSalaryBenefit(newState);

      const newStateUI = props.tempSalary?.map((obj) => {
        if (obj.salaryDesc === props.rowData.salaryDesc) {
          //Temp Show UI Table BulkUpdate
          return {
            ...obj,
            salaryType: SalaryBenefitType,
            salaryDesc: SalaryBenefitDesc,
            currentAmount:
              values.currentAmount > 0 ? values.currentAmount : currentSalary,
            newAmount: values.newAmount > 0 ? values.newAmount : newSalary,
            notes: values.remark ? values.remark : notes,
            salaryTypeStr: SalaryBenefitTypeStr,
            salaryDescStr: SalaryBenefitDescStr,
            increase: rasio
          };
        }

        return obj;
      });
      props.setTempSalary(newStateUI);

      if (SalaryBenefitDescStr === "Gaji Pokok") {
        localStorage.setItem("NewGP", JSON.stringify(newSalary));
      }
      onClose();
    } else if (props.type === "Edit" && +props.rowData.salaryID > 0) {
      var condition = false;
      const CheckingDesc = ListSalaryBenefit.rows?.map((item) => {
        if (item.salaryDescStr === SalaryBenefitDescStr) {
          condition = true;
        }
      });

      if (condition) {
        dispatch(
          ToastsAction.add(
            `SalaryBenefit Desc ${SalaryBenefitDescStr} Already Available`,
            ToastStatusEnum.Warning
          )
        );
      }
      if (!condition) {
        dispatch(
          DedicatedResourcesActions.requestPutSalaryBenefit(newValues)
        ).then(() => {
          onClose();
        });
      }
    } else {
      var condition = false;
      const CheckingDesc = ListSalaryBenefit.rows?.map((item) => {
        if (item.salaryDescStr === SalaryBenefitDescStr) {
          condition = true;
        }
      });

      if (condition) {
        dispatch(
          ToastsAction.add(
            `SalaryBenefit Desc ${SalaryBenefitDescStr} Already Available`,
            ToastStatusEnum.Warning
          )
        );
      }
      if (!condition) {
        dispatch(
          DedicatedResourcesActions.requestpostSalaryBenefit(newValues)
        ).then(() => {
          onClose();
        });
      }
    }
  };

  useEffect(() => {
    if (props.flag === "BulkUpdate" && props.type === "Add") {
      dispatch(
        DedicatedResourcesActions.requestSalaryBenefit(
          props.DataEmployeeBulkUpdate[0]?.contractID,
          1,
          20
        )
      );
    }

    dispatch(DedicatedResourcesActions.requestDropdownSalaryBenefitType());
    dispatch(DedicatedResourcesActions.requestDropdownSalaryBenefitUmrYear());

    setCurrentSalary(parseInt(CurrentBenefitSalary.text));
  }, [CurrentBenefitSalary.text]);

  useLayoutEffect(() => {
    return () => {
      dispatch(
        DedicatedResourcesActions.requestGetSalaryBenefitById(
          SalaryBenefitByID.salaryID
        )
      );
    };
  }, []);

  // useEffect(() => {
  //     if (props.type === "Edit" && props.rowData.salaryID > 0) {
  //         dispatch(DedicatedResourcesActions.requestGetSalaryBenefitById(props.rowData.salaryID))
  //         setCurrentSalary(parseInt(CurrentBenefitSalary.text))
  //     }
  // }, [CurrentBenefitSalary.text])

  useEffect(() => {
    if (props.type === "Edit" && props.rowData.salaryID > 0) {
      dispatch(
        DedicatedResourcesActions.requestGetSalaryBenefitById(
          props.rowData.salaryID
        )
      );
      dispatch(DedicatedResourcesActions.requestDropdownSalaryBenefitType());
      dispatch(
        DedicatedResourcesActions.requestDropdownSalaryBenefitDesc(
          parseInt(props.rowData?.salaryType)
        )
      );
      // dispatch(DedicatedResourcesActions.requestCurrentSalary(SalaryBenefitByID?.contractID))
      setCurrentSalary(SalaryBenefitByID.currentAmount);
      setNewSalary(SalaryBenefitByID.newAmount);
      setRasio(SalaryBenefitByID.increase);
      setSalaryBenefitDesc(SalaryBenefitByID.salaryDesc);
      setSalaryBenefitType(SalaryBenefitByID.salaryType);
    }

    if (props.type === "Edit" && props.flag === "BulkUpdate") {
      setCurrentSalary(props.rowData?.currentAmount);
      setNotes(props.rowData?.notes);
      setSalaryBenefitType(props.rowData?.salaryType);
      setSalaryBenefitDesc(props.rowData?.salaryDesc);
      setSalaryBenefitTypeStr(props.rowData?.salaryTypeStr);
      setSalaryBenefitDescStr(props.rowData?.salaryDescStr);
      setRasio(props.rowData?.increase);
      setNewSalary(props.rowData?.newAmount)
    }
  }, [
    SalaryBenefitByID.salaryType,
    SalaryBenefitByID.newAmount,
    SalaryBenefitByID.currentAmount,
    SalaryBenefitByID.increase,
    SalaryBenefitByID.salaryDesc,
    SalaryBenefitByID.salaryType,
    props.rowData
  ]);

  const [mandatory, setMandatory] = useState({
    salaryType: false,
    salaryDesc: false,
    currentAmount: false,
    newAmount: false,
    increase: false,
  });

  // const onChangeCurrentAmount = (event: any) => {
  //     setCurrentSalary(event)
  //     let selisih =  newSalary - event
  //     let rasio = selisih / event
  //     setRasio(rasio * 100)
  // };
  
  const onChangeCurrentAmount = (event: any) => {
    setCurrentSalary(event);
  };

  const onChangeNewAmount = (event: any) => {
    setNewSalary(event);
    setFlagNewSalary(0);
    if (event > currentSalary && flagNewSalary === 0) {
      let selisih = event - currentSalary;
      let rasio = (selisih / currentSalary) * 100;
      setRasio(rasio);
    }
  };

  const onChangeRasio = 
  useCallback(
    (data) => {
      setRasio(data);
      if (newSalary > currentSalary) {
        if (flagNewSalary === 1) {
          let newAmount = (currentSalary * data) / 100 + currentSalary;
          setNewSalary(newAmount);
        }
        setFlagNewSalary(1);
      } else if (data > 0) {
        let newAmount = (currentSalary * data) / 100 + currentSalary;
        setNewSalary(newAmount);
      }
    },
    [rasio]
  );
  
   
  return (
    <Fragment>
      <Card.Header>{props.type} Salary & Benefit Data</Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          validate={validate}
          onSubmit={(values: SalaryBenefitModel) => handleSubmit(values)}
          initialValues={
            props.flag === "BulkUpdate" ? props.rowData : SalaryBenefitByID
          }
          render={({ handleSubmit, invalid, pristine }) => (
            // loading={isRequesting}
            <Form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="salaryType"
                      component={SelectInput}
                      options={SalaryBenefitTypeDropDown}
                      placeholder="e.g.Gaji .."
                      labelName="Type"
                      onChanged={onChangeSalaryBenefitType}
                      mandatory={mandatory.salaryType}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="salaryDesc"
                      component={SelectInput}
                      options={SalaryBenefitDescDropDown}
                      placeholder="e.g.Gaji Pokok .."
                      labelName="Description"
                      onChanged={onChangeSalaryBenefitDesc}
                      mandatory={mandatory.salaryDesc}
                    />
                  </Grid.Column>
                </Grid.Row>

                <div
                  style={{
                    backgroundColor: "#E1E1E1",
                    width: "100%",
                    padding: "20px",
                    borderRadius: "5px",
                  }}
                >
                  {/* <Grid.Row className="FullGrid767"> */}
                  <Grid.Column verticalAlign="top">
                    <h3>UMR Reference</h3>
                  </Grid.Column>
                  {/* </Grid.Row> */}
                  <Grid style={{ marginTop: "10px" }}>
                    <Grid.Row columns={3}>
                      <Grid.Column
                        mobile={8}
                        tablet={8}
                        computer={8}
                        className="FullGrid767"
                      >
                        <Field
                          name="Year"
                          component={SelectInput}
                          options={SalaryBenefitUMRYear}
                          placeholder="e.g.Gaji .."
                          labelName="Year"
                          onChanged={onChangeSalaryBenefitUmrYear}
                        />
                      </Grid.Column>
                      <Grid.Column
                        style={{
                          paddingRight: "0px",
                          marginTop: "20px !important",
                        }}
                        mobile={4}
                        tablet={4}
                        computer={4}
                      >
                        <Field
                          name="UMR"
                          component={SearchInput}
                          handleSearchChange={handleSearchChangeUMR}
                          onResultSelect={onResultSelectUMR}
                          results={SalaryBenefitUMR}
                          resultRenderer={resultRenderer}
                          placeholder="e.g.Gaji Pokok .."
                          labelName="Region"
                          values={RegionUMR}
                          // onChanged={onChangeDocument}
                        />
                      </Grid.Column>
                      <Grid.Column
                        textAlign="right"
                        mobile={4}
                        tablet={4}
                        computer={4}
                        verticalAlign={"top"}
                        className="TotalCreditInfoSalary"
                      >
                        <div>
                          <p>
                            Rp.
                            {parseInt(RangeUMR) > 0
                              ? parseInt(RangeUMR).toLocaleString()
                              : 0}
                          </p>
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>

                <Grid.Row columns={4}>
                  <Grid.Column
                    width={6}
                    mobile={8}
                    tablet={4}
                    computer={5}
                    className="FullGrid767"
                  >
                    <Field
                      name="currentAmount"
                      component={NumberInput}
                      placeholder="e.g.99.000.00.."
                      labelName="Current Amount"
                      mandatory={mandatory.currentAmount}
                      values={currentSalary}
                      thousandSeparator={true}
                      onChange={onChangeCurrentAmount}
                    />
                  </Grid.Column>
                  <Grid.Column
                    width={6}
                    mobile={8}
                    tablet={4}
                    computer={5}
                    className="FullGrid767"
                  >
                    <Field
                      name="newAmount"
                      component={NumberInput}
                      placeholder="e.g.99.000.00.."
                      labelName="New Amount"
                      mandatory={mandatory.newAmount}
                      values={newSalary}
                      thousandSeparator={true}
                      disabled={currentSalary > 0 ? false : true}
                      onChange={onChangeNewAmount}
                    />
                  </Grid.Column>
                  <Grid.Column
                    width={6}
                    mobile={8}
                    tablet={4}
                    computer={4}
                    style={{
                      paddingRight: "0px",
                      marginTop: "20px !important",
                    }}
                  >
                    <Field
                      name="increase"
                      component={NumberInput}
                      placeholder="e.g.99.000.00.."
                      labelName="Type if any increase"
                      // mandatory={mandatory.increase}
                      disabled={currentSalary > 0 ? false : true}
                      values={rasio?.toFixed(2)}
                      thousandSeparator={true}
                      onChange={onChangeRasio}
                    />
                  </Grid.Column>
                  <Grid.Column
                    width={2}
                    mobile={8}
                    tablet={4}
                    computer={2}
                    verticalAlign={"top"}
                    className="TotalCreditInfoSalary"
                  >
                    <div>
                      <p>%</p>
                    </div>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row verticalAlign="top">
                  <Grid.Column
                    mobile={16}
                    tablet={16}
                    computer={16}
                    className="FullGrid767"
                  >
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
                      color="blue"
                      floated="right"
                      content="Submit"
                      disabled={
                        pristine ||
                        !SalaryBenefitType ||
                        !SalaryBenefitDesc ||
                        !currentSalary ||
                        !newSalary
                      }
                    />
                    <Button
                      type="button"
                      floated="right"
                      content="Cancel"
                      onClick={onClose}
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

export default SalaryBenefitForm;
