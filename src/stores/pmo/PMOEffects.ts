import PMOViewEditProjectStatusEditModel from './models/PMOViewEditProjectStatusEditModel';
import PMORequirementClosingProject from './models/PMORequirementClosingProject';
import CustomerForPmoProjectModel from './models/CustomerForPmoProjectModel';
import PMOProgressDetailMilestone from './models/PMOProgressDetailMilestone';
import PMOViewEditProjectStatus from './models/PMOViewEditProjectStatus';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import CheckAllowedUpdateModel from './models/CheckAllowedUpdateModel';
import PMOViewEditCustommerPO from './models/PMOViewEditCustommerPO';
import PMOGetActualDateModel from './models/PMOGetActualDateModel';
import PMOGetByEntryKeyModel from './models/PMOGetByEntryKeyModel';
import PMOProgressMilestone from './models/PMOProgressMilestone';
import * as EffectUtility from '../../utilities/EffectUtility';
import PMOProjectByIDModel from './models/PMOProjectByIDModel';
import PMOProjectEmplove from './models/PMOProjectEmplove';
import PMOViewEditStatus from './models/PMOViewEditStatus';
import ApprovalSMOModel from './models/ApprovalSMOModel';
import ReassignPmoModel from './models/ReassignPmoModel';
import PMOHandOverModel from './models/PMOHandOverModel';
import PMOListEnvelope from './models/PMOListEnvelope';
import PMOTopListModel from './models/PMOTopListModel';
import PMOSTypeSelect from './models/PMOSTypeSelect';
import PMOSOorOIExist from './models/PMOSOorOIExist';
import ResultActions from 'models/ResultActions';
import PMOFilter from './models/PMOFilter';
import environment from 'environment';


  export const reqPMOList = async (page: number, pageSize: number,column: string, sorting: string, userLoginId:number): Promise<PMOListEnvelope | HttpErrorResponseModel> => {
  const controllerName = `PMOProject/Dashboard?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&userLoginId=${userLoginId}`
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOListEnvelope>(PMOListEnvelope, endpoint);
};

  export const reqPMOListBySearch = async (page: number, pageSize: number,column: string, sorting: string, search:string, userLoginId:number): Promise<PMOListEnvelope | HttpErrorResponseModel> => {
  const controllerName = `PMOProject/Search?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&search=${search}&userLoginId=${userLoginId}`
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOListEnvelope>(PMOListEnvelope, endpoint);
};

  export const postPMOFilter = async (data: PMOFilter): Promise<PMOListEnvelope | HttpErrorResponseModel> => {  
  const controllerName = 'PMOProject/FilterSearch';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<PMOListEnvelope>(PMOListEnvelope, endpoint, data);
};

  export const reqFunnelSOorOiExist = async (funnelGenID?:string): Promise<PMOSOorOIExist[] | HttpErrorResponseModel> => {  
  const controllerName = `Funnel/SearchFunnelWithSOOrOIExist?search=${funnelGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOSOorOIExist[]>(PMOSOorOIExist, endpoint);
};

  export const getCustomerForPmoProject = async (funnelGenID: number): Promise<CustomerForPmoProjectModel | HttpErrorResponseModel> => {  
  const controllerName = `FunnelViewEditCustomer/ForPmoProject?funnelGenID=${funnelGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<CustomerForPmoProjectModel>(CustomerForPmoProjectModel, endpoint);
};

  export const reqProjectDrp = async (userLoginId:string): Promise<PMOSTypeSelect[] | HttpErrorResponseModel> => {  
  const controllerName = `PMOProject/GetProjectList?userLoginId=${userLoginId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOSTypeSelect[]>(PMOSTypeSelect, endpoint);
};

  export const reqCustomerDrp = async (userLoginId:string): Promise<PMOSTypeSelect[] | HttpErrorResponseModel> => {  
  const controllerName = `PMOProject/GetCustomerList?userLoginId=${userLoginId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOSTypeSelect[]>(PMOSTypeSelect, endpoint);
};

  export const reqAssignDrp = async (userLoginId:string): Promise<PMOSTypeSelect[] | HttpErrorResponseModel> => {  
  const controllerName = `PMOProject/GetPmoList?userLoginId=${userLoginId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOSTypeSelect[]>(PMOSTypeSelect, endpoint);
};

  export const reqSalesDrp = async (userLoginId:string): Promise<PMOSTypeSelect[] | HttpErrorResponseModel> => {  
  const controllerName = `PMOProject/GetSalesList?userLoginId=${userLoginId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOSTypeSelect[]>(PMOSTypeSelect, endpoint);
};

  export const reqPMOSummaryStatus = async (): Promise<PMOSTypeSelect[] | HttpErrorResponseModel> => {                         
  const controllerName = `PMOProject/SummaryPerStatus`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOSTypeSelect[]>(PMOSTypeSelect, endpoint);
};

  export const reqPMOCustommerViewEditPO = async (projectId:number): Promise<PMOViewEditCustommerPO | HttpErrorResponseModel> => {                         
  const controllerName = `PMOProjectViewEditSalesFunnel?projectId=${projectId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOViewEditCustommerPO>(PMOViewEditCustommerPO, endpoint);
};

  export const reqStatusProjectViewEdit = async (status:string,projectId:number): Promise<PMOViewEditStatus | HttpErrorResponseModel> => {  
  let controllerName:string;
  if(status === "ProjectSummary"){
    controllerName = `PMOProject/ProjectSummary?projectId=${projectId}`;
  } else{
    controllerName = `PMOProject/LatestMilestone?projectId=${projectId}`;
  }                      
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOViewEditStatus>(PMOViewEditStatus, endpoint);
};

  export const reqProgressMilestone = async (projectId:number): Promise<PMOProgressMilestone | HttpErrorResponseModel> => {  
  const controllerName = `PMOProject/ProgressMilestone?projectId=${projectId}`;                     
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOProgressMilestone>(PMOProgressMilestone, endpoint);
};

  export const reqProgressDetailMilestone = async (projectId:number): Promise<PMOProgressDetailMilestone | HttpErrorResponseModel> => {  
  const controllerName = `PMOProject/DetailProgressMilestone?projectId=${projectId}`;                     
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOProgressDetailMilestone>(PMOProgressDetailMilestone, endpoint);
};

  export const reqViewEditProjectStatus = async (projectId: number): Promise<PMOViewEditProjectStatus | HttpErrorResponseModel> => {  
  const controllerName = `PMOProjectViewEditProjectStatus?projectId=${projectId}`;                     
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOViewEditProjectStatus>(PMOViewEditProjectStatus, endpoint);
};

export const reqRequirementClosingProject = async (projectId:number,funnelGenId:number, projectStatus: string): Promise<PMORequirementClosingProject | HttpErrorResponseModel> => {  
  const controllerName = `PMOProject/RequirementClosingProject?projectId=${projectId}&funnelGenId=${funnelGenId}&projectStatus=${projectStatus}`;                     
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMORequirementClosingProject>(PMORequirementClosingProject, endpoint);
};

  export const putWarrantyDateProject = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = `PMOProject/UpdateWarrantyDateWithCompleteProject`;                     
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

  export const putHandover = async (data: PMOHandOverModel): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = `PMOProject/Handover`;                     
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

  export const putPMOProjectStatus = async (data: PMOViewEditProjectStatusEditModel): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = `PMOProjectViewEditProjectStatus`;                     
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

  export const putApprovalSmo = async (data: ApprovalSMOModel): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = `PMOProject/ApprovalSmo`;                     
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

  export const putResubmit = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = `PMOProject/Resubmit`;                     
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

  export const reqPMOTop = async (funnelGenID: number, page: number, pageSize: number): Promise<PMOTopListModel | HttpErrorResponseModel> => {  
  const controllerName = `FunnelTOP/GetListForPMO?funnelGenID=${funnelGenID}&page=${page}&pageSize=${pageSize}`;                     
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOTopListModel>(PMOTopListModel, endpoint);
};

  export const postPMOProject = async (data: PMOProjectEmplove): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'PMOProject';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

  export const reqPutPMOReassign = async (data: ReassignPmoModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'PMOProject/ReassignPmo';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

  export const reqGetByEntryKey = async (key: string): Promise<PMOGetByEntryKeyModel[] | HttpErrorResponseModel> => {
  const controllerName = `Udc/GetByEntryKey/${key}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOGetByEntryKeyModel[]>(PMOGetByEntryKeyModel, endpoint);
};

  export const reqGetActualDate = async (projectId: number): Promise<PMOGetActualDateModel | HttpErrorResponseModel> => {
  const controllerName = `PMOProjectTimeline/GetActualDateByProjectId?projectId=${projectId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOGetActualDateModel>(PMOGetActualDateModel, endpoint);
};

  export const putActual = async (actual: string, projectId: number, actualDate: string, modifyUserId: number, projectStatus?: string ): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 
  actual === "actualStart" ? `PMOProject/UpdateActualStartByPMO?projectId=${projectId}&actualStartDate=${actualDate}&modifyUserId=${modifyUserId}` : 
  `PMOProject/UpdateActualEndByPMO?projectStatus=${projectStatus}&projectId=${projectId}&actualEndDate=${actualDate}&modifyUserId=${modifyUserId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint);
};

export const getPMOProjectBy = async (projectId: number): Promise<PMOProjectByIDModel | HttpErrorResponseModel> => {
  const controllerName = `PMOProject?projectId=${projectId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PMOProjectByIDModel>(PMOProjectByIDModel, endpoint);
};

export const getAllowUpdate = async (projectId:number, userLoginId:number): Promise<CheckAllowedUpdateModel | HttpErrorResponseModel> => {
  const controllerName = `PMOProjectViewEditProjectStatus/CheckAllowedUpdate?projectId=${projectId}&userLoginId=${userLoginId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<CheckAllowedUpdateModel>(CheckAllowedUpdateModel, endpoint);
};