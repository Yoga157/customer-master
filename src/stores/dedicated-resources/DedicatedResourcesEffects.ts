import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
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
import OtherBenefitTemplateProjectEnvelope from './models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitLastContractEnvelope';
import OtherBenefitLastContractEnvelope from './models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitLastContractEnvelope';
import WorkFlowHeaderEnvelope from './models/WorkFlowHeaderEnvelope';
import DocumentTrackingModel from './models/DocumentTrackingModel';
import ReSubmitModel from './models/DedicatedResourcesViewEdit/ReSubmitModel';
import ResultCheck from './models/ResultCheck';

const environmentDedicated = "http://10.0.2.41:7021/api/:controller"

export const requestRenewalContract = async (
  userLoginID: number,
  page: number,
  pageSize: number,
  column: string,
  sorting: string,
  search: string
): Promise<DedicatedResourcesEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicated/GetListDashboard?userLoginID=' + userLoginID + '&page=' + page + '&pageSize=' + pageSize + '&column=' + column + '&sorting=' + sorting + '&search=' + search;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DedicatedResourcesEnvelope>(DedicatedResourcesEnvelope, endpoint);
};

export const requestHistoryContract = async (
  EmplID: number,
  page: number,
  pageSize: number,
): Promise<GetHistoryContractEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicated/GetHistoryContractByEmplID?EmplID=' + EmplID + '&page=' + page + '&pageSize=' + pageSize ;
  
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<GetHistoryContractEnvelope>(GetHistoryContractEnvelope, endpoint);
};

export const requestActivityReport = async (
  EmplID: number,
  page: number,
  pageSize: number,
): Promise<GetActivityReportEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicated/GetSummaryActivityReportByEmplID?EmplID=' + EmplID + '&page=' + page + '&pageSize=' + pageSize ;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<GetActivityReportEnvelope>(GetActivityReportEnvelope, endpoint);
};

export const RequestFilterRenewalContract = async (data: FilterRenewalContractModel): Promise<DedicatedResourcesEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicated/FilterSearch';
 ;
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.postToModel<DedicatedResourcesEnvelope>(DedicatedResourcesEnvelope, endpoint, data);
};

export const requestpostInputLastContract = async (data: PostInputDataFromLastContract): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicated/InputDataFromLastContract';
 ;
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestRenewalContractStatus = async (
  userLoginID: number,
  page: number,
  pageSize: number,
  column: string,
  sorting: string,
  status: string
): Promise<DedicatedResourcesEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicated/GetListDashboardStatus?userLoginID=' + userLoginID + '&page=' + page + '&pageSize=' + pageSize + '&column=' + column + '&sorting=' + sorting + '&status=' + status;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DedicatedResourcesEnvelope>(DedicatedResourcesEnvelope, endpoint);
};

export const requestDropdownContractStatus = async (contractID: number): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/GetDropdownContractStatus?contractID=${contractID}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};

export const requestDropdownDepartment = async (userLoginID: number): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/GetDropdownDepartment?userLoginID=${userLoginID}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
   //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};

export const requestDropdownSupervisor = async (userLoginID: number): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/GetDropdownSuperior?userLoginID=${userLoginID}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
   //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};

export const requestpostBulkUpdate = async (data: DedicatedResourcesBulkUpdateModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/BulkUpdate`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestpostBulkUpdateAsDraft = async (data: DedicatedResourcesBulkUpdateModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/BulkUpdateSaveAsDraft`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestListApprovalButton = async (): Promise<ListApprovalModel | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicated/GetListApprovalButton';
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<ListApprovalModel>(ListApprovalModel, endpoint);
};

export const requestGetEmployeeInfo = async (contractID: number): Promise<GetEmployeeInfoModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/GetEmployeeInfoViewEdit?contractID=${contractID}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<GetEmployeeInfoModel>(GetEmployeeInfoModel, endpoint);
};

export const requestPutEmployeeInfo = async (data: PutEmployeeInfoModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicatedViewEdit/UpdateEmployeeInfoViewEdit';
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestGetEmployeeDetail = async (contractID: number): Promise<GetEmployeeDetailModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/GetEmployeeDetailViewEdit?contractID=${contractID}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<GetEmployeeDetailModel>(GetEmployeeDetailModel, endpoint);
};

export const requestPutEmployeeDetail = async (data: PutEmployeeDetailModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicatedViewEdit/UpdateEmployeeDetailViewEdit';
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const removeResult = async (): Promise<ResultActions | HttpErrorResponseModel> => {
  const clearResult = new ResultActions({});
  return clearResult;
};

export const requestTakeHomePay = async (contractID: number): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/TakeHomePay?contractID=${contractID}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};

