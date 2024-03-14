import ProjectGundamTaskModel, { ProjectTasktModel } from './models/ProjectGundamTaskModel';
import ProjectGundamTaskWithLinkModel from './models/ProjectGundamTaskWithLinkModel';
import ProjectGundamTaskListModel from './models/ProjectGundamTaskListModel';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ProjectGundamLinkModel from './models/ProjectGundamLinkModel';
import GundamByEntryKeyModel from './models/GundamByEntryKeyModel';
import TaskFormTemplateModel from './models/TaskFormTemplateModel';
import GundamValueEmailModel from './models/GundamValueEmailModel';
import DropdownGunadamModel from './models/DropdownGunadamModel';
import * as EffectUtility from '../../utilities/EffectUtility';
import GundamHistoryModel from './models/GundamHistoryModel';
import ResultActions from 'models/ResultActions';
import environment from 'environment';
import GetEscalationModel from './models/GetEscalationModel';
import IsEscalationModel from './models/IsEscalationModel';



  export const postProjectGundamTask = async (data: ProjectGundamTaskModel): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = 'PMOProjectTimeline/AddTask';
  // const controllerName = 'Task';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

  export const putProjectGundamTask = async (data: ProjectTasktModel): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = 'PMOProjectTimeline/EditTask';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

  export const deleteProjectGundamTask = async (deleteItem: any): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = 'PMOProjectTimeline/DeleteTask';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.delToModelBody<ResultActions>(ResultActions, endpoint, deleteItem);
};

export const getProjectGundamTask = async (projectId: number): Promise<ProjectGundamTaskListModel[] | HttpErrorResponseModel> => {  
  const controllerName = `PMOProjectTimeline/GetTasks?projectId=${projectId}`;
  // const controllerName = `Task/GetTasks?projectId=${projectId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ProjectGundamTaskListModel[]>(ProjectGundamTaskListModel, endpoint);
};

export const getProjectGundamTaskWithLink = async (projectId: number): Promise<ProjectGundamTaskWithLinkModel | HttpErrorResponseModel> => {  
  const controllerName = `PMOProjectTimeline/GetTaskWithLinkedTask?projectId=${projectId}`;
  // const controllerName = `Task/GetTasks?projectId=${projectId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ProjectGundamTaskWithLinkModel>(ProjectGundamTaskWithLinkModel, endpoint);
};

  export const postProjectGundamLink = async (data: ProjectGundamLinkModel): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = 'PMOProjectTimeline/AddLink';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

  export const putProjectGundamLink = async (data: ProjectGundamLinkModel): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = 'PMOProjectTimeline/EditLink';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

  export const deleteProjectGundamLink = async (linkId: number, userLoginId: number): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = `PMOProjectTimeline/DeleteLink?linkId=${linkId}&userLoginId=${userLoginId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

  export const gundamImport = async (data: any, isMPP: Boolean): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = isMPP ? 'PMOProjectTimeline/ImportMpp' : 'PMOProjectTimeline/ImportExcel';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  if (isMPP){
    return EffectUtility.postUpload<ResultActions>(ResultActions, endpoint, data);
  }else {
    return EffectUtility.putUpload<ResultActions>(ResultActions, endpoint, data);
  }
};

  export const getDropdown = async (dropdown: string): Promise<DropdownGunadamModel[] | HttpErrorResponseModel> => {  
  const controllerName = dropdown === "sla" ? 'Work/DropdownSLAAssignment' : 'PMOProjectTimeline/DropdownTaskType';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<DropdownGunadamModel[] >(DropdownGunadamModel, endpoint);
};

  export const getFormTemplate = async (templateName: string): Promise<TaskFormTemplateModel | HttpErrorResponseModel> => {  
  const controllerName = `PMOProjectTimeline/TaskTemplateDetail?templateName=${templateName}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<TaskFormTemplateModel >(TaskFormTemplateModel, endpoint);
};

export const getDropdownByEntryKey = async (dropdown: string, text1?: string): Promise<GundamByEntryKeyModel[] | HttpErrorResponseModel> => {
  const controllerName = text1 ? `Udc/GetByEntryKeyText1?entryKey=${dropdown}&text1=${text1}` : `Udc/GetByEntryKey/${dropdown}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<GundamByEntryKeyModel[]>(GundamByEntryKeyModel, endpoint);
};

export const getHistoryTask = async (projectId: number, taskId: number): Promise<GundamHistoryModel[] | HttpErrorResponseModel> => {
  const controllerName = `PMOProjectTimeline/GetTaskHistory?projectId=${projectId}&taskId=${taskId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<GundamHistoryModel[]>(GundamHistoryModel, endpoint);
};

export const getValueEmail = async (taskId: number, userLoginId: number): Promise<GundamValueEmailModel | HttpErrorResponseModel> => {
  const controllerName = `PMOProjectTimeline/GetDefaultEmailEditTask?taskId=${taskId}&userLoginId=${userLoginId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<GundamValueEmailModel>(GundamValueEmailModel, endpoint);
};

  export const getIsEscalation = async (data: GetEscalationModel): Promise<IsEscalationModel | HttpErrorResponseModel> => {  
  const controllerName = `PMOProjectTimeline/CheckAllowedEscalation?taskId=${data.taskId}&userLoginId=${data.userLoginId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<IsEscalationModel>(IsEscalationModel, endpoint);
};

