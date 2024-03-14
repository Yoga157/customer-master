import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as EffectUtility from '../../utilities/EffectUtility';
import FunnelDashboardEnvelope from './models/FunnelDashboardEnvelope';
import FunnelHistoryEnvelope from './models/FunnelHistoryEnvelope';
import FunnelModel from './models/FunnelModel';
import FunnelsModel from './models/FunnelsModel';
import FunnelViewEditStatus from './models/view-edit/FunnelViewEditStatus';
import FunnelViewEditCustomer from './models/view-edit/FunnelViewEditCustomer';
import FunnelViewEditSelling from './models/view-edit/FunnelViewEditSelling';
import FunnelViewEditCustomerPO from './models/view-edit/FunnelViewEditCustomerPO';
import FunnelViewEditAdditional from './models/view-edit/FunnelViewEditAdditional';
import FunnelAuthorization from './models/FunnelAuthorization';
import FunnelSoftware from './models/view-edit/FunnelSoftware';
import FunnelViewEditCustomerDetails from './models/view-edit/FunnelViewEditCustomerDetails';
import { FunnelViewEditConfirmation, ServiceAreaBufferResource } from './models/view-edit';
import FunnelHeaderNameModel from './models/FunnelHeaderNameModel';
import ResultActions from 'models/ResultActions';
import FunnelFilter from './models/FunnelFilter';
import FunnelVerificationModelEnvelope from './models/FunnelVerificationModelEnvelope';
import FunnelVerificationModel from './models/FunnelVerificationModel';
import FunnelDepartmentModel from './models/FunnelDepartmentModel';
import FunnelViewEditCommisionIndex from './models/view-edit/FunnelViewEditCommisionIndex';
import { NumberFormatProps } from 'react-number-format';
import FunnelCurrencyUdcModel from './models/FunnelCurrencyUdcModel';
import FunnelRateModel from './models/FunnelRateModel';
import FunnelHistoryGpm from './models/FunnelHistoryGpm';
import FunnelStatusModel from '../funnel-status/models/FunnelStatusModel';
import FunnelEntryKeyByModel from './models/FunnelEntryKeyByModel';
import FunnelViewEditCustomerByProjectId from './models/view-edit/FunnelViewEditCustomerByProjectId';
import EmployeeHierarcyModel from 'stores/employee/models/EmployeeHierarcyModel';
import FunnelDropdownConfirmation from './models/FunnelDropdownConfirmation';

export const requestFunnel = async (
  salesID: number,
  role: string,
  column: string,
  sorting: string,
  type: string,
  page: number,
  pageSize: number
): Promise<FunnelDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName =
    'Funnel/salesId=' +
    salesID +
    '?role=' +
    role +
    '&column=' +
    column +
    '&sorting=' +
    sorting +
    '&type=' +
    type +
    '&page=' +
    page +
    '&pageSize=' +
    pageSize;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelDashboardEnvelope>(FunnelDashboardEnvelope, endpoint);
};

export const removeResult = async (): Promise<ResultActions | HttpErrorResponseModel> => {
  const clearResult = new ResultActions({});
  return clearResult;
};

export const requestSA = async (
  salesID: number,
  role: string,
  column: string,
  sorting: string,
  page: number,
  pageSize: number
): Promise<FunnelDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName =
    'FunnelSalesAnalyst/salesId=' +
    salesID +
    '?role=' +
    role +
    '&column=' +
    column +
    '&sorting=' +
    sorting +
    '&page=' +
    page +
    '&pageSize=' +
    pageSize;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelDashboardEnvelope>(FunnelDashboardEnvelope, endpoint);
};

