import * as DedicatedResourcesActions from './DedicatedResourcesActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import ResultActions from 'models/ResultActions';
import IDedicatedResourcesState from './models/IDedicatedResourcesState';
import DedicatedResourcesEnvelope from './models/DedicatedResourcesEnvelope';
import DropdownDedicatedResourcesModel from './models/DropdownDedicatedResourcesModel';
import ListApprovalModel from './models/ListApprovalModel';
import GetEmployeeInfoModel from './models/DedicatedResourcesViewEdit/GetEmployeeInfoModel';
import GetEmployeeDetailModel from './models/DedicatedResourcesViewEdit/GetEmployeeDetailModel';
import DeductionsEnvelope from './models/DedicatedResourcesViewEdit/Deductions/DeductionsEnvelope';
import DeductionsModel from './models/DedicatedResourcesViewEdit/Deductions/DeductionsModel';
import GetProjectInfoModel from './models/DedicatedResourcesViewEdit/GetProjectInfoModel';
import OtherBenefitEnvelope from './models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitEnvelope';
import SalaryBenefitEnvelope from './models/DedicatedResourcesViewEdit/SalaryBenefit/SalaryBenefitEnvelope';
import SalaryBenefitModel from './models/DedicatedResourcesViewEdit/SalaryBenefit/SalaryBenefitModel';
import SalaryBenefitModelById from './models/DedicatedResourcesViewEdit/SalaryBenefit/SalaryBenefitById';
import OtherBenefitTemplateProject from './models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitTemplateProject';
import WorkFlowHeaderModel from './models/WorkFlowHeaderModel';
import VerificationDataStatusModel from './models/VerificationDataStatusModel';
import EmployeeModel from 'stores/employee/models/EmployeeModel';
import GetSearchSOOIModel from './models/DedicatedResourcesViewEdit/GetSearchSOOIModel';
import GetHistoryContractEnvelope from './models/GetHistoryContractEnvelope';
import GetActivityReportEnvelope from './models/GetActivityReportEnvelope';
import OtherBenefitTemplateProjectEnvelope from './models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitLastContractEnvelope';
import OtherBenefitLastContractEnvelope from './models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitLastContractEnvelope';
import WorkFlowHeaderEnvelope from './models/WorkFlowHeaderEnvelope';
import DocumentTrackingModel from './models/DocumentTrackingModel';
import ResultCheck from './models/ResultCheck';

export const initialState: IDedicatedResourcesState = {
  listData: new DedicatedResourcesEnvelope({}),
  listDataBulkUpdate: new DedicatedResourcesEnvelope({}),
  listHistoryContract: new GetHistoryContractEnvelope({}),
  listActivityReport: new GetActivityReportEnvelope({}),
  listDeductions: new DeductionsEnvelope({}),
  listOtherBenefit: new OtherBenefitEnvelope({}),
  listSalaryBenefit: new SalaryBenefitEnvelope({}),
  listOtherLastContract: new OtherBenefitLastContractEnvelope({}),
  listOtherTemplateProject: [],
  DeductionById: new DeductionsModel({}),
  SalaryBenefitById: new SalaryBenefitModelById({}),
  TakeHomePay: new DropdownDedicatedResourcesModel({}),
  CurrentSalary: new DropdownDedicatedResourcesModel({}),
  DropdownContractStatus: [],
  DropdownDepartment: [],
  DropdownSupervisor: [],
  DropdownDeductionType: [],
  DropdownDeductionDesc: [],
  DropDownOtherBenefitType: [],
  DropDownOtherBenefitDesc: [],
  DropDownSalaryBenefitType: [],
  DropDownSalaryBenefitDesc: [],
  DropDownUMRYearSalaryBenefit: [],
  DropDownUMRSalaryBenefit: [],
  DropdownEmployee:[],
  DropdownSenderAdmin: [],
  DropDownBuCost: [],
  ListApprovalButton: [],
  WorkFlowHeader: new WorkFlowHeaderEnvelope({}),
  SearchSOOI: [],
  VerificationDataStatus:[],
  EmployeeInfo: new GetEmployeeInfoModel({}),
  EmployeeDetail: new GetEmployeeDetailModel({}),
  ProjectInfo: new GetProjectInfoModel({}),
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
  DocumentTracking: new DocumentTrackingModel({}),
  isExportExcel: false,
  CheckLastEmployeeContract: new ResultCheck({}),
  CheckSubmited: new ResultCheck({}),
  CheckApproval: new ResultCheck({}),
};

