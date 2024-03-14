import * as DedicatedResourcesEffects from './DedicatedResourcesEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import ResultActions from 'models/ResultActions';
import DedicatedResourcesEnvelope from './models/DedicatedResourcesEnvelope';
import FilterRenewalContractModel from './models/FilterRenewalContractModel';
import DropdownDedicatedResourcesModel from './models/DropdownDedicatedResourcesModel';
import ListApprovalModel from './models/ListApprovalModel';
import GetEmployeeInfoModel from './models/DedicatedResourcesViewEdit/GetEmployeeInfoModel';
import PutEmployeeInfoModel from './models/DedicatedResourcesViewEdit/PutEmplyoeeInfoModel';
import GetEmployeeDetailModel from './models/DedicatedResourcesViewEdit/GetEmployeeDetailModel';
import PutEmployeeDetailModel from './models/DedicatedResourcesViewEdit/PutEmployeeDetailModel';
import DeductionsEnvelope from './models/DedicatedResourcesViewEdit/Deductions/DeductionsEnvelope';
import DeductionsModel from './models/DedicatedResourcesViewEdit/Deductions/DeductionsModel';
import GetProjectInfoModel from './models/DedicatedResourcesViewEdit/GetProjectInfoModel';
import SalaryBenefitEnvelope from './models/DedicatedResourcesViewEdit/SalaryBenefit/SalaryBenefitEnvelope';
import OtherBenefitEnvelope from './models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitEnvelope';
import SalaryBenefitModel from './models/DedicatedResourcesViewEdit/SalaryBenefit/SalaryBenefitModel';
import SalaryBenefitModelById from './models/DedicatedResourcesViewEdit/SalaryBenefit/SalaryBenefitById';
import SaveOtherBenefitModel from './models/DedicatedResourcesViewEdit/OtherBenefit/SaveOtherBenefitModel';
import OtherBenefitModel from './models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitModel';
import OtherBenefitTemplateProject from './models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitTemplateProject';
import SubmitModel from './models/SubmitModel';
import WorkFlowHeaderModel from './models/WorkFlowHeaderModel';
import VerificationDataStatusModel from './models/VerificationDataStatusModel';
import SubmitApprovalModel from './models/SubmitApprovalModel';
import SubmitApprovalDocumentModel from './models/SubmitApprovalDocumentModel';
import EmployeeModel from 'stores/employee/models/EmployeeModel';
import GetSearchSOOIModel from './models/DedicatedResourcesViewEdit/GetSearchSOOIModel';
import TerminateContractModel from './models/TerminateContractModel';
import DedicatedResourcesBulkUpdateModel from './models/DedicatedResourcesBulkUpdate/DedicatedResourcesBulkUpdateModel';
import GetHistoryContractEnvelope from './models/GetHistoryContractEnvelope';
import GetActivityReportEnvelope from './models/GetActivityReportEnvelope';
import PostInputDataFromLastContract from './models/DedicatedResourcesViewEdit/PostInputDataFromLastContract';
import OtherBenefitLastContractEnvelope from './models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitLastContractEnvelope';
import WorkFlowHeaderEnvelope from './models/WorkFlowHeaderEnvelope';
import IAction from 'models/IAction';
import DocumentTrackingModel from './models/DocumentTrackingModel';
import ReSubmitModel from './models/DedicatedResourcesViewEdit/ReSubmitModel';
import ResultCheck from './models/ResultCheck';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | ResultActions
  | DedicatedResourcesEnvelope
  | FilterRenewalContractModel
  | DropdownDedicatedResourcesModel
  | ListApprovalModel
  | GetEmployeeInfoModel
  | PutEmployeeInfoModel
  | GetEmployeeDetailModel
  | PutEmployeeDetailModel
  | DeductionsEnvelope
  | DeductionsModel
  | GetProjectInfoModel
  | SalaryBenefitEnvelope
  | OtherBenefitEnvelope
  | SalaryBenefitModel
  | SalaryBenefitModelById
  | SaveOtherBenefitModel
  | OtherBenefitModel
  | OtherBenefitTemplateProject
  | SubmitModel
  | SubmitApprovalModel
  | WorkFlowHeaderModel
  | WorkFlowHeaderEnvelope
  | VerificationDataStatusModel
  | SubmitApprovalDocumentModel
  | EmployeeModel
  | GetSearchSOOIModel
  | TerminateContractModel
  | DedicatedResourcesBulkUpdateModel
  | GetHistoryContractEnvelope
  | GetActivityReportEnvelope
  | PostInputDataFromLastContract
  | OtherBenefitLastContractEnvelope
  | DocumentTrackingModel
  | ReSubmitModel
  | ResultCheck;

export const REQUEST_RENEWAL_CONTRACT: string = 'DedicatedResourcesActions.REQUEST_RENEWAL_CONTRACT';
export const REQUEST_RENEWAL_CONTRACT_FINISHED: string = 'DedicatedResourcesActions.REQUEST_RENEWAL_CONTRACT_FINISHED';