export const postFunnel = async (data: FunnelsModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'Funnel';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestFunnelById = async (funnelGenID: number): Promise<FunnelModel | HttpErrorResponseModel> => {
  const controllerName = 'Funnel/' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelModel>(FunnelModel, endpoint);
};

export const requestViewFunnelStatusById = async (funnelGenID: number): Promise<FunnelViewEditStatus | HttpErrorResponseModel> => {
  const controllerName = 'FunnelViewEditStatus?funnelGenID=' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelViewEditStatus>(FunnelViewEditStatus, endpoint);
};

export const putViewFunnelStatus = async (data: FunnelViewEditStatus): Promise<FunnelViewEditStatus | HttpErrorResponseModel> => {
  const controllerName = 'FunnelViewEditStatus';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<FunnelViewEditStatus>(FunnelViewEditStatus, endpoint, data);
};

export const requestViewFunnelCustomerDetailById = async (funnelGenID: number): Promise<FunnelViewEditCustomerDetails | HttpErrorResponseModel> => {
  const controllerName = 'FunnelViewEditCustomerDetails?funnelGenID=' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelViewEditCustomerDetails>(FunnelViewEditCustomerDetails, endpoint);
};

export const requestViewFunnelCustomerById = async (funnelGenID: number): Promise<FunnelViewEditCustomer | HttpErrorResponseModel> => {
  const controllerName = 'FunnelViewEditCustomer?funnelGenID=' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelViewEditCustomer>(FunnelViewEditCustomer, endpoint);
};


export const getEmployeeBy = async (operationtype: string, accountname: string): Promise<EmployeeHierarcyModel[] | HttpErrorResponseModel> => {
  const controllerName = `EmployeeHierarcy?operationtype=${operationtype}&accountname=${accountname}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<EmployeeHierarcyModel[]>(EmployeeHierarcyModel, endpoint);
};

export const putViewFunnelCustomer = async (data: FunnelViewEditCustomer): Promise<FunnelViewEditCustomer | HttpErrorResponseModel> => {
  const controllerName = 'FunnelViewEditCustomer';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<FunnelViewEditCustomer>(FunnelViewEditCustomer, endpoint, data);
};

export const reqPMOPCustomerBy = async (projectId: number): Promise<FunnelViewEditCustomerByProjectId | HttpErrorResponseModel> => {
  const controllerName = `PMOProjectViewEditCustomerProject?projectId=${projectId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelViewEditCustomerByProjectId>(FunnelViewEditCustomerByProjectId, endpoint);
};

export const putEstimationByPmo = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'PMOProject';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const updateProjectAlias = async (ProjectAlias:string,UserLoginID:number,FunnelGenID:number): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `FunnelViewEditCustomer/UpdateProjectAlias?ProjectAlias=${ProjectAlias}&UserLoginID=${UserLoginID}&FunnelGenID=${FunnelGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint);
};

export const requestViewFunnelSellingById = async (funnelGenID: number): Promise<FunnelViewEditSelling | HttpErrorResponseModel> => {
  const controllerName = 'FunnelViewEditSelling?funnelGenID=' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelViewEditSelling>(FunnelViewEditSelling, endpoint);
};

export const putViewFunnelSelling = async (data: FunnelViewEditSelling): Promise<FunnelViewEditSelling | HttpErrorResponseModel> => {
  const controllerName = 'FunnelViewEditSelling';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<FunnelViewEditSelling>(FunnelViewEditSelling, endpoint, data);
};

export const requestViewFunnelCustomerPOById = async (funnelGenID: number): Promise<FunnelViewEditCustomerPO | HttpErrorResponseModel> => {
  const controllerName = 'FunnelViewEditPO?funnelGenID=' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelViewEditCustomerPO>(FunnelViewEditCustomerPO, endpoint);
};

// export const putViewFunnelCustomerPO = async (data: FunnelViewEditCustomerPO): Promise<FunnelViewEditCustomerPO | HttpErrorResponseModel> => {
//   const controllerName = 'FunnelViewEditPO';
//   const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
//   return EffectUtility.putToModel<FunnelViewEditCustomerPO>(FunnelViewEditCustomerPO, endpoint, data);
// };
export const putViewFunnelCustomerPO = async (data: ResultActions): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'FunnelViewEditPO';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestViewFunnelAdditionalById = async (funnelGenID: number): Promise<FunnelViewEditAdditional | HttpErrorResponseModel> => {
  const controllerName = 'FunnelViewEditAdditional?funnelGenID=' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelViewEditAdditional>(FunnelViewEditAdditional, endpoint);
};

export const putViewFunnelAdditional = async (data: FunnelViewEditAdditional): Promise<FunnelViewEditAdditional | HttpErrorResponseModel> => {
  const controllerName = 'FunnelViewEditAdditional';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<FunnelViewEditAdditional>(FunnelViewEditAdditional, endpoint, data);
};

export const requestServiceAreaBufferResourceById = async (funnelGenID: number): Promise<ServiceAreaBufferResource | HttpErrorResponseModel> => {
  const controllerName = 'ServiceAreaBufferResource?funnelGenID=' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<ServiceAreaBufferResource>(ServiceAreaBufferResource, endpoint);
};

export const putServiceAreaBufferResource = async (data: ServiceAreaBufferResource): Promise<ServiceAreaBufferResource | HttpErrorResponseModel> => {
  const controllerName = 'ServiceAreaBufferResource';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ServiceAreaBufferResource>(ServiceAreaBufferResource, endpoint, data);
};

export const postFunnelHeaderLocal = async (data: FunnelHeaderNameModel): Promise<FunnelHeaderNameModel | HttpErrorResponseModel> => {
  const funnelHeader = new FunnelHeaderNameModel(data);
  localStorage.setItem('funnelHeader', JSON.stringify(data));
  return funnelHeader;
};

export const requestFunnelHeaderLocal = async (): Promise<FunnelHeaderNameModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('funnelHeader');

  let listFunnelHeader: FunnelHeaderNameModel = new FunnelHeaderNameModel({});
  if (jsonString !== null) {
    listFunnelHeader = JSON.parse(jsonString);
  }
  const result = new FunnelHeaderNameModel(listFunnelHeader);
  return result;
};

export const requestSearchSA = async (
  salesID: number,
  searchText: string,
  page: number,
  pageSize: number,
  column: string,
  sorting: string
): Promise<FunnelDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName =
    'FunnelSalesAnalyst/Search?salesID=' +
    salesID +
    '&column=' +
    column +
    '&sorting=' +
    sorting +
    '&page=' +
    page +
    '&pageSize=' +
    pageSize +
    '&search=' +
    searchText;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelDashboardEnvelope>(FunnelDashboardEnvelope, endpoint);
};

export const requestSearchFunnel = async (
  salesID: number,
  searchText: string,
  page: number,
  pageSize: number,
  type: string,
  column: string,
  sorting: string
): Promise<FunnelDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName =
    'Funnel/Search?salesID=' +
    salesID +
    '&column=' +
    column +
    '&sorting=' +
    sorting +
    '&page=' +
    page +
    '&pageSize=' +
    pageSize +
    '&type=' +
    type +
    '&search=' +
    searchText;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelDashboardEnvelope>(FunnelDashboardEnvelope, endpoint);
};

export const postFunnelFilter = async (data: FunnelFilter): Promise<FunnelDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'Funnel/FilterSearch';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<FunnelDashboardEnvelope>(FunnelDashboardEnvelope, endpoint, data);
};

export const postSAFilter = async (data: FunnelFilter): Promise<FunnelDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSalesAnalyst/FilterSearch';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<FunnelDashboardEnvelope>(FunnelDashboardEnvelope, endpoint, data);
};

export const requestVerificationFunnel = async (
  funnelGenID: number,
  status: NumberFormatProps
): Promise<FunnelVerificationModelEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'Funnel/VerificationData?funnelGenID=' + funnelGenID + '&page=' + 1 + '&pageSize=' + 15 + '&status=' + status;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelVerificationModelEnvelope>(FunnelVerificationModelEnvelope, endpoint);
};

export const delFunnel = async (funnelGenID: number, userLogin: number): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `Funnel?funnelGenID=${funnelGenID}&salesID=${userLogin}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

export const requestVerificationFunnelStatus = async (
  funnelGenID: number,
  statusID: number
): Promise<FunnelVerificationModel | HttpErrorResponseModel> => {
  const controllerName = `Funnel/VerificationDataStatus?funnelGenID=${funnelGenID}&status=${statusID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelVerificationModel>(FunnelVerificationModel, endpoint);
};

export const requestFunnelDepartment = async (salesID: number): Promise<FunnelDepartmentModel[] | HttpErrorResponseModel> => {
  const controllerName = `FunnelEmployee/${salesID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelDepartmentModel[]>(FunnelDepartmentModel, endpoint);
};

export const putSoftware = async (data: FunnelSoftware): Promise<FunnelSoftware | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSoftware';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<FunnelSoftware>(FunnelSoftware, endpoint, data);
};

export const requestViewFunneCommissionIndex = async (funnelGenID: number): Promise<FunnelViewEditCommisionIndex | HttpErrorResponseModel> => {
  const controllerName = 'FunnelViewEditCommissionIndex?funnelGenID=' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelViewEditCommisionIndex>(FunnelViewEditCommisionIndex, endpoint);
};

export const putViewFunnelCommissionIndex = async (
  data: FunnelViewEditCommisionIndex
): Promise<FunnelViewEditCommisionIndex | HttpErrorResponseModel> => {
  const controllerName = 'FunnelViewEditCommissionIndex';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<FunnelViewEditCommisionIndex>(FunnelViewEditCommisionIndex, endpoint, data);
};

export const requestFunnelCommissionHistory = async (
  funnelGenID: number
): Promise<FunnelHistoryEnvelope[] | HttpErrorResponseModel> => {
  const controllerName = `FunnelViewEditCommissionIndex/History?funnelGenID=${funnelGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelHistoryEnvelope[]>(FunnelHistoryEnvelope, endpoint, funnelGenID);
};

export const requestFunnelAuthorization = async (
  funnelGenID: number,
  userloginID: number,
  flagOwner: number
): Promise<FunnelAuthorization | HttpErrorResponseModel> => {
  const controllerName = `Funnel/CheckFunnelAuthorization?funnelGenID=${funnelGenID}&userLoginID=${userloginID}&flagOwner=${flagOwner}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelAuthorization>(FunnelAuthorization, endpoint);
};

export const reqDataEntyKeyBy = async (by, sorting?): Promise<FunnelEntryKeyByModel[] | HttpErrorResponseModel> => {
  const controllerName =  by === "ProjectStatus" ? `Udc/GetByEntryKey/ProjectStatus` : `Udc/GetByEntryKey/${by}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelEntryKeyByModel[]>(FunnelEntryKeyByModel, endpoint);
};

export const requestCurrency = async (): Promise<FunnelCurrencyUdcModel[] | HttpErrorResponseModel> => {
  const controllerName = 'Udc/GetByEntryKey/currency';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelCurrencyUdcModel[]>(FunnelCurrencyUdcModel, endpoint);
};

export const requestFunnelHistoryById = async (funnelGenID: number): Promise<FunnelHistoryEnvelope[] | HttpErrorResponseModel> => {
  const controllerName = `Funnel/History?funnelGenID=${funnelGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelHistoryEnvelope[]>(FunnelHistoryEnvelope, endpoint);
};

export const requestRate = async (currency: string, date: string): Promise<FunnelRateModel | HttpErrorResponseModel> => {
  const controllerName = `Funnel/GetRate?currency=${currency}&date=${date}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelRateModel>(FunnelRateModel, endpoint);
};

//Hendz 07/03/2022
export const requestProjectCategorySA = async (): Promise<FunnelCurrencyUdcModel[] | HttpErrorResponseModel> => {
  const controllerName = 'Udc/GetByEntryKey/ProjectCategorySA';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelCurrencyUdcModel[]>(FunnelCurrencyUdcModel, endpoint);
};

//Hendz 27/06/2022
export const requestComplexity = async (): Promise<FunnelStatusModel[] | HttpErrorResponseModel> => {
  const controllerName = 'Funnel/DropdownComplexity';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelStatusModel[]>(FunnelStatusModel, endpoint);
};

export const updateComplexity = async (
  Complexity: number,
  UserLoginID: number,
  FunnelGenID: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `FunnelViewEditCustomer/UpdateComplexity?Complexity=${Complexity}&UserLoginID=${UserLoginID}&FunnelGenID=${FunnelGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint);
};

export const getHistoryGPM = async (funnelGenID: number,page:number,pageSize:number): Promise<FunnelHistoryGpm | HttpErrorResponseModel> => {
  const controllerName = `Funnel/GetHistoryGPM?funnelGenID=${funnelGenID}&page=${page}&pageSize=${pageSize}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelHistoryGpm>(FunnelHistoryGpm, endpoint);
};

export const putViewFunnelConfirmation = async (
  data: FunnelViewEditConfirmation
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `FunnelViewEditConfirmation`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestViewFunnelConfimation = async (funnelGenID: number): Promise<FunnelViewEditConfirmation | HttpErrorResponseModel> => {
  const controllerName = `FunnelViewEditConfirmation?funnelGenID=${funnelGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelViewEditConfirmation>(FunnelViewEditConfirmation, endpoint);
};

export const requestViewFunnelDropdownCustomerConfimation = async (): Promise<FunnelDropdownConfirmation[] | HttpErrorResponseModel> => {
  const controllerName = `Udc/GetByEntryKey/CustomerConfirmationStatus`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelDropdownConfirmation[]>(FunnelDropdownConfirmation, endpoint);
};

export const requestViewFunnelDropdownUserConfimation = async (): Promise<FunnelDropdownConfirmation[] | HttpErrorResponseModel> => {
  const controllerName = `Udc/GetByEntryKey/UserConfirmationStatus`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelDropdownConfirmation[]>(FunnelDropdownConfirmation, endpoint);
};