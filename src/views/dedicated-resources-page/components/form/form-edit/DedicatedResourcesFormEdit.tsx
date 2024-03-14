import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Segment, Grid, Icon, Header } from "semantic-ui-react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import "./DedicatedResourcesFormEditStyle.scss";
import IUserResult from "selectors/user/models/IUserResult";
import IStore from "models/IStore";
import { selectUserResult } from "selectors/user/UserSelector";
import ResourcesEditStatus from "./main-content/resources-status/ResourcesEditStatus";
import EmployeeDetail from "./main-content/employee-detail/EmployeeDetail";
import ProjectInfo from "./main-content/project-info/ProjectInfo";
import SalaryAndBenefit from "./main-content/salary-and-benefit/SalaryAndBenefit";
import VerificationCheck from "../form-create/VerificationCheck/VerificationCheck";
import Deductions from "./main-content/deductions/Deductions";
import OtherAndBenefit from "./main-content/other-and-benefit/OtherAndBenefit";
import ApprovalSteps from "./main-content/ApprovalSteps/ApprovalSteps";
import InputDataContract from "../form-create/InputDataContract/InputDataContract";
import * as DedicatedResourcesActions from "stores/dedicated-resources/DedicatedResourcesActions";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as ToastsAction from "stores/toasts/ToastsAction";
import ToastStatusEnum from "constants/ToastStatusEnum";
import TakeHomePay from "./main-content/take-home-pay/TakeHomePay";
import {
  selectWorkFlowHeader,
  selectEmployeeInfo,
  selectSalaryBenefit,
  selectDeductions,
  selectOtherBenefit,
  selectEmployeeDetail,
  selectProjectInfo,
  selectCheckLastEmployeeContract,
  selectCheckSubmited,
  selectDropDownContractStatus,
  selectTakeHomePay,
} from "selectors/dedicated-resources/DedicatedResourcesServiceSelector";
import axios from "axios";
import ReSubmitModel from "stores/dedicated-resources/models/DedicatedResourcesViewEdit/ReSubmitModel";
import ISalaryBenefitTable from "selectors/dedicated-resources/models/SalaryBenefit/ISalaryBenefitTable";
import { Tooltips } from "views/components/UI";

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  //   history: History;
}