export const requestRenewalContract = (userLoginID: number, page: number, pageSize: number, column: string, sorting: string, search: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DedicatedResourcesEnvelope>(
      dispatch,
      REQUEST_RENEWAL_CONTRACT,
      DedicatedResourcesEffects.requestRenewalContract,
      userLoginID,
      page,
      pageSize,
      column,
      sorting,
      search
    );
  };
};

export const REQUEST_HISTORY_CONTRACT: string = 'DedicatedResourcesActions.REQUEST_HISTORY_CONTRACT';
export const REQUEST_HISTORY_CONTRACT_FINISHED: string = 'DedicatedResourcesActions.REQUEST_HISTORY_CONTRACT_FINISHED';

export const requestHistoryContract = (EmplID: number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<GetHistoryContractEnvelope>(
      dispatch,
      REQUEST_HISTORY_CONTRACT,
      DedicatedResourcesEffects.requestHistoryContract,
      EmplID,
      page,
      pageSize,
    );
  };
};

export const REQUEST_ACTIVITY_REPORT: string = 'DedicatedResourcesActions.REQUEST_ACTIVITY_REPORT';
export const REQUEST_ACTIVITY_REPORT_FINISHED: string = 'DedicatedResourcesActions.REQUEST_ACTIVITY_REPORT_FINISHED';

export const requestActivityReport = (EmplID: number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<GetActivityReportEnvelope>(
      dispatch,
      REQUEST_ACTIVITY_REPORT,
      DedicatedResourcesEffects.requestActivityReport,
      EmplID,
      page,
      pageSize,
    );
  };
};

export const REQUEST_FILTER_RENEWAL_CONTRACT: string = 'DedicatedResourcesActions.REQUEST_FILTER_RENEWAL_CONTRACT';
export const REQUEST_FILTER_RENEWAL_CONTRACT_FINISHED: string = 'DedicatedResourcesActions.REQUEST_FILTER_RENEWAL_CONTRACT_FINISHED';

export const RequestFilterRenewalContract = (data: FilterRenewalContractModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<DedicatedResourcesEnvelope>(dispatch, REQUEST_FILTER_RENEWAL_CONTRACT, DedicatedResourcesEffects.RequestFilterRenewalContract, data);
  };
};

export const REQUEST_TERMINATE_CONTRACT: string = 'DedicatedResourcesActions.REQUEST_TERMINATE_CONTRACT';
export const REQUEST_TERMINATE_CONTRACT_FINISHED: string = 'DedicatedResourcesActions.REQUEST_TERMINATE_CONTRACT_FINISHED';

export const RequestTerminateContract = (data: TerminateContractModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_TERMINATE_CONTRACT, DedicatedResourcesEffects.RequestTerminateContract, data);
  };
};

export const REQUEST_RENEWAL_CONTRACT_STATUS: string = 'DedicatedResourcesActions.REQUEST_RENEWAL_CONTRACT_STATUS';
export const REQUEST_RENEWAL_CONTRACT_STATUS_FINISHED: string = 'DedicatedResourcesActions.REQUEST_RENEWAL_CONTRACT_STATUS_FINISHED';

export const requestRenewalContractStatus = (userLoginID: number, page: number, pageSize: number, column: string, sorting: string, status: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DedicatedResourcesEnvelope>(
      dispatch,
      REQUEST_RENEWAL_CONTRACT_STATUS,
      DedicatedResourcesEffects.requestRenewalContractStatus,
      userLoginID,
      page,
      pageSize,
      column,
      sorting,
      status
    );
  };
};

export const REQUEST_DROPDOWN_SUPERVISOR: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_SUPERVISOR';
export const REQUEST_DROPDOWN_SUPERVISOR_FINISHED: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_SUPERVISOR_FINISHED';

export const requestDropdownSupervisor = (userLoginID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_DROPDOWN_SUPERVISOR,
      DedicatedResourcesEffects.requestDropdownSupervisor,
      userLoginID
    );
  };
};

export const REQUEST_DROPDOWN_DEPARTMENT: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_DEPARTMENT';
export const REQUEST_DROPDOWN_DEPARTMENT_FINISHED: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_DEPARTMENT_FINISHED';

export const requestDropdownDepartment = (userLoginID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_DROPDOWN_DEPARTMENT,
      DedicatedResourcesEffects.requestDropdownDepartment,
      userLoginID
    );
  };
};

export const REQUEST_DROPDOWN_CONTRACT_STATUS: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_CONTRACT_STATUS';
export const REQUEST_DROPDOWN_CONTRACT_STATUS_FINISHED: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_CONTRACT_STATUS_FINISHED';

export const requestDropdownContractStatus = (contractID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_DROPDOWN_CONTRACT_STATUS,
      DedicatedResourcesEffects.requestDropdownContractStatus,
      contractID
    );
  };
};