export const requestpostSubmit = async (data: SubmitModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/Submit`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestpostSubmitApproval = async (data: SubmitApprovalModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/SubmitApproval`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestpostSubmitApprovalDocument = async (data: SubmitApprovalDocumentModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/SubmitApprovalDocument`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestWorkFlowHeader = async (contractID: number, workflowProcessHeader: number): Promise<WorkFlowHeaderEnvelope | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/GetWorkflowByHeader?contractID=${contractID}&workflowProcessHeader=${workflowProcessHeader}`;
  
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.getToModel<WorkFlowHeaderEnvelope>(WorkFlowHeaderEnvelope, endpoint);
};

export const requestVerificationDataStatus = async (contractID: number, status: number): Promise<VerificationDataStatusModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/VerificationDataStatus?contractID=${contractID}&status=${status}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<VerificationDataStatusModel>(VerificationDataStatusModel, endpoint);
};

export const RequestTerminateContract = async (data: TerminateContractModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/TerminateContract`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestDropdownSenderAdmin = async (): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/DropdownSenderAdmin`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};

//ProjectInfo
export const requestGetProjectInfo= async (contractID: number): Promise<GetProjectInfoModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/GetProjectInfoViewEdit?contractID=${contractID}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<GetProjectInfoModel>(GetProjectInfoModel, endpoint);
};

export const requestGetSearchSOOI= async (SOOI: string, ModulSOOI: string): Promise<GetSearchSOOIModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/SearchSOOI?SOOI=${SOOI}&ModulSOOI=${ModulSOOI}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<GetSearchSOOIModel>(GetSearchSOOIModel, endpoint);
};

export const requestPutProjectInfo = async (data: GetProjectInfoModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicatedViewEdit/UpdateProjectInfoViewEdit';
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
    //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

//Deductions

export const requestDeductions = async (
  contractID: number,
  page: number,
  pageSize: number,
): Promise<DeductionsEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicatedViewEdit/GetDeductionDataViewEdit?contractID=' + contractID + '&page=' + page + '&pageSize=' + pageSize;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DeductionsEnvelope>(DeductionsEnvelope, endpoint);
};

export const requestDropdownDeductionType = async (): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/GetDropdownDeductionType`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};


export const requestDropdownDeductionDesc = async (type: string): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/GetDropdownDeductionDescription?type=` + type;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};

export const requestGetDeductionById = async (deductID: number): Promise<DeductionsModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/GetDeductionDataById?deductID=${deductID}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DeductionsModel>(DeductionsModel, endpoint);
};

export const requestpostDeduction = async (data: DeductionsModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/SaveDeductionData`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestDelDeduction = async (deductID: number): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/DeleteDeductionData?deductID=${deductID}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

export const requestPutDeductionData = async (data: DeductionsModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicatedViewEdit/UpdateDeductionData';
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

//OtherBenefit
export const requestOtherBenefit = async (
  contractID: number,
  page: number,
  pageSize: number,
): Promise<OtherBenefitEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicatedViewEdit/GetOtherBenefitViewEdit?contractID=' + contractID + '&page=' + page + '&pageSize=' + pageSize;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<OtherBenefitEnvelope>(OtherBenefitEnvelope, endpoint);
};

export const requestOtherLastContract = async (
  contractID: number,
): Promise<OtherBenefitLastContractEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicatedViewEdit/GetOtherBenefitTemplateProjectLastContractViewEdit?contractID=' + contractID ;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
   //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<OtherBenefitLastContractEnvelope>(OtherBenefitLastContractEnvelope, endpoint);
};

export const requestOtherTemplateProject = async (
  ProjectTemplateID: number,
  contractID: number,
): Promise<OtherBenefitTemplateProject | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicatedViewEdit/GetOtherBenefitTemplateProjectViewEdit?contractID=' + contractID + '&ProjectTemplateID=' + ProjectTemplateID ;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<OtherBenefitTemplateProject>(OtherBenefitTemplateProject, endpoint);
};


export const requestDropdownOtherBenefitType = async (): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/GetDropdownOtherBenefitType`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};

export const requestDropdownOtherBenefitDesc = async (type:string): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/GetDropdownOtherBenefitDescription?type=${type}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};

