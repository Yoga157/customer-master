import React, { useEffect, useState, useCallback, Fragment } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Grid, Divider, Card } from "semantic-ui-react";
import {
  TextInput,
  SelectInput,
  Button,
  NumberInput,
  SearchInput,
  RichTextEditor,
  SearchInputList,
  RadioButton,
} from "views/components/UI";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IStore from "models/IStore";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { combineValidators, isRequired } from "revalidate";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import AWSBillingInsertUsageDetail from "stores/aws-billing/models/AWSBillingInsertUsageDetail";
import moment from "moment";
import * as AWSBillingActions from "stores/aws-billing/AWSBillingActions";
import {
  selectDropDownSearchCBV,
  selectDropDownSearchLPR,
  selectDropDownPIC,
  selectVoucherAmount,
  selectNeccesity,
  selectDropDownSearchSO,
  selectAWSBillingById,
} from "selectors/aws-billing/AWSBillingServiceSelector";
import LoadingIndicator from "../../../../components/loading-indicator/LoadingIndicator";
import * as EmployeeActions from "stores/employee/EmployeeActions";
import { selectEmployeeSearch } from "selectors/select-options/EmployeeSelector";
import "./UsageCBVServiceForm.scss";
import AWSBillingByIdModel from "stores/aws-billing/models/AWSBillingByIdModel";

interface IProps {
  BillingID: number;
  type: string;
  pageSize: number;
  activePage: number;
}

const validate = combineValidators({
  neccesity: isRequired("Neccesity"),
  usageAmount: isRequired("Usage Amount"),
  remainingAmount: isRequired("Remaining Amount"),
});