export const REQUEST_DROPDOWN_CONTRACT_STATUS_FILTER: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_CONTRACT_STATUS_FILTER';
export const REQUEST_DROPDOWN_CONTRACT_STATUS_FILTER_FINISHED: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_CONTRACT_STATUS_FILTER_FINISHED';

export const requestDropdownContractStatusFilter = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_DROPDOWN_CONTRACT_STATUS_FILTER,
      DedicatedResourcesEffects.requestDropdownContractStatusFilter,
    );
  };
};

export const REQUEST_POST_BULK_UPDATE: string = "DedicatedResourcesActions.REQUEST_POST_BULK_UPDATE";
export const REQUEST_POST_BULK_UPDATE_FINISHED = "DedicatedResourcesActions.REQUEST_POST_BULK_UPDATE_FINISHED";

export const requestpostBulkUpdate = (data: DedicatedResourcesBulkUpdateModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_BULK_UPDATE, DedicatedResourcesEffects.requestpostBulkUpdate, data);
  };
};

export const REQUEST_POST_BULK_UPDATE_AS_DRAFT: string = "DedicatedResourcesActions.REQUEST_POST_BULK_UPDATE_AS_DRAFT";
export const REQUEST_POST_BULK_UPDATE_AS_DRAFT_FINISHED = "DedicatedResourcesActions.REQUEST_POST_BULK_UPDATE_AS_DRAFT_FINISHED";

export const requestpostBulkUpdateAsDraft = (data: DedicatedResourcesBulkUpdateModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_BULK_UPDATE_AS_DRAFT, DedicatedResourcesEffects.requestpostBulkUpdateAsDraft, data);
  };
};

export const REQUEST_LIST_APPROVAL_BUTTON: string = 'DedicatedResourcesActions.REQUEST_LIST_APPROVAL_BUTTON';
export const REQUEST_LIST_APPROVAL_BUTTON_FINISHED: string = 'DedicatedResourcesActions.REQUEST_LIST_APPROVAL_BUTTON_FINISHED';

export const requestListApprovalButton = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ListApprovalModel>(
      dispatch,
      REQUEST_LIST_APPROVAL_BUTTON,
      DedicatedResourcesEffects.requestListApprovalButton,
    );
  };
};

export const REQUEST_GET_EMPLOYEE_INFO: string = 'DedicatedResourcesActions.REQUEST_GET_EMPLOYEE_INFO';
export const REQUEST_GET_EMPLOYEE_INFO_FINISHED: string = 'DedicatedResourcesActions.REQUEST_GET_EMPLOYEE_INFO_FINISHED';

export const requestGetEmployeeInfo = (contractID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<GetEmployeeInfoModel>(
      dispatch,
      REQUEST_GET_EMPLOYEE_INFO,
      DedicatedResourcesEffects.requestGetEmployeeInfo,
      contractID,
    );
  };
};

export const REQUEST_PUT_EMPLOYEE_INFO: string = 'DedicatedResourcesActions.REQUEST_PUT_EMPLOYEE_INFO';
export const REQUEST_PUT_EMPLOYEE_INFO_FINISHED: string = 'DedicatedResourcesActions.REQUEST_PUT_EMPLOYEE_INFO_FINISHED';

export const requestPutEmployeeInfo = (data: PutEmployeeInfoModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_PUT_EMPLOYEE_INFO, DedicatedResourcesEffects.requestPutEmployeeInfo, data);
  };
};

export const REQUEST_GET_EMPLOYEE_DETAIL: string = 'DedicatedResourcesActions.REQUEST_GET_EMPLOYEE_DETAIL';
export const REQUEST_GET_EMPLOYEE_DETAIL_FINISHED: string = 'DedicatedResourcesActions.REQUEST_GET_EMPLOYEE_DETAIL_FINISHED';

export const requestGetEmployeeDetail = (contractID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<GetEmployeeDetailModel>(
      dispatch,
      REQUEST_GET_EMPLOYEE_DETAIL,
      DedicatedResourcesEffects.requestGetEmployeeDetail,
      contractID,
    );
  };
};

export const REQUEST_PUT_EMPLOYEE_DETAIL: string = 'DedicatedResourcesActions.REQUEST_PUT_EMPLOYEE_DETAIL';
export const REQUEST_PUT_EMPLOYEE_DETAIL_FINISHED: string = 'DedicatedResourcesActions.REQUEST_PUT_EMPLOYEE_DETAIL_FINISHED';

export const requestPutEmployeeDetail = (data: PutEmployeeDetailModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_PUT_EMPLOYEE_DETAIL, DedicatedResourcesEffects.requestPutEmployeeDetail, data);
  };
};

export const REMOVE_SUBMIT_RESULT: string = 'DedicatedResourcesActions.REMOVE_SUBMIT_RESULT';
export const REMOVE_SUBMIT_RESULT_FINISHED = 'DedicatedResourcesActions.REMOVE_SUBMIT_RESULT_FINISHED';

