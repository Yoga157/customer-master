import React, { useState, useCallback, useEffect } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { History } from "history";
import {
  Form,
  Grid,
  Segment,
  Dropdown,
  Divider,
  Confirm,
  Header,
} from "semantic-ui-react";
import { Button, TextInput, SearchInput } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import IStore from "models/IStore";
import { combineValidators, isRequired } from "revalidate";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import RouteEnum from "constants/RouteEnum";
import ProjectInfo from "../../form-edit/main-content/project-info/ProjectInfo";
import SalaryAndBenefit from "../../form-edit/main-content/salary-and-benefit/SalaryAndBenefit";
import Deductions from "../../form-edit/main-content/deductions/Deductions";
import OtherAndBenefit from "../../form-edit/main-content/other-and-benefit/OtherAndBenefit";
import EmployeeBulk from "./EmployeeBulk/EmployeeBulk";
import * as DedicatedResourcesActions from "stores/dedicated-resources/DedicatedResourcesActions";
import {
  selectRenewalContractsBulkUpdate,
  selectSearchSOOI,
} from "selectors/dedicated-resources/DedicatedResourcesServiceSelector";
import DedicatedResourcesBulkUpdateModel from "stores/dedicated-resources/models/DedicatedResourcesBulkUpdate/DedicatedResourcesBulkUpdateModel";
import * as ToastsAction from "stores/toasts/ToastsAction";
import ToastStatusEnum from "constants/ToastStatusEnum";
// import { durationTypeOptions } from 'constants/durationTypeOptions';
import VerificationSubmit from "./VerificationSubmit/VerificitaionSubmit";
import ModalSizeEnum from "constants/ModalSizeEnum";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import IDedicatedResourceTable from "selectors/dedicated-resources/models/IDedicatedResourceTable";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import moment from 'moment';

interface LocationState {
  from?: {
    pathname?: string;
  };
  eventName?: string;
  customerName?: string;
  funnelOpportunityID?: number;
  eventDate?: string;
  funnelGenID?: number;
  typePage?: string;
  tab?: string;
}

interface IProps {
  history?: History;
}