const UsageCBVServiceForm: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const { BillingID, type, activePage, pageSize } = props;

  const onClose = () => {
    dispatch(ModalSecondLevelActions.CLOSE());
  };

  const [typeRadioButton, setTypeRadioButton] = useState("CBVNumber");
  const [cbvNumber, setCbvNumber] = useState("");
  const [lprNumber, setLprNumber] = useState("");
  const [so, setSo] = useState("");
  const [ErrorSearch, setErrorSearch] = useState(false);
  const [PIC, setPIC] = useState("");
  const [PICValue, setPICValue] = useState(0);
  const [neccesity, setNeccesity] = useState("");
  const [voucherAmount, setVoucherAmount] = useState(0);
  const [usedAmount, setUsedAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  const onSubmitHandler = (values: any) => {
    const now = moment();
    const newValues = new AWSBillingInsertUsageDetail({});

    let resourcesId = "";
    values.resources &&
      values.resources.map(
        (arrValues: any) =>
          (resourcesId =
            resourcesId.length > 0
              ? (resourcesId += "," + arrValues.value.toString())
              : arrValues.value.toString())
      );
    localStorage.setItem("BillingID", JSON.stringify(BillingID));
    localStorage.setItem("activePage", JSON.stringify(activePage));
    localStorage.setItem("pageSize", JSON.stringify(pageSize));
    newValues.usageId = 0;
    newValues.billingIdH = BillingID;
    newValues.creditId = 0;
    newValues.lprNumber = lprNumber;
    newValues.cbvNumber = cbvNumber;
    newValues.so = so ? Number(so) : values.so;
    newValues.funnelId = 0;
    newValues.usageAmount = values.usageAmount;
    newValues.necessity = neccesity;
    newValues.resources = resourcesId;
    newValues.notes = values.notes;
    newValues.picName = PICValue;
    newValues.createDate = moment(now).format("yyyy-MM-DD");
    newValues.createUserID = currentUser.employeeID;
    newValues.modifyDate = moment(now).format("yyyy-MM-DD");
    newValues.modifyUserID = currentUser.employeeID;
    // console.log("newValues", newValues);
    dispatch(AWSBillingActions.InsertUsageDetail(newValues));
    dispatch(AWSBillingActions.GetDetailVoucherAmount("", 0));
    onClose();
  };

  const isLoadingSearch: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      AWSBillingActions.REQUEST_DROPDOWN_SEARCH_CBV,
      AWSBillingActions.REQUEST_DROPDOWN_SEARCH_LPR,
      AWSBillingActions.REQUEST_DROPDOWN_SEARCH_SO,
    ])
  );
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      AWSBillingActions.REQUEST_DROPDOWN_PIC,
      AWSBillingActions.REQUEST_VOUCHER_AMOUNT_BY_PIC_NAME,
      AWSBillingActions.REQUEST_NECCESITY,
    ])
  );

  const CBVStoreSearch = useSelector((state: IStore) =>
    selectDropDownSearchCBV(state)
  );
  const LPRStoreSearch = useSelector((state: IStore) =>
    selectDropDownSearchLPR(state)
  );
  const SOStoreSearch = useSelector((state: IStore) =>
    selectDropDownSearchSO(state)
  );
  const dataByIdAwsBilling: AWSBillingByIdModel = useSelector((state: IStore) =>
    selectAWSBillingById(state)
  );

  let PICStore = useSelector((state: IStore) => selectDropDownPIC(state));
  const VoucherAmountTotal = useSelector((state: IStore) =>
    selectVoucherAmount(state)
  );
  const dataNeccesity = useSelector((state: IStore) => selectNeccesity(state));
  const EmployeStoreSearch = useSelector((state: IStore) =>
    selectEmployeeSearch(state)
  );
  const [alertPress, setAlertPress] = useState(false);

  useEffect(() => {
    dispatch(AWSBillingActions.requestNeccesity());
    dispatch(AWSBillingActions.requestAWSBillingById(BillingID));

    if (dataByIdAwsBilling.outstandingBilling) {
      setUsedAmount(dataByIdAwsBilling.outstandingBilling);
    }
  }, [dataByIdAwsBilling.outstandingBilling]);

  useEffect(() => {
    if (typeRadioButton === "LPRNumber") {
      setCbvNumber("");
      setSo("");
      setPIC("");
      setVoucherAmount(0);
      dispatch(AWSBillingActions.DropDownPIC(currentUser.employeeID, ""));
      dispatch(AWSBillingActions.GetDetailVoucherAmount("", 0));
    } else {
      setLprNumber("");
      setPIC("");
      setVoucherAmount(0);
    }

    if (VoucherAmountTotal.value != 0) {
      setVoucherAmount(VoucherAmountTotal.value);
    }
  }, [typeRadioButton, VoucherAmountTotal.value, dispatch]);

  const [validasiAmount, setValidasiAmount] = useState(false);
  const onVoucherAmount = (event: any) => {
    setVoucherAmount(event);
    if (usedAmount <= event) {
      setValidasiAmount(true);
    } else if (usedAmount >= event) {
      setValidasiAmount(false);
    }
    setRemainingAmount(event - usedAmount);
  };
  
  const onUsageAmount = (event: any) => {
    if (typeRadioButton === "SO") {
      let angka = event;
      if (event === undefined) angka = 0;
      setUsedAmount(event);
      if (dataByIdAwsBilling.outstandingBilling >= event) {
        setValidasiAmount(true);
      } else if (dataByIdAwsBilling.outstandingBilling <= event) {
        setValidasiAmount(false);
      }
    } else if (typeRadioButton === "CBVNumber") {
      let angka = event;
      let comparison = voucherAmount <= dataByIdAwsBilling.outstandingBilling ? voucherAmount : dataByIdAwsBilling.outstandingBilling;
    
      if (event === undefined) angka = 0;
      setUsedAmount(event);
      if (
        comparison >= event
      ) {
        setValidasiAmount(true);
      } else if (
        comparison <= event
      ) {
        setValidasiAmount(false);
      }
      setRemainingAmount(voucherAmount - angka);
    } else {
      let angka = event;
      if (event === undefined) angka = 0;
      setUsedAmount(event);
      if (voucherAmount >= event) {
        setValidasiAmount(true);
      } else if (voucherAmount <= event) {
        setValidasiAmount(false);
      }
      setRemainingAmount(voucherAmount - angka);
    }
  };

  const handleSearchChangeEmployee = useCallback(
    (e, data) => {
      if (data.value.trim().length >= 2) {
        dispatch(EmployeeActions.searchALL(data.value.trim(), ""));
      }
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (data) => {
      if (typeRadioButton === "CBVNumber") {
        setCbvNumber(data);
        setLprNumber("");
        setSo("");
        CBVStoreSearch &&
          CBVStoreSearch.map((item: any) => {
            if (item.text == data) {
              setErrorSearch(true);
            } else if (item.text !== data) {
              setErrorSearch(false);
            }
          });
      } else if (typeRadioButton === "LPRNumber") {
        setLprNumber(data);
        setCbvNumber("");
        setSo("");
        LPRStoreSearch &&
          LPRStoreSearch.map((item: any) => {
            if (item.textData === lprNumber) {
              setErrorSearch(true);
            } else if (lprNumber !== data) {
              setErrorSearch(false);
            }
          });
      } else if (typeRadioButton === "SO") {
        setSo(data);
        setLprNumber("");
        setCbvNumber("");
        SOStoreSearch &&
          SOStoreSearch.map((item: any) => {
            if (item.text === so) {
              setErrorSearch(true);
            } else if (so !== data) {
              setErrorSearch(false);
            }
          });
      }
    },
    [
      dispatch,
      LPRStoreSearch,
      CBVStoreSearch,
      SOStoreSearch,
      cbvNumber,
      lprNumber,
      so,
      ErrorSearch,
    ]
  );

  const onResultSelect = (data: any) => {
    if (typeRadioButton === "CBVNumber") {
      setCbvNumber(data.result.text);
      setLprNumber("");
      setSo("");
      setAlertPress(true);
      CBVStoreSearch &&
        CBVStoreSearch.map((item: any) => {
          if (item.text === data.result.text) {
            setErrorSearch(true);
          }
        });
      dispatch(
        AWSBillingActions.DropDownPIC(currentUser.employeeID, data.result.text)
      );
    }

    if (typeRadioButton === "SO") {
      setSo(data.result.text);
      setLprNumber("");
      setCbvNumber("");
      onChangePIC(data.result.value);
      setAlertPress(true);
      SOStoreSearch &&
        SOStoreSearch.map((item: any) => {
          if (item.text === data.result.text) {
            setErrorSearch(true);
          }
        });
    }

    if (typeRadioButton === "LPRNumber") {
      setLprNumber(data.result.textData);
      setVoucherAmount(0);
      setCbvNumber("");
      setSo("");
      onChangePIC(data.result.valueData);
      setAlertPress(true);
      LPRStoreSearch &&
        LPRStoreSearch.map((item: any) => {
          if (item.textData === data.result.textData) {
            setErrorSearch(true);
          }
        });
    }
  };

  const resultRenderer = ({
    sourceCustomerId,
    voucherNo,
    value,
    valueData,
    textData,
    text,
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
        <div className="price">
          {voucherNo ? voucherNo : value ? value : valueData}
        </div>
        <div className="title">
          {" "}
          {sourceCustomerId ? sourceCustomerId : text ? text : textData}
        </div>
      </div>
    );
  };

  const onChangePIC = (event: any) => {
    if (typeRadioButton === "CBVNumber") {
      const docTypes = PICStore.filter((item: any) => {
        return item.value === event;
      });

      setPIC(docTypes[0].text);
      setPICValue(parseInt(event));
      dispatch(AWSBillingActions.GetDetailVoucherAmount(cbvNumber, event));
    } else if (typeRadioButton === "LPRNumber") {
      const docTypes = LPRStoreSearch.filter((item: any) => {
        if (item.valueData === event) {
          setPIC(item.valueData);
        }
      });
    } else {
      const docTypes = SOStoreSearch.filter((item: any) => {
        if (item.value === event) {
          setPIC(item.value);
        }
      });
    }
  };

  const onChangeNeccesity = (event: any) => {
    const docTypes = dataNeccesity.filter((item: any) => {
      if (item.value === event) {
        setNeccesity(item.text);
      }
    });
  };

  useEffect(() => {
    if (alertPress === true) {
      const listener = (event) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          event.preventDefault();
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    }
  }, [alertPress]);
  // console.log("Validasi", ErrorSearch, !validasiAmount, neccesity, usedAmount);

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Card.Header className="ModalHeader">{type} Usage CBV</Card.Header>
        <Divider className="DividerHeader"></Divider>
        <FinalForm
          validate={validate}
          onSubmit={(values: any) => onSubmitHandler(values)}
          // initialValues={}
          render={({ handleSubmit, invalid, pristine }) => (
            // loading={}
            <Form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Row
                  textAlign="center"
                  columns={5}
                  style={{
                    backgroundColor: "#EBEBEB",
                    borderRadius: "10px",
                    top: "10px",
                  }}
                >
                  <Grid.Column mobile={16} tablet={5} computer={5}>
                    <Field
                      className="text-primary"
                      name="typeNumber"
                      component={RadioButton}
                      label="CBV Number"
                      mandatory={false}
                      thousandSeparator={true}
                      checked={typeRadioButton === "CBVNumber"}
                      onChange={() => {
                        setTypeRadioButton("CBVNumber");
                        setAlertPress(false);
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={5} computer={5}>
                    <Field
                      className="text-primary"
                      name="typeNumber"
                      component={RadioButton}
                      label="LPR Number"
                      mandatory={false}
                      thousandSeparator={true}
                      checked={typeRadioButton === "LPRNumber"}
                      onChange={() => {
                        setTypeRadioButton("LPRNumber");
                        setAlertPress(false);
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={5} computer={5}>
                    <Field
                      className="text-primary"
                      name="SO"
                      component={RadioButton}
                      label="SO"
                      mandatory={false}
                      thousandSeparator={true}
                      checked={typeRadioButton === "SO"}
                      onChange={() => {
                        setTypeRadioButton("SO");
                        setAlertPress(false);
                        setValidasiAmount(true);
                      }}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row
                  className={`ViewLabel ${
                    typeRadioButton === "cbvNumber" ? "ReadOnly" : null
                  }`}
                  style={{ top: "10px" }}
                  columns={2}
                >
                  <Grid.Column mobile={16} tablet={10} computer={10}>
                    <Field
                      name={
                        typeRadioButton === "CBVNumber"
                          ? "cbvNumber"
                          : typeRadioButton === "SO"
                          ? "so"
                          : "lprNumber"
                      }
                      component={SearchInput}
                      placeholder="e.g.PT. Customer .."
                      loading={isLoadingSearch}
                      labelName="Search By SO,CBV or LPR Number & Press Enter"
                      handleSearchChange={handleSearchChange}
                      onResultSelect={onResultSelect}
                      results={
                        typeRadioButton === "CBVNumber"
                          ? CBVStoreSearch
                          : typeRadioButton === "SO"
                          ? SOStoreSearch
                          : LPRStoreSearch
                      }
                      // mandatory={mandatory.sEmployeeName}
                      values={
                        typeRadioButton === "CBVNumber"
                          ? cbvNumber
                          : typeRadioButton === "SO"
                          ? so
                          : lprNumber
                      }
                      resultRenderer={resultRenderer}
                      onKeyPress={(event) => {
                        if (event.charCode == 13) {
                          if (typeRadioButton === "CBVNumber") {
                            dispatch(
                              AWSBillingActions.DropDownSearchCBV(
                                currentUser.employeeID,
                                event.target.value,
                                0
                              )
                            );
                          } else if (typeRadioButton === "LPRNumber") {
                            dispatch(
                              AWSBillingActions.DropDownSearchLPR(
                                currentUser.employeeID,
                                event.target.value
                              )
                            );
                          } else if (typeRadioButton === "SO") {
                            dispatch(
                              AWSBillingActions.DropDownSearchSO(
                                currentUser.employeeID,
                                event.target.value
                              )
                            );
                          }
                        }
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="BtmFormNote">
                        Press enter to see the results
                      </p>
                    </div>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={6} computer={6}>
                    <Field
                      name="voucherAmount"
                      component={NumberInput}
                      thousandSeparator={true}
                      // options={subSoftwareTypeStore}
                      mandatory={typeRadioButton === "SO" ? true : false}
                      disabled={
                        typeRadioButton === "CBVNumber" ||
                        typeRadioButton === "SO"
                          ? true
                          : false
                      }
                      values={
                        typeRadioButton === "CBVNumber" ? voucherAmount : 0
                      }
                      placeholder="e.g.99.000.00.."
                      labelName="Vocuher Amount"
                      onChange={onVoucherAmount}
                    />
                    {/* <Label style={{padding: 0,backgroundColor:"white",fontSize: "20px",fontWeight:"400"}}>Voucher Amount <Label style={{color:'red',backgroundColor:'white',padding: 0}} attached={"bottom"}>*</Label></Label> */}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column mobile={16} tablet={10} computer={10}>
                    <Field
                      name="PIC"
                      component={
                        typeRadioButton === "CBVNumber"
                          ? SelectInput
                          : TextInput
                      }
                      placeholder="-- Select PIC --"
                      labelName="PIC"
                      mandatory={false}
                      disabled={typeRadioButton === "CBVNumber" ? false : true}
                      values={typeRadioButton === "CBVNumber" ? "" : PIC}
                      options={PICStore}
                      onChanged={onChangePIC}
                    />
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={6} computer={6}>
                    <Field
                      name="neccesity"
                      component={SelectInput}
                      options={dataNeccesity}
                      onChanged={onChangeNeccesity}
                      mandatory={false}
                      // disabled={true}
                      placeholder="e.g.Customer.."
                      labelName="Neccesity"
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Field
                      name="resources"
                      component={SearchInputList}
                      placeholder="e.g.Employee Name"
                      labelName="Resources"
                      handleSearchChange={handleSearchChangeEmployee}
                      results={EmployeStoreSearch}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row
                  className={`ViewLabel ${
                    typeRadioButton === "CBVNumber" ? "ReadOnly" : null
                  }`}
                >
                  <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Field
                      name="usageAmount"
                      component={NumberInput}
                      placeholder="e.g.99.000.00.."
                      labelName="Used Amount"
                      mandatory={false}
                      thousandSeparator={true}
                      onChange={onUsageAmount}
                      values={usedAmount}
                    />
                  </Grid.Column>
                  {typeRadioButton === "SO" ? null : (
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                      <Field
                        name="remainingAmount"
                        component={NumberInput}
                        placeholder="e.g.99.000.00.."
                        labelName="Remaining Amount"
                        disabled={true}
                        mandatory={false}
                        // values={remainingAmount}
                        values={remainingAmount === 0 ? "0" : remainingAmount}
                        thousandSeparator={true}
                        //onChange={onChangeNilai}
                      />
                    </Grid.Column>
                  )}
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width={16}>
                    <Field
                      name="notes"
                      component={RichTextEditor}
                      placeholder="e.g.Notes.."
                      labelName="Notes"
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Button
                      color="blue"
                      floated="right"
                      content="Submit"
                      disabled={
                        pristine ||
                        invalid ||
                        !neccesity ||
                        !validasiAmount ||
                        !ErrorSearch ||
                        !usedAmount
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

export default UsageCBVServiceForm;