export const removeResult = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REMOVE_SUBMIT_RESULT, DedicatedResourcesEffects.removeResult);
  };
};

export const REQUEST_TAKE_HOME_PAY: string = 'DedicatedResourcesActions.REQUEST_TAKE_HOME_PAY';
export const REQUEST_TAKE_HOME_PAY_FINISHED: string = 'DedicatedResourcesActions.REQUEST_TAKE_HOME_PAY_FINISHED';

export const requestTakeHomePay = (contractID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_TAKE_HOME_PAY,
      DedicatedResourcesEffects.requestTakeHomePay,
      contractID
    );
  };
};

export const REQUEST_POST_SUBMIT: string = "DedicatedResourcesActions.REQUEST_POST_SUBMIT";
export const REQUEST_POST_SUBMIT_FINISHED = "DedicatedResourcesActions.REQUEST_POST_SUBMIT_FINISHED";

export const requestpostSubmit = (data: SubmitModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, POST_DEDUCTION_DATA, DedicatedResourcesEffects.requestpostSubmit, data);
  };
};

export const REQUEST_POST_SUBMIT_APPROVAL: string = "DedicatedResourcesActions.REQUEST_POST_SUBMIT_APPROVAL";
export const REQUEST_POST_SUBMIT_APPROVAL_FINISHED = "DedicatedResourcesActions.REQUEST_POST_SUBMIT_APPROVAL_FINISHED";

export const requestpostSubmitApproval = (data: SubmitApprovalModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_SUBMIT_APPROVAL, DedicatedResourcesEffects.requestpostSubmitApproval, data);
  };
};

export const REQUEST_POST_SUBMIT_APPROVAL_DOCUMENT: string = "DedicatedResourcesActions.REQUEST_POST_SUBMIT_APPROVAL_DOCUMENT";
export const REQUEST_POST_SUBMIT_APPROVAL_DOCUMENT_FINISHED = "DedicatedResourcesActions.REQUEST_POST_SUBMIT_APPROVAL_DOCUMENT_FINISHED";

export const requestpostSubmitApprovalDocument = (data: SubmitApprovalDocumentModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_SUBMIT_APPROVAL_DOCUMENT, DedicatedResourcesEffects.requestpostSubmitApprovalDocument, data);
  };
};

export const REQUEST_WORK_FLOW_HEADER: string = 'DedicatedResourcesActions.REQUEST_WORK_FLOW_HEADER';
export const REQUEST_WORK_FLOW_HEADER_FINISHED: string = 'DedicatedResourcesActions.REQUEST_WORK_FLOW_HEADER_FINISHED';

export const requestWorkFlowHeader = (contractID: number, workflowProcessHeader: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<WorkFlowHeaderEnvelope>(
      dispatch,
      REQUEST_WORK_FLOW_HEADER,
      DedicatedResourcesEffects.requestWorkFlowHeader,
      contractID,
      workflowProcessHeader
    );
  };
};

export const REQUEST_VERIFICATION_DATA_STATUS: string = 'DedicatedResourcesActions.REQUEST_VERIFICATION_DATA_STATUS';
export const REQUEST_VERIFICATION_DATA_STATUS_FINISHED: string = 'DedicatedResourcesActions.REQUEST_VERIFICATION_DATA_STATUS_FINISHED';

export const requestVerificationDataStatus = (contractID: number, status: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<VerificationDataStatusModel>(
      dispatch,
      REQUEST_VERIFICATION_DATA_STATUS,
      DedicatedResourcesEffects.requestVerificationDataStatus,
      contractID,
      status
    );
  };
};

export const REQUEST_DROPDOWN_SENDER_ADMIN: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_SENDER_ADMIN';
export const REQUEST_DROPDOWN_SENDER_ADMIN_FINISHED: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_SENDER_ADMIN_FINISHED';

export const requestDropdownSenderAdmin = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_DROPDOWN_SENDER_ADMIN,
      DedicatedResourcesEffects.requestDropdownSenderAdmin,
    );
  };
};

//ProjectInfo
export const REQUEST_GET_PROJECT_INFO: string = 'DedicatedResourcesActions.REQUEST_GET_PROJECT_INFO';
export const REQUEST_GET_PROJECT_INFO_FINISHED: string = 'DedicatedResourcesActions.REQUEST_GET_PROJECT_INFO_FINISHED';

export const requestGetProjectInfo = (contractID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<GetProjectInfoModel>(
      dispatch,
      REQUEST_GET_PROJECT_INFO,
      DedicatedResourcesEffects.requestGetProjectInfo,
      contractID,
    );
  };
};

export const REQUEST_INPUT_FROM_LAST_CONTRACT: string = "DedicatedResourcesActions.REQUEST_INPUT_FROM_LAST_CONTRACT";
export const REQUEST_INPUT_FROM_LAST_CONTRACT_FINISHED = "DedicatedResourcesActions.REQUEST_INPUT_FROM_LAST_CONTRACT_FINISHED";