export const requestpostOtherBenefit = async (data: SaveOtherBenefitModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/SaveOtherBenefit`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestDelOtherBenefit = async (benefitID: number): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/DeleteOtherBenefit?benefitID=${benefitID}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

export const requestPutOtherBenefit = async (data: OtherBenefitModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicatedViewEdit/UpdateOtherBenefit';
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

//Salary Benefit
export const requestSalaryBenefit = async (
  contractID: number,
  page: number,
  pageSize: number,
): Promise<SalaryBenefitEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicatedViewEdit/GetSalaryBenefitViewEdit?contractID=' + contractID + '&page=' + page + '&pageSize=' + pageSize;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<SalaryBenefitEnvelope>(SalaryBenefitEnvelope, endpoint);
};

export const requestDropdownSalaryBenefitType = async (): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/DropdownByEntryKey?entryKey=SalaryBenefitType`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};

export const requestDropdownSalaryBenefitDesc = async (inum1: string): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/DropdownByEntryKeyInum1?entryKey=SalaryBenefitDesc&inum1=${inum1}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};

export const requestDropdownContractStatusFilter = async (): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/DropdownByEntryKeyInum1?entryKey=ContractStatus&inum1=${1}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};

export const requestDropdownSalaryBenefitUmrYear = async (): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/DropdownUMRYearSalaryBenefit`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};

export const requestDropdownSalaryBenefitUmr = async (region: string, year: string): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/DropdownUMRSalaryBenefit?region=${region}&year=${year}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};

export const requestpostSalaryBenefit = async (data: SalaryBenefitModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/SalaryBenefitViewEdit`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestDelSalaryBenefit = async (salaryID: number): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedViewEdit/DeleteSalaryBenefitViewEdit?salaryID=${salaryID}`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

export const requestPutSalaryBenefit = async (data: SalaryBenefitModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicatedViewEdit/UpdateSalaryBenefitViewEdit';
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestGetSalaryBenefitById = async (salaryID: number): Promise<SalaryBenefitModelById | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedSalary/GetByIDEdit?salaryID=${salaryID}`;
  
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<SalaryBenefitModelById>(SalaryBenefitModelById, endpoint);
};

export const requestCurrentSalary = async (contractID: number): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedSalary/GetCurrentSalary?contractID=${contractID}`;
  
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};

export const requestEmployee = async (): Promise<EmployeeModel | HttpErrorResponseModel> => {
  const controllerName = `Employee`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<EmployeeModel>(EmployeeModel, endpoint);
};

export const requestDropdownBuCost = async (): Promise<DropdownDedicatedResourcesModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/DropdownByEntryKey?entryKey=Bucost`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownDedicatedResourcesModel>(DropdownDedicatedResourcesModel, endpoint);
};

export const requestGetDocumentTracking = async (contractID: number): Promise<DocumentTrackingModel | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicatedDocumentTracking/GetByContractID?contractID=${contractID}`;
  
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DocumentTrackingModel>(DocumentTrackingModel, endpoint);
};

export const requestpostReSubmit = async (data: ReSubmitModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/Resubmit`;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestCheckLastEmployeeContract = async (employeeKey: number, contractID: number): Promise<ResultCheck | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/CheckLastEmployeeContract?employeeKey=${employeeKey}&contractID=${contractID}`;
  
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<ResultCheck>(ResultCheck, endpoint);
};

export const requestCheckSubmit = async (userLoginID: number, contractID: number): Promise<ResultCheck | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/IsSubmitEnable?userLoginID=${userLoginID}&contractID=${contractID}`;
  
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<ResultCheck>(ResultCheck, endpoint);
};

export const requestCheckApproval = async (contractID: number): Promise<ResultCheck | HttpErrorResponseModel> => {
  const controllerName = `RenewalDedicated/CheckApprovalSubmitCompleted?contractID=${contractID}`;
  
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<ResultCheck>(ResultCheck, endpoint);
};

export const requestRenewalContractBulkUpdate = async (
  userLoginID: number,
  page: number,
  pageSize: number,
): Promise<DedicatedResourcesEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'RenewalDedicated/GetListDashboardBulkUpdate?userLoginID=' + userLoginID + '&page=' + page + '&pageSize=' + pageSize ;
 
  const endpoint: string = environment.api.dedicated.replace(':controller', controllerName);
  //const endpoint: string = environmentDedicated.replace(':controller', controllerName);

  return EffectUtility.getToModel<DedicatedResourcesEnvelope>(DedicatedResourcesEnvelope, endpoint);
};
