import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import WorkActivityReportModel from './models/WorkActivityReportModel';
import ActivityReportViewModel from './models/ActivityReportViewModel';
import ListWorkAttachmentModel from './models/ListWorkAttachmentModel';
import DropdownTextValueModel from './models/DropdownTextValueModel';
import ActivityCategoryModel from './models/ActivityCategoryModel';
import WorklistHistoryModel from './models/WorklistHistoryModel';
import WorkListDetailModel from './models/WorkListDetailModel';
import * as EffectUtility from '../../utilities/EffectUtility';
import ReAssignWorkModel from './models/ReAssignWorkModel';
import ProductListModel from './models/ProductListModel';
import WorkListModel from './models/WorkListModel';
import ResultActions from 'models/ResultActions';
import environment from 'environment';

  export const getWorklist = async (page: number, pageSize: number, column: string, sorting: string, userLoginId: number ): Promise<WorkListModel | HttpErrorResponseModel> => {  
  const controllerName = `Work/Dashboard?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&userLoginId=${userLoginId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<WorkListModel>(WorkListModel, endpoint);
};

  export const getWorklistSearch = async (page: number, pageSize: number, column: string, sorting: string, search: string, userLoginId: number ): Promise<WorkListModel | HttpErrorResponseModel> => {  
  const controllerName = `Work/Search?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&search=${search.replace('#', '%23')}&userLoginId=${userLoginId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<WorkListModel>(WorkListModel, endpoint);
};

  export const reqGetDetailWorklist = async (taskId: number): Promise<WorkListDetailModel | HttpErrorResponseModel> => {  
  const controllerName = `Work/TaskDetail?taskId=${taskId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<WorkListDetailModel>(WorkListDetailModel, endpoint);
};

  export const getWorkActivityReport = async (activePage: number, pageSize: number, uid: string): Promise<WorkActivityReportModel | HttpErrorResponseModel> => {  
  const controllerName = `ActivityReport/Work?page=${activePage}&pageSize=${pageSize}&ticketId=${uid}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<WorkActivityReportModel>(WorkActivityReportModel, endpoint);
};

  export const getListWorkAttachment = async (activePage: number, pageSize: number, modul: number, docNumber: string): Promise<ListWorkAttachmentModel | HttpErrorResponseModel> => {  
  const controllerName = `WorkAttachment/GetList?page=${activePage}&pageSize=${pageSize}&modul=${modul}&docNumber=${docNumber}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<ListWorkAttachmentModel>(ListWorkAttachmentModel, endpoint);
};

  export const deleteWorkAttachment = async (attachmentId: string): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = `WorkAttachment/Delete?attachmentId=${attachmentId}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

export const putTask= async(data: any):Promise<ResultActions | HttpErrorResponseModel > => {
  let controllerName = 'Work/UpdateTask';
  const endpoint: string = environment.api.generic.replace(':controller',controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const postWorkAttachment= async(data: any):Promise<ResultActions | HttpErrorResponseModel > => {
  let controllerName = 'WorkAttachment/Upload';
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);
  return EffectUtility.postUpload<ResultActions>(ResultActions, endpoint, data);
};

export const postActivityReport= async(data: any):Promise<ResultActions | HttpErrorResponseModel > => {
  let controllerName = 'ActivityReport';
  const endpoint: string = environment.api.generic.replace(':controller',controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const getActivityReportBy = async(activityReportGenID: number):Promise<ActivityReportViewModel | HttpErrorResponseModel > => {
  let controllerName = `ActivityReport/${activityReportGenID}`;
  const endpoint: string = environment.api.generic.replace(':controller',controllerName);
  return EffectUtility.getToModel<ActivityReportViewModel>(ActivityReportViewModel, endpoint);
};

export const getListActivityReportProduct = async(activityReportGenID: number):Promise<ProductListModel[] | HttpErrorResponseModel > => {
  let controllerName = `ActivityReportItem?activityReportGenID=${activityReportGenID}`;
  const endpoint: string = environment.api.generic.replace(':controller',controllerName);
  return EffectUtility.getToModel<ProductListModel[]>(ProductListModel, endpoint);
};

  export const reqReAssignWork = async (data: ReAssignWorkModel): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = `Work/ReassignWork`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

  export const getWorklistFilter = async (data: any): Promise<WorkListModel | HttpErrorResponseModel> => {  
  const controllerName = `Work/FilterSearch`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<WorkListModel>(WorkListModel, endpoint, data);
};

  export const getDropdownActivityCategory = async (): Promise<ActivityCategoryModel[] | HttpErrorResponseModel> => {  
  const controllerName = "ActivityReportCategory"
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ActivityCategoryModel[] >(ActivityCategoryModel, endpoint);
};

  export const getHistory = async (id: number): Promise<WorklistHistoryModel[] | HttpErrorResponseModel> => {  
  const controllerName = `Work/History?workId=${id}`
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<WorklistHistoryModel[] >(WorklistHistoryModel, endpoint);
};

export const getDropdown = async (dropdown: string, taskId?: number, userLoginId?: number): Promise<DropdownTextValueModel[] | HttpErrorResponseModel> => {  
  const controllerName = dropdown === "workType" ? 'Work/DropdownType' : 
  dropdown === "taskStatus" ? `Work/DropdownAllowedStatus?workId=${taskId}&userLoginId=${userLoginId}` :
  dropdown === "project" ? `Work/GetProjectList?userLoginId=${userLoginId}` : 
  dropdown === "customer" ? `Work/GetCustomerList?userLoginId=${userLoginId}` : 
  dropdown === "employee" ? `Work/GetEngineerList?userLoginId=${userLoginId}` : "";
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<DropdownTextValueModel[] >(DropdownTextValueModel, endpoint);
};

export const getFilterBy = async (dropdown: string, taskId?: number, userLoginId?: number): Promise<DropdownTextValueModel[] | HttpErrorResponseModel> => {  
  const controllerName =  dropdown === "statusWorkAll" ? `Work/DropdownStatus` : "";
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<DropdownTextValueModel[] >(DropdownTextValueModel, endpoint);
};

  export const getDropdownByFunnelID = async (dropdown: string, funnelGenId?: number, branch?: string): Promise<DropdownTextValueModel[] | HttpErrorResponseModel> => {  
  const controllerName = dropdown === "branch" ? `Work/DropdownBrand?funnelGenId=${funnelGenId}` : 
  dropdown === "subBranch" ? `Work/DropdownSubbrand?brand=${branch}&funnelGenId=${funnelGenId}` : "";
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownTextValueModel[] >(DropdownTextValueModel, endpoint);
};

export const copyFunnelAttachment = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = `WorkAttachment/CopyFunnelAttachment`
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};