export const requestpostInputLastContract = (data: PostInputDataFromLastContract): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_INPUT_FROM_LAST_CONTRACT, DedicatedResourcesEffects.requestpostInputLastContract, data);
  };
};

export const REQUEST_GET_SEARCH_SOOI: string = 'DedicatedResourcesActions.REQUEST_GET_SEARCH_SOOI';
export const REQUEST_GET_SEARCH_SOOI_FINISHED: string = 'DedicatedResourcesActions.REQUEST_GET_SEARCH_SOOI_FINISHED';

export const requestGetSearchSOOI = (SOOI: string, ModulSOOI: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<GetSearchSOOIModel>(
      dispatch,
      REQUEST_GET_SEARCH_SOOI,
      DedicatedResourcesEffects.requestGetSearchSOOI,
      SOOI,
      ModulSOOI
    );
  };
};

export const REQUEST_PUT_PROJECT_INFO: string = 'DedicatedResourcesActions.REQUEST_PUT_PROJECT_INFO';
export const REQUEST_PUT_PROJECT_INFO_FINISHED: string = 'DedicatedResourcesActions.REQUEST_PUT_PROJECT_INFO_FINISHED';

export const requestPutProjectInfo = (data: GetProjectInfoModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_PUT_PROJECT_INFO, DedicatedResourcesEffects.requestPutProjectInfo, data);
  };
};

//Deductions

export const REQUEST_GET_DEDUCTIONS: string = 'DedicatedResourcesActions.REQUEST_GET_DEDUCTIONS';
export const REQUEST_GET_DEDUCTIONS_FINISHED: string = 'DedicatedResourcesActions.REQUEST_GET_DEDUCTIONS_FINISHED';

export const requestDeductions = (contractID: number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DeductionsEnvelope>(
      dispatch,
      REQUEST_GET_DEDUCTIONS,
      DedicatedResourcesEffects.requestDeductions,
      contractID,
      page,
      pageSize,
    );
  };
};

export const REQUEST_DROPDOWN_DEDUCTION_TYPE: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_DEDUCTION_TYPE';
export const REQUEST_DROPDOWN_DEDUCTION_TYPE_FINISHED: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_DEDUCTION_TYPE_FINISHED';

export const requestDropdownDeductionType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_DROPDOWN_DEDUCTION_TYPE,
      DedicatedResourcesEffects.requestDropdownDeductionType,
    );
  };
};

export const REQUEST_DROPDOWN_DEDUCTION_DESC: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_DEDUCTION_DESC';
export const REQUEST_DROPDOWN_DEDUCTION_DESC_FINISHED: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_DEDUCTION_DESC_FINISHED';

export const requestDropdownDeductionDesc = (type: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_DROPDOWN_DEDUCTION_DESC,
      DedicatedResourcesEffects.requestDropdownDeductionDesc,
      type
    );
  };
};

export const REQUEST_GET_DEDUCTION_BYID: string = 'DedicatedResourcesActions.REQUEST_GET_DEDUCTION_BYID';
export const REQUEST_GET_DEDUCTION_BYID_FINISHED: string = 'DedicatedResourcesActions.REQUEST_GET_DEDUCTION_BYID_FINISHED';

export const requestGetDeductionById = (deductID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DeductionsModel>(
      dispatch,
      REQUEST_GET_DEDUCTION_BYID,
      DedicatedResourcesEffects.requestGetDeductionById,
      deductID,
    );
  };
};

export const POST_DEDUCTION_DATA: string = "DedicatedResourcesActions.POST_DEDUCTION_DATA";
export const POST_DEDUCTION_DATA_FINISHED = "DedicatedResourcesActions.POST_DEDUCTION_DATA_FINISHED";

export const requestpostDeduction = (data: DeductionsModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, POST_DEDUCTION_DATA, DedicatedResourcesEffects.requestpostDeduction, data);
  };
};

export const DEL_DEDUCTION_DATA: string = "DedicatedResourcesActions.DEL_DEDUCTION_DATA";
export const DEL_DEDUCTION_DATA_FINISHED = "DedicatedResourcesActions.DEL_DEDUCTION_DATA_FINISHED";

export const requestDelDeduction = (deductID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, DEL_DEDUCTION_DATA, DedicatedResourcesEffects.requestDelDeduction, deductID);
  };
};

export const REQUEST_PUT_DEDUCTION_DATA: string = 'DedicatedResourcesActions.REQUEST_PUT_DEDUCTION_DATA';
export const REQUEST_PUT_DEDUCTION_DATA_FINISHED: string = 'DedicatedResourcesActions.REQUEST_PUT_DEDUCTION_DATA_FINISHED';

export const requestPutDeductionData = (data: DeductionsModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_PUT_DEDUCTION_DATA, DedicatedResourcesEffects.requestPutDeductionData, data);
  };
};


//OtherBenefit