const DedicatedResourcesReducer: Reducer = baseReducer(initialState, {
  [DedicatedResourcesActions.REQUEST_RENEWAL_CONTRACT_FINISHED](state: IDedicatedResourcesState, action: IAction<DedicatedResourcesEnvelope>): IDedicatedResourcesState {
    return {
      ...state,
      listData: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_HISTORY_CONTRACT_FINISHED](state: IDedicatedResourcesState, action: IAction<GetHistoryContractEnvelope>): IDedicatedResourcesState {
    return {
      ...state,
      listHistoryContract: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_ACTIVITY_REPORT_FINISHED](state: IDedicatedResourcesState, action: IAction<GetActivityReportEnvelope>): IDedicatedResourcesState {
    return {
      ...state,
      listActivityReport: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_FILTER_RENEWAL_CONTRACT_FINISHED](state: IDedicatedResourcesState, action: IAction<DedicatedResourcesEnvelope>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      listData: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_RENEWAL_CONTRACT_STATUS_FINISHED](state: IDedicatedResourcesState, action: IAction<DedicatedResourcesEnvelope>): IDedicatedResourcesState {
    return {
      ...state,
      listData: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_DROPDOWN_CONTRACT_STATUS_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      DropdownContractStatus: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_DROPDOWN_CONTRACT_STATUS_FILTER_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      DropdownContractStatus: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_DROPDOWN_DEPARTMENT_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      DropdownDepartment: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_DROPDOWN_SUPERVISOR_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      DropdownSupervisor: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_POST_BULK_UPDATE_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_POST_BULK_UPDATE_AS_DRAFT_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_INPUT_FROM_LAST_CONTRACT_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_LIST_APPROVAL_BUTTON_FINISHED](state: IDedicatedResourcesState, action: IAction<ListApprovalModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      ListApprovalButton: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_GET_EMPLOYEE_INFO_FINISHED](state: IDedicatedResourcesState, action: IAction<GetEmployeeInfoModel>): IDedicatedResourcesState {
    return {
      ...state,
      EmployeeInfo: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_PUT_EMPLOYEE_INFO_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_TERMINATE_CONTRACT_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_GET_EMPLOYEE_DETAIL_FINISHED](state: IDedicatedResourcesState, action: IAction<GetEmployeeDetailModel>): IDedicatedResourcesState {
    return {
      ...state,
      EmployeeDetail: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_PUT_EMPLOYEE_DETAIL_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_TAKE_HOME_PAY_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel>): IDedicatedResourcesState {
    return {
      ...state,
      TakeHomePay: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_POST_SUBMIT_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_POST_SUBMIT_APPROVAL_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_POST_SUBMIT_APPROVAL_DOCUMENT_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_WORK_FLOW_HEADER_FINISHED](state: IDedicatedResourcesState, action: IAction<WorkFlowHeaderEnvelope>): IDedicatedResourcesState {
    return {
      ...state,
      WorkFlowHeader: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_VERIFICATION_DATA_STATUS_FINISHED](state: IDedicatedResourcesState, action: IAction<VerificationDataStatusModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      VerificationDataStatus: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  
  [DedicatedResourcesActions.REQUEST_DROPDOWN_SENDER_ADMIN_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      DropdownSenderAdmin: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  //ProjectInfo
  [DedicatedResourcesActions.REQUEST_GET_PROJECT_INFO_FINISHED](state: IDedicatedResourcesState, action: IAction<GetProjectInfoModel>): IDedicatedResourcesState {
    return {
      ...state,
      ProjectInfo: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_GET_SEARCH_SOOI_FINISHED](state: IDedicatedResourcesState, action: IAction<GetSearchSOOIModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      SearchSOOI: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_PUT_PROJECT_INFO_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  //Deductions

  [DedicatedResourcesActions.REQUEST_GET_DEDUCTIONS_FINISHED](state: IDedicatedResourcesState, action: IAction<DeductionsEnvelope>): IDedicatedResourcesState {
    return {
      ...state,
      listDeductions: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_DROPDOWN_DEDUCTION_TYPE_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      DropdownDeductionType: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_DROPDOWN_DEDUCTION_DESC_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      DropdownDeductionDesc: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_GET_DEDUCTION_BYID_FINISHED](state: IDedicatedResourcesState, action: IAction<DeductionsModel>): IDedicatedResourcesState {
    return {
      ...state,
      DeductionById: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.POST_DEDUCTION_DATA_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.DEL_DEDUCTION_DATA_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_PUT_DEDUCTION_DATA_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  //OtherBenefit
  [DedicatedResourcesActions.REQUEST_GET_OTHER_BENEFIT_FINISHED](state: IDedicatedResourcesState, action: IAction<OtherBenefitEnvelope>): IDedicatedResourcesState {
    return {
      ...state,
      listOtherBenefit: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_GET_LAST_CONTRACT_FINISHED](state: IDedicatedResourcesState, action: IAction<OtherBenefitLastContractEnvelope>): IDedicatedResourcesState {
    return {
      ...state,
      listOtherLastContract: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_GET_OTHER_TEMPLATE_PROJECT_FINISHED](state: IDedicatedResourcesState, action: IAction<OtherBenefitTemplateProject[]>): IDedicatedResourcesState {
    return {
      ...state,
      listOtherTemplateProject: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_DROPDOWN_OTHER_BENEFIT_TYPE_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      DropDownOtherBenefitType: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_DROPDOWN_OTHER_BENEFIT_DESC_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      DropDownOtherBenefitDesc: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_POST_OTHER_BENEFIT_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_DEL_OTHER_BENEFIT_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_PUT_OTHER_BENEFIT_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },


  //SalaryBenefit
  [DedicatedResourcesActions.REQUEST_GET_SALARY_BENEFIT_FINISHED](state: IDedicatedResourcesState, action: IAction<SalaryBenefitEnvelope>): IDedicatedResourcesState {
    return {
      ...state,
      listSalaryBenefit: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_TYPE_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      DropDownSalaryBenefitType: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_DESC_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      DropDownSalaryBenefitDesc: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },


  [DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_UMR_YEAR_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      DropDownUMRYearSalaryBenefit: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  
  [DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_UMR_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      DropDownUMRSalaryBenefit: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_POST_SALARY_BENEFIT_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_DEL_SALARY_BENEFIT_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_PUT_SALARY_BENEFIT_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_GET_SALARY_BENEFIT_BYID_FINISHED](state: IDedicatedResourcesState, action: IAction<SalaryBenefitModelById>): IDedicatedResourcesState {
    return {
      ...state,
      SalaryBenefitById: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_CURRENT_SALARY_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel>): IDedicatedResourcesState {
    return {
      ...state,
      CurrentSalary: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_EMPLOYEE_FINISHED](state: IDedicatedResourcesState, action: IAction<EmployeeModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      DropdownEmployee: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_DROPDOWN_BUCOST_FINISHED](state: IDedicatedResourcesState, action: IAction<DropdownDedicatedResourcesModel[]>): IDedicatedResourcesState {
    return {
      ...state,
      DropDownBuCost: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_GET_DOCUMENT_TRACKING_FINISHED](state: IDedicatedResourcesState, action: IAction<DocumentTrackingModel>): IDedicatedResourcesState {
    return {
      ...state,
      DocumentTracking: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_POST_RESUBMIT_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [DedicatedResourcesActions.REQUEST_CHECK_LAST_EMPLOYEE_CONTRACT_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultCheck>): IDedicatedResourcesState {
    return {
      ...state,
      CheckLastEmployeeContract: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_CHECK_SUBMIT_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultCheck>): IDedicatedResourcesState {
    return {
      ...state,
      CheckSubmited: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_CHECK_APPROVAL_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultCheck>): IDedicatedResourcesState {
    return {
      ...state,
      CheckApproval: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.REQUEST_RENEWAL_CONTRACT_BULK_UPDATE_FINISHED](state: IDedicatedResourcesState, action: IAction<DedicatedResourcesEnvelope>): IDedicatedResourcesState {
    return {
      ...state,
      listDataBulkUpdate: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [DedicatedResourcesActions.SET_IS_EXPORT_EXCEL](state: IDedicatedResourcesState, action: IAction<boolean>): IDedicatedResourcesState {
    return {
      ...state,
      isExportExcel: action.payload!,   
    };
  },

  
  [DedicatedResourcesActions.REMOVE_SUBMIT_RESULT_FINISHED](state: IDedicatedResourcesState, action: IAction<ResultActions>): IDedicatedResourcesState {
    const clearResult = new ResultActions({})
    return {
    ...state,
    error: action.error!,
    refreshPage: action.error ? false : true,
    resultActions: clearResult!,
    };
  },

});

export default DedicatedResourcesReducer;