const DedicatedResourcesFormEdit: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const showApprovalStep: boolean = useSelector(
    (state: IStore) => state.buttonToggle.bOpen
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const result: any = useSelector(
    (state: IStore) => state.dedicatedresources.resultActions
  );
  const WorkFlowHeader = useSelector((state: IStore) =>
    selectWorkFlowHeader(state)
  );
  const EmployeeInfo = useSelector((state: IStore) =>
    selectEmployeeInfo(state)
  );
  
  const ResultCheckLastContract = useSelector((state: IStore) =>
    selectCheckLastEmployeeContract(state)
  );
  const ResultCheckSubmited = useSelector((state: IStore) =>
    selectCheckSubmited(state)
  );
  const DropdownContractStatus = useSelector((state: IStore) =>
    selectDropDownContractStatus(state)
  );
  const SelectTakeHomePay = useSelector((state: IStore) => selectTakeHomePay(state))

  const onPopupSideMenu = useCallback(
    (content: any, size: ModalSizeEnum): void => {
      dispatch(ModalAction.OPEN(content, size));
    },
    [dispatch]
  );

  const [pageSize] = useState(15);
  const [activePageDeductions, setActivePageDeductions] = useState(1);
  const [activePageSalary, setActivePageSalary] = useState(1);
  const [activePageOther, setActivePageOther] = useState(1);
  const [Checking, setChecking] = useState(false)

  useEffect(() => {
    if (result?.errorNumber === "0") {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Success));
      dispatch(DedicatedResourcesActions.requestDropdownContractStatus(+props.match.params.id));
      dispatch(
        DedicatedResourcesActions.requestGetProjectInfo(+props.match.params.id)
      );
      dispatch(
        DedicatedResourcesActions.requestGetEmployeeInfo(+props.match.params.id)
      );
      dispatch(
        DedicatedResourcesActions.requestGetEmployeeDetail(
          +props.match.params.id
        )
      );
      dispatch(
        DedicatedResourcesActions.requestDeductions(
          +props.match.params.id,
          activePageDeductions,
          pageSize
        )
      );
      dispatch(
        DedicatedResourcesActions.requestSalaryBenefit(
          +props.match.params.id,
          activePageSalary,
          pageSize
        )
      );
      dispatch(
        DedicatedResourcesActions.requestOtherBenefit(
          +props.match.params.id,
          activePageOther,
          pageSize
        )
      );
      dispatch(
        DedicatedResourcesActions.requestTakeHomePay(+props.match.params.id)
      );
      const GetWorkFlowByID = axios(
        `http://bhpapisrvdev.berca.co.id:7000/api/DQGenericService/Worfklow/GetWorkflowID?appsModul=RC&process=RENEWALCONTRACTSUBMIT&userLogin=${currentUser.userName}&amount=1`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userLogin"))
              ?.token + ""}`,
          }, // default, so we can ignore
        }
      ).then((response) => {
        dispatch(
          DedicatedResourcesActions.requestWorkFlowHeader(
            +props.match.params.id,
            parseInt(response.data)
          )
        );
      });
      dispatch(
        DedicatedResourcesActions.requestCheckApproval(+props.match.params.id)
      );
      dispatch(DedicatedResourcesActions.removeResult());
    } else if (result?.bSuccess === false) {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Warning));
      dispatch(DedicatedResourcesActions.removeResult());
    }
  }, [result]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      DedicatedResourcesActions.REQUEST_RENEWAL_CONTRACT_STATUS,
      DedicatedResourcesActions.REQUEST_GET_EMPLOYEE_INFO,
      DedicatedResourcesActions.REQUEST_GET_EMPLOYEE_DETAIL,
      DedicatedResourcesActions.REQUEST_GET_DEDUCTIONS,
      DedicatedResourcesActions.REQUEST_GET_PROJECT_INFO,
      DedicatedResourcesActions.REQUEST_GET_OTHER_BENEFIT,
      DedicatedResourcesActions.REQUEST_TAKE_HOME_PAY,
      DedicatedResourcesActions.REQUEST_WORK_FLOW_HEADER,
      DedicatedResourcesActions.REQUEST_CHECK_LAST_EMPLOYEE_CONTRACT,
      DedicatedResourcesActions.REQUEST_CHECK_APPROVAL
    ])
  );

  useEffect(() => {
    localStorage.removeItem("SalaryBenefit");
    localStorage.removeItem("Deductions");
    localStorage.removeItem("OtherBenefit");
    localStorage.removeItem("LastContract");
    dispatch(
      DedicatedResourcesActions.requestCheckLastEmployeeContract(
        currentUser.employeeKey,
        +props.match.params.id
      )
    );
    dispatch(DedicatedResourcesActions.requestDropdownContractStatus(+props.match.params.id));
    dispatch(DedicatedResourcesActions.requestDropdownBuCost());
    dispatch(
      DedicatedResourcesActions.requestGetEmployeeInfo(+props.match.params.id)
    );
    dispatch(
      DedicatedResourcesActions.requestGetEmployeeDetail(+props.match.params.id)
    );
    dispatch(
      DedicatedResourcesActions.requestDeductions(
        +props.match.params.id,
        activePageDeductions,
        pageSize
      )
    );
    dispatch(
      DedicatedResourcesActions.requestGetProjectInfo(+props.match.params.id)
    );
    dispatch(
      DedicatedResourcesActions.requestOtherBenefit(
        +props.match.params.id,
        activePageOther,
        pageSize
      )
    );
    dispatch(
      DedicatedResourcesActions.requestSalaryBenefit(
        +props.match.params.id,
        activePageSalary,
        pageSize
      )
    );
    dispatch(
      DedicatedResourcesActions.requestTakeHomePay(+props.match.params.id)
    );
    dispatch(
      DedicatedResourcesActions.requestCheckSubmit(currentUser.employeeID,+props.match.params.id)
    );
    dispatch(
      DedicatedResourcesActions.requestCheckApproval(+props.match.params.id)
    );
    // const GetWorkFlowByID = {
    const GetWorkFlowByID = axios(
      `http://bhpapisrvdev.berca.co.id:7000/api/DQGenericService/Worfklow/GetWorkflowID?appsModul=RC&process=RENEWALCONTRACTSUBMIT&userLogin=${currentUser.userName}&amount=1`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userLogin"))
            ?.token + ""}`,
        }, // default, so we can ignore
      }
    ).then((response) => {
      dispatch(
        DedicatedResourcesActions.requestWorkFlowHeader(
          +props.match.params.id,
          parseInt(response.data)
        )
      );
    });
    // .then(data => console.log(data));
    // }
  }, []);
  const [submit, setSubmit] = useState({
    contractID: +props.match.params.id,
    userLoginID: currentUser.employeeID,
  });

  const ListSalaryBenefit = useSelector((state: IStore) =>
    selectSalaryBenefit(state)
  );
  const ListDeduction = useSelector((state: IStore) => selectDeductions(state));
  const ListOtherBenefit = useSelector((state: IStore) =>
    selectOtherBenefit(state)
  );
  const EmployeeDetailStore = useSelector((state: IStore) =>
    selectEmployeeDetail(state)
  );
  const ListProjectInfo = useSelector((state: IStore) =>
    selectProjectInfo(state)
  );

  const onReSubmit = () => {
    const newValues = new ReSubmitModel({});

    const newSalaryBenefit = ListSalaryBenefit.rows?.map((item) => {
      return {
        salaryID: item.salaryID,
        contractID: item.contractID,
        salaryType: item.salaryType,
        salaryDesc: item.salaryDesc,
        currentAmount: item.currentAmount,
        newAmount: item.newAmount,
        increase: item.increase,
        percentage: item.percentage,
        notes: item.remark,
        userLoginID: item.userLoginID,
        isSave: item.isSave,
      };
    });
    const newDeduction = ListDeduction.rows?.map((item) => {
      return {
        deductID: item.deductID,
        contractID: item.contractID,
        percentage: item.percentage ? item.percentage : 0,
        deductType: item.deductType,
        deductDesc: item.deductDesc,
        amount: item.amount,
        remark: item.remark,
        userLoginID: item.userLoginID,
        isSave: item.isSave,
      };
    });
    const newOtherBenefit = ListOtherBenefit.rows?.map((item) => {
      return {
        benefitID: item.benefitID,
        contractID: item.contractID,
        benefitType: item.benefitType,
        benefitDesc: item.benefitDesc,
        flagLastContract: item.flagLastContract,
        flagNewContract: item.flagNewContract,
        userLoginID: item.userLoginID,
        isSave: item.isSave,
      };
    });

    const DashValues = {
      salaryBenefit: newSalaryBenefit,
      deduction: newDeduction,
      otherBenefit: newOtherBenefit,
      employeeDetail: EmployeeDetailStore,
      projectInfo: ListProjectInfo,
    };

    newValues.userLoginID = currentUser.employeeID;
    newValues.contractID = +props.match.params.id;
    newValues.listRenewalContractDash = DashValues;

    dispatch(DedicatedResourcesActions.requestpostReSubmit(newValues));
  };

  useEffect(() => {
    
    const mapping = WorkFlowHeader.resultObj?.map((item) => {
      if(item.status === "APPROVED")
      {
        setChecking(false)
      }
      if(item.status === "REJECTED")
      {
        setChecking(true)
      }
    })
    
  },[WorkFlowHeader.resultObj])
  // console.log('EmployeeDetailStore',EmployeeDetailStore)
  // console.log('ListProjectInfo',SelectTakeHomePay.text < 1 || !ListProjectInfo || !EmployeeDetailStore.newBeginDate || !EmployeeDetailStore.newEndDate)
  const handleSubmit = () => {
    if(SelectTakeHomePay.text < 1 || !ListProjectInfo || !EmployeeDetailStore.newBeginDate || !EmployeeDetailStore.newEndDate)
    {
      onPopupSideMenu(
        <VerificationCheck
          contractID={+props.match.params.id}
        />,
        ModalSizeEnum.Tiny
      ) 
    } else if(EmployeeInfo.contractStatusName === "Contract Will Be End" && WorkFlowHeader.resultObj.length === 0)
    {
      dispatch(DedicatedResourcesActions.requestpostSubmit(submit))
    } else if(Checking === true)
    {
      onReSubmit() 
    }
  }
  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        {/* {showApproval && <ApprovalSteps funnelGenID={props.match.params.id} />} */}
        <ApprovalSteps WorkFlowHeader={WorkFlowHeader.resultObj} />
        <Grid
          stackable
          columns={3}
          className={
            showApprovalStep ? "container-dedicated-resources-form-edit" : null
          }
        >
          <Grid.Column className="FullGrid1200" width={1}>
            <Grid className="btnApproveSubmit">
              <Grid.Column>
              {/* */}
                {ResultCheckSubmited.result === 1 || Checking ? (
                  <Tooltips 
                  content={WorkFlowHeader.resultObj?.length > 0 && Checking === false && "Disable button because it is running a Workflow"}
                  trigger={
                  <Segment.Group className="StickyBtnSubmit">
                    <Segment
                      clearing
                      inverted
                      color="green"
                      disabled={
                        WorkFlowHeader.resultObj?.length > 0 && Checking === false &&
                        true
                      }
                      
                      onClick={handleSubmit}
                    >
                      <Icon name="save" />
                      <Header as="h4">
                        {Checking === true
                          ? "ReSubmit"
                          : "Submit"}{" "}
                        Renewal
                      </Header>
                    </Segment>
                  </Segment.Group>
                  }
                  />
                ) : null}
                {/* <div style={{ height: "20px" }} /> */}
                {/* <Segment.Group className="StickyBtnSubmit">
                  <Segment
                    clearing
                    inverted
                    color="purple"
                    disabled={
                      EmployeeInfo.contractStatusName === "Full Approved" &&
                      true
                    }
                    onClick={() => {
                      EmployeeInfo.contractStatusName !== "Full Approved" &&
                        dispatch(
                          DedicatedResourcesActions.requestpostSubmit(submit)
                        );
                    }}
                  >
                    <Icon name="file alternate outline" />
                    <Header as="h4">Save As Draft</Header>
                  </Segment>
                </Segment.Group> */}
                {/* <div style={{ height: "30px" }} />
                <Segment.Group className="StickyBtnSubmit">
                  <Segment
                    clearing
                    inverted
                    disabled={
                      // EmployeeInfo.contractStatusName === "Full Approved"
                      ResultCheckLastContract.result === 0 ||
                      (Checking === false &&
                        true)
                    }
                    color="yellow"
                    onClick={() =>
                      Checking
                      // EmployeeInfo.contractStatusName === "Full Approved"
                        ? null
                        : ResultCheckLastContract.result === 1 &&
                          onPopupSideMenu(
                            <InputDataContract
                              contractID={+props.match.params.id}
                            />,
                            ModalSizeEnum.Large
                          )
                    }
                  >
                    <Icon name="cloud upload" />
                    <Header as="h4">Input Contract same as Current</Header>
                  </Segment>
                </Segment.Group> */}
              </Grid.Column>
            </Grid>
          </Grid.Column>

          <Grid.Column width={11}>
            <ResourcesEditStatus
              history={props.history}
              contractID={+props.match.params.id}
            />

            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Segment inverted className="lightBlue">
                    <ProjectInfo
                      type="edit"
                      contractID={+props.match.params.id}
                    />
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Grid className="mt-2r">
              <Grid.Row>
                <Grid.Column>
                  <SalaryAndBenefit
                    setActivePage={setActivePageSalary}
                    activePage={activePageSalary}
                    pageSize={pageSize}
                    contractID={+props.match.params.id}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column style={{ margin: "auto" }} width={4}>
            <Segment inverted className="lightBlue">
              <EmployeeDetail contractID={+props.match.params.id} />
            </Segment>
            <Segment inverted color='violet'>
              <TakeHomePay SelectTakeHomePay={SelectTakeHomePay.text} />
            </Segment>
          </Grid.Column>
        </Grid>

        <Grid stackable columns={3}>
          <Grid.Column className="FullGrid1200" width={1}></Grid.Column>

          <Grid.Column width={6}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Deductions
                    activePage={activePageDeductions}
                    setActivePage={setActivePageDeductions}
                    pageSize={pageSize}
                    contractID={+props.match.params.id}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column floated={"right"} width={8}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <OtherAndBenefit
                    pageSize={pageSize}
                    activePage={activePageOther}
                    setActivePage={setActivePageOther}
                    contractID={+props.match.params.id}
                    flag="NonContract"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
      </LoadingIndicator>
    </Fragment>
  );
};

export default withRouter(DedicatedResourcesFormEdit);