export const REQUEST_GET_OTHER_BENEFIT: string = 'DedicatedResourcesActions.REQUEST_GET_OTHER_BENEFIT';
export const REQUEST_GET_OTHER_BENEFIT_FINISHED: string = 'DedicatedResourcesActions.REQUEST_GET_OTHER_BENEFIT_FINISHED';

export const requestOtherBenefit = (contractID: number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<OtherBenefitEnvelope>(
      dispatch,
      REQUEST_GET_OTHER_BENEFIT,
      DedicatedResourcesEffects.requestOtherBenefit,
      contractID,
      page,
      pageSize,
    );
  };
};

export const REQUEST_DROPDOWN_OTHER_BENEFIT_TYPE: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_OTHER_BENEFIT_TYPE';
export const REQUEST_DROPDOWN_OTHER_BENEFIT_TYPE_FINISHED: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_OTHER_BENEFIT_TYPE_FINISHED';

export const requestDropdownOtherBenefitType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_DROPDOWN_OTHER_BENEFIT_TYPE,
      DedicatedResourcesEffects.requestDropdownOtherBenefitType,
    );
  };
};

export const REQUEST_DROPDOWN_OTHER_BENEFIT_DESC: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_OTHER_BENEFIT_DESC';
export const REQUEST_DROPDOWN_OTHER_BENEFIT_DESC_FINISHED: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_OTHER_BENEFIT_DESC_FINISHED';

export const requestDropdownOtherBenefitDesc = (type:string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_DROPDOWN_OTHER_BENEFIT_DESC,
      DedicatedResourcesEffects.requestDropdownOtherBenefitDesc,
      type
    );
  };
};

export const REQUEST_POST_OTHER_BENEFIT: string = "DedicatedResourcesActions.REQUEST_POST_OTHER_BENEFIT";
export const REQUEST_POST_OTHER_BENEFIT_FINISHED = "DedicatedResourcesActions.REQUEST_POST_OTHER_BENEFIT_FINISHED";

export const requestpostOtherBenefit = (data: SaveOtherBenefitModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_OTHER_BENEFIT, DedicatedResourcesEffects.requestpostOtherBenefit, data);
  };
};

export const REQUEST_DEL_OTHER_BENEFIT: string = "DedicatedResourcesActions.REQUEST_DEL_OTHER_BENEFIT";
export const REQUEST_DEL_OTHER_BENEFIT_FINISHED = "DedicatedResourcesActions.REQUEST_DEL_OTHER_BENEFIT_FINISHED";

export const requestDelOtherBenefit = (benefitID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_DEL_OTHER_BENEFIT, DedicatedResourcesEffects.requestDelOtherBenefit, benefitID);
  };
};

export const REQUEST_PUT_OTHER_BENEFIT: string = 'DedicatedResourcesActions.REQUEST_PUT_OTHER_BENEFIT';
export const REQUEST_PUT_OTHER_BENEFIT_FINISHED: string = 'DedicatedResourcesActions.REQUEST_PUT_OTHER_BENEFIT_FINISHED';

export const requestPutOtherBenefit = (data: OtherBenefitModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_PUT_OTHER_BENEFIT, DedicatedResourcesEffects.requestPutOtherBenefit, data);
  };
};

export const REQUEST_GET_LAST_CONTRACT: string = 'DedicatedResourcesActions.REQUEST_GET_LAST_CONTRACT';
export const REQUEST_GET_LAST_CONTRACT_FINISHED: string = 'DedicatedResourcesActions.REQUEST_GET_LAST_CONTRACT_FINISHED';

export const requestOtherLastContract = (contractID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<OtherBenefitLastContractEnvelope>(
      dispatch,
      REQUEST_GET_LAST_CONTRACT,
      DedicatedResourcesEffects.requestOtherLastContract,
      contractID,
    );
  };
};

export const REQUEST_GET_OTHER_TEMPLATE_PROJECT: string = 'DedicatedResourcesActions.REQUEST_GET_OTHER_TEMPLATE_PROJECT';
export const REQUEST_GET_OTHER_TEMPLATE_PROJECT_FINISHED: string = 'DedicatedResourcesActions.REQUEST_GET_OTHER_TEMPLATE_PROJECT_FINISHED';

export const requestOtherTemplateProject = (ProjectTemplateID: number, contractID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<OtherBenefitTemplateProject>(
      dispatch,
      REQUEST_GET_OTHER_TEMPLATE_PROJECT,
      DedicatedResourcesEffects.requestOtherTemplateProject,
      ProjectTemplateID,
      contractID,
    );
  };
};


//Salary And Benefit
export const REQUEST_GET_SALARY_BENEFIT: string = 'DedicatedResourcesActions.REQUEST_GET_SALARY_BENEFIT';
export const REQUEST_GET_SALARY_BENEFIT_FINISHED: string = 'DedicatedResourcesActions.REQUEST_GET_SALARY_BENEFIT_FINISHED';