const BulkUpdateForm: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const location = useLocation<LocationState>();
  const typePage = location?.state?.typePage;
  const funnelGenID = location?.state?.funnelGenID;
  const tab = location?.state?.tab;

  const dispatch: Dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);
  const SOOIProjectInfo = useSelector((state: IStore) =>
    selectSearchSOOI(state)
  );
  const [result, setResult] = useState({});
  const [DataEmployee, setDataEmployee] = useState([]);
  const [DataSalaryBenefit, setDataSalaryBenefit] = useState([]);
  const [DataDeductions, setDataDeductions] = useState([]);
  const [DataOtherBenefit, setDataOtherBenefit] = useState([]);
  const [SOOI, setSOOI] = useState("");
  const [totalGrossCurrAmount, setTotalGrossCurrAmount] = useState(0);
  const [totalGrossNewAmount, setTotalGrossNewAmount] = useState(0);
  const [pieceDeductions, setPieceDeductions] = useState(0);
  const [TakeHomePay, setTakeHomePay] = useState(0);
  const [so, setSo] = useState("");
  const [oi, setOi] = useState("");
  const [referToSO, setReferToSO] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectAlias, setProjectAlias] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectComplexity, setProjectComplexity] = useState("");
  const [estProjectDuration, setEstProjectDuration] = useState("");
  const [estProjectDurationType, setEstProjectDurationType] = useState("");
  const [buCost, setBuCost] = useState("");

  //Check Checkbox
  const [isCheck, setIsCheck] = useState([]);
  const [tempCheck, setTempCheck] = useState([]);

  const [employeeNameID, setEmployeeNameID] = useState("");
  const [employeeID, setEmployeeID] = useState("");

  //BulkUpdate Show UI Temporary
  const [tempDeductions, setTempDeductions] = useState([]);
  const [tempSalary, setTempSalary] = useState([]);

  const results: any = useSelector(
    (state: IStore) => state.dedicatedresources.resultActions
  );
  const RenewalContractsBulkUpdate: IDedicatedResourceTable = useSelector(
    (state: IStore) => selectRenewalContractsBulkUpdate(state)
  );

  const closeConfirm = () => {
    setOpenConfirm(false);
  };

  const onCloseHandler = () => {
    window.location.replace(RouteEnum.DedicatedResources);
  };

  useEffect(() => {

    let totalCurrAmount = tempSalary.reduce((val, nilaiSekarang) => {
      return val + nilaiSekarang.currentAmount;
    }, 0);
    setTotalGrossCurrAmount(totalCurrAmount);
    let totalNewAmount = tempSalary.reduce((val, nilaiSekarang) => {
      return val + nilaiSekarang.newAmount;
    }, 0);
    setTotalGrossNewAmount(totalNewAmount);

    let TotalPieceDeductions = tempDeductions.reduce((val, nilaiSekarang) => {
      return val + nilaiSekarang.amount;
    }, 0);
    setPieceDeductions(TotalPieceDeductions);

    if (totalGrossNewAmount > 0 && pieceDeductions > 0) {
      setTakeHomePay(totalGrossNewAmount - pieceDeductions);
    }
  }, [
    DataSalaryBenefit,
    DataDeductions,
    totalGrossNewAmount,
    pieceDeductions,
    DataDeductions[0]?.percentage,
  ]);

  useEffect(() => {
    localStorage.removeItem("EmployeeContractID");
  }, []);

  const okConfirm = () => {};

  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const [triggerDraft, setTriggerDraft] = useState(false);
  const [placment, setPlacment] = useState("");
  const [period, setPeriod] = useState("");
  
  const onSubmitHandler = (values: any) => {
    const newValues = new DedicatedResourcesBulkUpdateModel({});


    const newEmployeeContract = tempCheck?.map((obj) => {
        return {
            ...obj,
            placement: placment,
            newContractPeriod: parseInt(period),
            flagDraft: triggerDraft,
            newContractBeginDate: obj.newContractBeginDate && moment(obj.newContractBeginDate).format('dd/MM/yyyy'),
            newContractEndDate: obj.newContractEndDate && moment(obj.newContractEndDate).format('dd/MM/yyyy'),
            // lastContractBeginDate: obj.lastContractBeginDate && moment(obj.lastContractBeginDate).format('dd/MM/yyyy'),
            // lastContractEndDate: obj.lastContractEndDate && moment(obj.lastContractEndDate).format('dd/MM/yyyy'),
          };
    });

    var RenewalContractMatch = {
      salaryBenefit: DataSalaryBenefit,
      deduction: DataDeductions,
      otherBenefit: DataOtherBenefit,
      employeeContract: newEmployeeContract,
    };
 
    newValues.userLoginID = currentUser.employeeID;
    newValues.so = so;
    newValues.oi = oi;
    newValues.referToSO = referToSO;
    newValues.customerName = customerName;
    newValues.projectName = projectName;
    newValues.projectAlias = projectAlias;
    newValues.projectCategory = projectCategory;
    newValues.projectComplexity = projectComplexity;
    newValues.estProjectDuration = estProjectDuration;
    newValues.estProjectDurationType = estProjectDurationType;
    newValues.buCost = buCost;
    newValues.listRenewalContractDash = RenewalContractMatch;

    onPopupSideMenu(
      <VerificationSubmit
        triggerDraft={triggerDraft}
        setTriggerDraft={setTriggerDraft}
        newValues={newValues}
        setDataDeductions={setDataDeductions}
        setDataSalaryBenefit={setDataSalaryBenefit}
        setDataOtherBenefit={setDataOtherBenefit}
      />,
      ModalSizeEnum.Small
    );
  };

  useEffect(() => {
    if (results?.errorNumber == "0") {
      dispatch(ToastsAction.add(results?.message, ToastStatusEnum.Success));
      dispatch(DedicatedResourcesActions.removeResult());
    } else if (results?.bSuccess === false) {
      dispatch(ToastsAction.add(results?.message, ToastStatusEnum.Warning));
    }

    localStorage.removeItem("NewGP");
  }, [results]);

  useEffect(() => {
    dispatch(
      DedicatedResourcesActions.requestRenewalContractBulkUpdate(
        currentUser.employeeID,
        1,
        20
      )
    );
    dispatch(DedicatedResourcesActions.requestDropdownBuCost());
  }, []);

  useEffect(() => {
    if (RenewalContractsBulkUpdate.rows?.length > 0) {
      setDataEmployee(RenewalContractsBulkUpdate.rows);
      RenewalContractsBulkUpdate.rows.map((item) => {
        setIsCheck((oldArray) => [...oldArray, item.employeeID]);
        setTempCheck((oldArray) => [...oldArray, item])
      })
    
    }
  }, [RenewalContractsBulkUpdate]);

  const validate = combineValidators({
    placement: isRequired("placement"),
    newContractPeriod: isRequired("newContractPeriod"),
  });

  const isLoadingSOOI: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [DedicatedResourcesActions.REQUEST_GET_SEARCH_SOOI])
  );

  const handleSearchChangeSOOI = useCallback(
    (data) => {
    
      setSOOI(data);
      // dispatch(DedicatedResourcesActions.requestGetSearchSOOI(data, "SOOI"));
    },
    [dispatch, SOOIProjectInfo]
  );

  const onResultSelectSOOI = (data: any) => {
  
    setResult(data.result);
    setSo(data.result.so);
    setOi(data.result.oi);
    setReferToSO(data.result.referToSO);
    setCustomerName(data.result.customerName);
    setProjectName(data.result.projectName);
    setProjectAlias(data.result.projectAlias);
    setProjectCategory(data.result.projectCategory);
    setProjectComplexity(data.result.projectComplexity);
    setEstProjectDuration(data.result.estDurationProject);
    setEstProjectDurationType(data.result.estProjectDurationType);
    setBuCost(data.result.buCost);
  };

  const resultRenderer = ({ image, text, title, description, flag, id }) => {
    return (
      <div
        key={id}
        className="content"
        style={{
          backgroundColor: flag === "1" ? "rgba(255, 248, 54, 0.5)" : "",
        }}
      >
        <div className="price">{title}</div>
        <div className="title"> {text}</div>
      </div>
    );
  };

  const onPopupSideMenu = useCallback(
    (content: any, size: ModalSizeEnum): void => {
      dispatch(ModalAction.OPEN(content, size));
    },
    [dispatch]
  );

  const durationTypeOptions = [
    { key: "months", text: "Months", value: "months" },
  ];

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      DedicatedResourcesActions.REQUEST_RENEWAL_CONTRACT_BULK_UPDATE,
    ])
  );
    // console.log('SOOIProjectInfo',SOOIProjectInfo)
  return (
    <LoadingIndicator isActive={isRequesting}>
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        validate={validate}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Confirm
              open={openConfirm}
              content="This customer is also an End User ?"
              onCancel={closeConfirm}
              onConfirm={okConfirm}
              cancelButton="No"
              confirmButton="Yes"
              size="mini"
            />
            <Grid>
              {/* Yellow full grid 27022024 */}
              <Grid.Row className="pt-0">
                <Grid.Column className="FullNotif pt-0">
                  <Segment className="LightYellowNotif">
                    <Grid>
                      <Header as="h4">
                        Project Info
                      </Header>
                      <Grid.Row columns="equal">
                        <Grid.Column className="FullGrid767" width={8}>
                            <Field
                              name="so"
                              component={SearchInput}
                              placeholder="e.g.PT. Customer .."
                              loading={isLoadingSOOI}
                              labelName="SO/OI"
                              disabled={false}
                              mandatory={false}
                              handleSearchChange={handleSearchChangeSOOI}
                              onResultSelect={onResultSelectSOOI}
                              results={SOOIProjectInfo}
                              resultRenderer={resultRenderer}
                              onKeyPress={(event) => {
                                if (event.charCode === 13) {
                                  dispatch(DedicatedResourcesActions.requestGetSearchSOOI(SOOI, "SOOI"));
                                }
                              }}
                            />
                            <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <p className="BtmFormNote">Press enter to see the results</p>
                              </div>
                        </Grid.Column>
                        <Grid.Column className="FullGrid767" width={16}>
                          <ProjectInfo resultBulk={result} setBuCostBulk={setBuCost} type="bulk" />
                        </Grid.Column>

                      </Grid.Row>

                    </Grid>
                  </Segment>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={"equal"}>
                <Grid.Column className="FullGrid767 px-2">
                  <EmployeeBulk
                    setEmployeeNameID={setEmployeeNameID}
                    setEmployeeID={setEmployeeID}
                    DataEmployee={DataEmployee}
                    setDataEmployee={setDataEmployee}
                    isCheck={isCheck}
                    setIsCheck={setIsCheck}
                    tempCheck={tempCheck}
                    setTempCheck={setTempCheck}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={"equal"}>
                <Grid.Column className="FullGrid767 px-2">
                  <SalaryAndBenefit
                    // employeeNameID={employeeNameID}
                    // employeeID={employeeID}
                    flag={"BulkUpdate"}
                    setDataSalaryBenefit={setDataSalaryBenefit}
                    DataSalaryBenefit={DataSalaryBenefit}
                    DataEmployeeBulkUpdate={tempCheck}
                    totalGrossCurrAmount={totalGrossCurrAmount}
                    totalGrossNewAmount={totalGrossNewAmount}
                    isCheckBulk={isCheck}
                    tempSalary={tempSalary}
                    setTempSalary={setTempSalary}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={"equal"}>
                <Grid.Column className="FullGrid767 px-2">
                  <Deductions
                    DataDeductions={DataDeductions}
                    setDataDeductions={setDataDeductions}
                    flag="BulkUpdate"
                    pieceDeductions={pieceDeductions}
                    DataEmployeeBulkUpdate={tempCheck}
                    tempDeductions={tempDeductions}
                    setTempDeductions={setTempDeductions}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={"equal"}>
                <Grid.Column className="FullGrid767 px-2">
                  <OtherAndBenefit
                    DataOtherBenefit={DataOtherBenefit}
                    setDataOtherBenefit={setDataOtherBenefit}
                    flag="BulkUpdate"
                    DataEmployeeBulkUpdate={tempCheck}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={"equal"}>
                <Grid.Column className="FullGrid767 px-2">
                  <h3>Take Home Pay</h3>
                  <Grid>
                    <Grid.Row
                      columns={2}
                      style={{ marginLeft: "5px", marginRight: "5px" }}
                    >
                      <Grid.Column>
                        <h4>Total Take Home Pay</h4>
                      </Grid.Column>
                      <Grid.Column textAlign="right">
                        <h4>Rp. {TakeHomePay?.toLocaleString()}</h4>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Divider />
                  <h3>Contract Info</h3>
                  <Grid>
                    <Grid.Row
                      columns={2}
                      style={{ marginLeft: "5px", marginRight: "5px" }}
                    >
                      <Grid.Column
                        width={3}
                        mobile={16}
                        tablet={3}
                        computer={2}
                      >
                        <Field
                          name="placement"
                          component={TextInput}
                          placeholder="e.g.Your Placement"
                          labelName="Placement"
                          mandatory={false}
                          onChange={(value) => setPlacment(value)}
                        />
                      </Grid.Column>
                      <Grid.Column
                        mobile={16}
                        tablet={3}
                        computer={2}
                        width={3}
                      >
                        <Field
                          name="newContractPeriod"
                          component={TextInput}
                          disabled={false}
                          onChange={(value) => setPeriod(value)}
                          labeled={
                            <Dropdown
                              disabled={false}
                              options={durationTypeOptions}
                              // onChange={(value) => setPeriod(value)}
                              value={"months"}
                            />
                          }
                          type="number"
                          min={true}
                          // onChange={onDuration} //Hendz - 2022-02-23 untuk add cof karena membutuhkan project duration
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          // values={estDurationProject}
                          labelPosition="right"
                          placeholder="e.g.90.."
                          labelName="Periode"
                          mandatory={false}
                          // toolTipPosition="top center"
                          // toolTipContents="Fill this estimate project duration, if you have
                          //                     warranty to the customer (Not Vendor Warranty)"
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column className="px-2">
                  <Button
                    color="blue"
                    floated="right"
                    content="Save as Draft"
                    // type="button"
                    disabled={
                      invalid ||
                      !result ||
                      DataEmployee.length === 0 ||
                      TakeHomePay === 0 ||
                      !buCost
                    }
                    icon="file alternate outline"
                    onClick={() => {
                      // onPopupSideMenu(<VerificationSubmit setTriggerDraft={setTriggerDraft} PropsonSubmitHandler={onSubmitHandler} />, ModalSizeEnum.Small)
                      setTriggerDraft(true);
                    }}
                  />

                  {/* onClick={onSubmitHandler} */}
                  <Button
                    icon="save outline"
                    color="green"
                    floated="right"
                    content="Submit"
                    disabled={
                      invalid ||
                      !result ||
                      DataEmployee.length === 0 ||
                      TakeHomePay === 0 ||
                      !buCost ||
                      isCheck.length !== DataEmployee.length
                    }
                  />
                  <Button
                    icon="undo"
                    floated="right"
                    content="Cancel"
                    type="button"
                    onClick={onCloseHandler}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      />
    </LoadingIndicator>
  );
};

export default BulkUpdateForm;