export const requestSalaryBenefit = (contractID: number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SalaryBenefitEnvelope>(
      dispatch,
      REQUEST_GET_SALARY_BENEFIT,
      DedicatedResourcesEffects.requestSalaryBenefit,
      contractID,
      page,
      pageSize,
    );
  };
};

export const REQUEST_DROPDOWN_SALARY_BENEFIT_TYPE: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_TYPE';
export const REQUEST_DROPDOWN_SALARY_BENEFIT_TYPE_FINISHED: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_TYPE_FINISHED';

export const requestDropdownSalaryBenefitType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_DROPDOWN_SALARY_BENEFIT_TYPE,
      DedicatedResourcesEffects.requestDropdownSalaryBenefitType,
    );
  };
};

export const REQUEST_DROPDOWN_SALARY_BENEFIT_DESC: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_DESC';
export const REQUEST_DROPDOWN_SALARY_BENEFIT_DESC_FINISHED: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_DESC_FINISHED';

export const requestDropdownSalaryBenefitDesc = (inum1:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_DROPDOWN_SALARY_BENEFIT_DESC,
      DedicatedResourcesEffects.requestDropdownSalaryBenefitDesc,
      inum1
    );
  };
};

export const REQUEST_DROPDOWN_SALARY_BENEFIT_UMR_YEAR: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_UMR_YEAR';
export const REQUEST_DROPDOWN_SALARY_BENEFIT_UMR_YEAR_FINISHED: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_UMR_YEAR_FINISHED';

export const requestDropdownSalaryBenefitUmrYear = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_DROPDOWN_SALARY_BENEFIT_UMR_YEAR,
      DedicatedResourcesEffects.requestDropdownSalaryBenefitUmrYear,
    );
  };
};

export const REQUEST_DROPDOWN_SALARY_BENEFIT_UMR: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_UMR';
export const REQUEST_DROPDOWN_SALARY_BENEFIT_UMR_FINISHED: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_SALARY_BENEFIT_UMR_FINISHED';

export const requestDropdownSalaryBenefitUmr = (region:string, year:string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_DROPDOWN_SALARY_BENEFIT_UMR,
      DedicatedResourcesEffects.requestDropdownSalaryBenefitUmr,
      region,
      year
    );
  };
};

export const REQUEST_POST_SALARY_BENEFIT: string = "DedicatedResourcesActions.REQUEST_POST_SALARY_BENEFIT";
export const REQUEST_POST_SALARY_BENEFIT_FINISHED = "DedicatedResourcesActions.REQUEST_POST_SALARY_BENEFIT_FINISHED";

export const requestpostSalaryBenefit = (data: SalaryBenefitModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_SALARY_BENEFIT, DedicatedResourcesEffects.requestpostSalaryBenefit, data);
  };
};

export const REQUEST_DEL_SALARY_BENEFIT: string = "DedicatedResourcesActions.REQUEST_DEL_SALARY_BENEFIT";
export const REQUEST_DEL_SALARY_BENEFIT_FINISHED = "DedicatedResourcesActions.REQUEST_DEL_SALARY_BENEFIT_FINISHED";

export const requestDelSalaryBenefit = (salaryID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_DEL_SALARY_BENEFIT, DedicatedResourcesEffects.requestDelSalaryBenefit, salaryID);
  };
};

export const REQUEST_PUT_SALARY_BENEFIT: string = 'DedicatedResourcesActions.REQUEST_PUT_SALARY_BENEFIT';
export const REQUEST_PUT_SALARY_BENEFIT_FINISHED: string = 'DedicatedResourcesActions.REQUEST_PUT_SALARY_BENEFIT_FINISHED';

export const requestPutSalaryBenefit = (data: SalaryBenefitModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_PUT_SALARY_BENEFIT, DedicatedResourcesEffects.requestPutSalaryBenefit, data);
  };
};

export const REQUEST_GET_SALARY_BENEFIT_BYID: string = 'DedicatedResourcesActions.REQUEST_GET_SALARY_BENEFIT_BYID';
export const REQUEST_GET_SALARY_BENEFIT_BYID_FINISHED: string = 'DedicatedResourcesActions.REQUEST_GET_SALARY_BENEFIT_BYID_FINISHED';

export const requestGetSalaryBenefitById = (salaryID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SalaryBenefitModelById>(
      dispatch,
      REQUEST_GET_SALARY_BENEFIT_BYID,
      DedicatedResourcesEffects.requestGetSalaryBenefitById,
      salaryID,
    );
  };
};

export const REQUEST_CURRENT_SALARY: string = 'DedicatedResourcesActions.REQUEST_CURRENT_SALARY';
export const REQUEST_CURRENT_SALARY_FINISHED: string = 'DedicatedResourcesActions.REQUEST_CURRENT_SALARY_FINISHED';

export const requestCurrentSalary = (contractID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_CURRENT_SALARY,
      DedicatedResourcesEffects.requestCurrentSalary,
      contractID
    );
  };
};

export const REQUEST_EMPLOYEE: string = 'EmployeeActions.REQUEST_EMPLOYEE';
export const REQUEST_EMPLOYEE_FINISHED: string = 'EmployeeActions.REQUEST_EMPLOYEE_FINISHED';

export const requestEmployee = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeModel>(dispatch, REQUEST_EMPLOYEE, DedicatedResourcesEffects.requestEmployee);
  };
};

export const REQUEST_DROPDOWN_BUCOST: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_BUCOST';
export const REQUEST_DROPDOWN_BUCOST_FINISHED: string = 'DedicatedResourcesActions.REQUEST_DROPDOWN_BUCOST_FINISHED';

export const requestDropdownBuCost = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownDedicatedResourcesModel>(
      dispatch,
      REQUEST_DROPDOWN_BUCOST,
      DedicatedResourcesEffects.requestDropdownBuCost,
    );
  };
};

export const REQUEST_GET_DOCUMENT_TRACKING: string = 'DedicatedResourcesActions.REQUEST_GET_DOCUMENT_TRACKING';
export const REQUEST_GET_DOCUMENT_TRACKING_FINISHED: string = 'DedicatedResourcesActions.REQUEST_GET_DOCUMENT_TRACKING_FINISHED';

export const requestGetDocumentTracking = (contractID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DocumentTrackingModel>(
      dispatch,
      REQUEST_GET_DOCUMENT_TRACKING,
      DedicatedResourcesEffects.requestGetDocumentTracking,
      contractID,
    );
  };
};

export const REQUEST_POST_RESUBMIT: string = "DedicatedResourcesActions.REQUEST_POST_RESUBMIT";
export const REQUEST_POST_RESUBMIT_FINISHED = "DedicatedResourcesActions.REQUEST_POST_RESUBMIT_FINISHED";

export const requestpostReSubmit = (data: ReSubmitModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_RESUBMIT, DedicatedResourcesEffects.requestpostReSubmit, data);
  };
};

export const REQUEST_CHECK_LAST_EMPLOYEE_CONTRACT: string = 'DedicatedResourcesActions.REQUEST_CHECK_LAST_EMPLOYEE_CONTRACT';
export const REQUEST_CHECK_LAST_EMPLOYEE_CONTRACT_FINISHED: string = 'DedicatedResourcesActions.REQUEST_CHECK_LAST_EMPLOYEE_CONTRACT_FINISHED';

export const requestCheckLastEmployeeContract = (employeeKey: number, contractID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultCheck>(
      dispatch,
      REQUEST_CHECK_LAST_EMPLOYEE_CONTRACT,
      DedicatedResourcesEffects.requestCheckLastEmployeeContract,
      employeeKey,
      contractID,
    );
  };
};

export const REQUEST_CHECK_SUBMIT: string = 'DedicatedResourcesActions.REQUEST_CHECK_SUBMIT';
export const REQUEST_CHECK_SUBMIT_FINISHED: string = 'DedicatedResourcesActions.REQUEST_CHECK_SUBMIT_FINISHED';

export const requestCheckSubmit = (userLoginID: number, contractID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultCheck>(
      dispatch,
      REQUEST_CHECK_SUBMIT,
      DedicatedResourcesEffects.requestCheckSubmit,
      userLoginID,
      contractID,
    );
  };
};

export const REQUEST_CHECK_APPROVAL: string = 'DedicatedResourcesActions.REQUEST_CHECK_APPROVAL';
export const REQUEST_CHECK_APPROVAL_FINISHED: string = 'DedicatedResourcesActions.REQUEST_CHECK_APPROVAL_FINISHED';

export const requestCheckApproval = ( contractID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultCheck>(
      dispatch,
      REQUEST_CHECK_APPROVAL,
      DedicatedResourcesEffects.requestCheckApproval,
      contractID,
    );
  };
};

export const REQUEST_RENEWAL_CONTRACT_BULK_UPDATE: string = 'DedicatedResourcesActions.REQUEST_RENEWAL_CONTRACT_BULK_UPDATE';
export const REQUEST_RENEWAL_CONTRACT_BULK_UPDATE_FINISHED: string = 'DedicatedResourcesActions.REQUEST_RENEWAL_CONTRACT_BULK_UPDATE_FINISHED';

export const requestRenewalContractBulkUpdate = (userLoginID: number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DedicatedResourcesEnvelope>(
      dispatch,
      REQUEST_RENEWAL_CONTRACT_BULK_UPDATE,
      DedicatedResourcesEffects.requestRenewalContractBulkUpdate,
      userLoginID,
      page,
      pageSize,
    );
  };
};

export const SET_IS_EXPORT_EXCEL: string = 'DedicatedResourcesActions.SET_IS_EXPORT_EXCEL';
export const setExportExcel = (isExport: boolean): IAction<boolean> => {
  return ActionUtility.createAction(SET_IS_EXPORT_EXCEL, isExport);
};