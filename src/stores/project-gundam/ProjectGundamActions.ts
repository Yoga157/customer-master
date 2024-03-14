

import ProjectGundamTaskWithLinkModel from './models/ProjectGundamTaskWithLinkModel';
import ProjectGundamTaskListModel from './models/ProjectGundamTaskListModel';
import ProjectGundamTaskModel, { ProjectTasktModel } from './models/ProjectGundamTaskModel';
import ProjectGundamLinkModel from './models/ProjectGundamLinkModel';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import GundamByEntryKeyModel from './models/GundamByEntryKeyModel';
import TaskFormTemplateModel from './models/TaskFormTemplateModel';
import GundamValueEmailModel from './models/GundamValueEmailModel';
import DropdownGunadamModel from './models/DropdownGunadamModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import * as ProjectGundamEffects from './ProjectGundamEffects';
import GundamHistoryModel from './models/GundamHistoryModel';
import GetEscalationModel from './models/GetEscalationModel';
import IsEscalationModel from './models/IsEscalationModel';
import { ReduxDispatch } from 'models/ReduxProps';
import ResultActions from 'models/ResultActions';
import IAction from 'models/IAction';

type ActionUnion =
  | ProjectGundamTaskWithLinkModel
  | ProjectGundamTaskListModel[]
  | GundamByEntryKeyModel[]
  | DropdownGunadamModel[]
  | HttpErrorResponseModel
  | TaskFormTemplateModel
  | GundamValueEmailModel
  | GundamHistoryModel[]
  | IsEscalationModel
  | ResultActions
  | undefined
  | boolean
  | boolean
  | any

export const POST_PROJECT_GUNDAM_TASK: string = 'ProjectGundamActions.REQUEST_POST_PROJECT_GUNDAM_TASK';
export const POST_PROJECT_GUNDAM_TASK_FINISHED: string = 'ProjectGundamActions.REQUEST_POST_PROJECT_GUNDAM_TASK_FINISHED';
export const postProjectGundamTask = (data: ProjectGundamTaskModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, POST_PROJECT_GUNDAM_TASK, ProjectGundamEffects.postProjectGundamTask, data);
  };
};

export const PUT_PROJECT_GUNDAM_TASK: string = 'ProjectGundamActions.REQUEST_PUT_PROJECT_GUNDAM_TASK';
export const PUT_PROJECT_GUNDAM_TASK_FINISHED: string = 'ProjectGundamActions.REQUEST_PUT_PROJECT_GUNDAM_TASK_FINISHED';
export const putProjectGundamTask = (data: ProjectTasktModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, PUT_PROJECT_GUNDAM_TASK, ProjectGundamEffects.putProjectGundamTask, data);
  };
};

export const DELETE_PROJECT_GUNDAM_TASK: string = 'ProjectGundamActions.REQUEST_DELETE_PROJECT_GUNDAM_TASK';
export const DELETE_PROJECT_GUNDAM_TASK_FINISHED: string = 'ProjectGundamActions.REQUEST_DELETE_PROJECT_GUNDAM_TASK_FINISHED';
export const deleteProjectGundamTask = (deleteItem: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, DELETE_PROJECT_GUNDAM_TASK, ProjectGundamEffects.deleteProjectGundamTask, deleteItem);
  };
};

export const GET_PROJECT_GUNDAM_TASK_LIST: string = 'ProjectGundamActions.REQUEST_GET_PROJECT_GUNDAM_TASK_LIST';
export const GET_PROJECT_GUNDAM_TASK_LIST_FINISHED: string = 'ProjectGundamActions.REQUEST_GET_PROJECT_GUNDAM_TASK_LIST_FINISHED';
export const getProjectGundamTask = (projectId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProjectGundamTaskListModel[]>(dispatch, GET_PROJECT_GUNDAM_TASK_LIST, ProjectGundamEffects.getProjectGundamTask, projectId);
  };
};

export const GET_PROJECT_GUNDAM_TASK_WITH_LINK: string = 'ProjectGundamActions.REQUEST_GET_PROJECT_GUNDAM_TASK_WITH_LINK';
export const GET_PROJECT_GUNDAM_TASK_WITH_LINK_FINISHED: string = 'ProjectGundamActions.REQUEST_GET_PROJECT_GUNDAM_TASK_WITH_LINK_FINISHED';
export const getProjectGundamTaskWithLink = (projectId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProjectGundamTaskWithLinkModel>(dispatch, GET_PROJECT_GUNDAM_TASK_WITH_LINK, ProjectGundamEffects.getProjectGundamTaskWithLink, projectId);
  };
};


export const POST_PROJECT_GUNDAM_LINK: string = 'ProjectGundamActions.REQUEST_POST_PROJECT_GUNDAM_LINK';
export const POST_PROJECT_GUNDAM_LINK_FINISHED: string = 'ProjectGundamActions.REQUEST_POST_PROJECT_GUNDAM_LINK_FINISHED';
export const postProjectGundamLink = (data: ProjectGundamLinkModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, POST_PROJECT_GUNDAM_LINK, ProjectGundamEffects.postProjectGundamLink, data);
  };
};

export const PUT_PROJECT_GUNDAM_LINK: string = 'ProjectGundamActions.REQUEST_PUT_PROJECT_GUNDAM_LINK';
export const PUT_PROJECT_GUNDAM_LINK_FINISHED: string = 'ProjectGundamActions.REQUEST_PUT_PROJECT_GUNDAM_LINK_FINISHED';
export const putProjectGundamLink = (data: ProjectGundamLinkModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, PUT_PROJECT_GUNDAM_LINK, ProjectGundamEffects.putProjectGundamLink, data);
  };
};

export const DELETE_PROJECT_GUNDAM_LINK: string = 'ProjectGundamActions.REQUEST_DELETE_PROJECT_GUNDAM_LINK';
export const DELETE_PROJECT_GUNDAM_LINK_FINISHED: string = 'ProjectGundamActions.REQUEST_DELETE_PROJECT_GUNDAM_LINK_FINISHED';
export const deleteProjectGundamLink = (linkId: number, userLoginId:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, DELETE_PROJECT_GUNDAM_LINK, ProjectGundamEffects.deleteProjectGundamLink, linkId, userLoginId);
  };
};

export const IMPORT_EXCEL: string = 'ProjectGundamActions.REQUEST_IMPORT_EXCEL';
export const IMPORT_EXCEL_FINISHED: string = 'ProjectGundamActions.REQUEST_IMPORT_EXCEL_FINISHED';

export const IMPORT_MPP: string = 'ProjectGundamActions.REQUEST_IMPORT_MPP';
export const IMPORT_MPP_FINISHED: string = 'ProjectGundamActions.REQUEST_IMPORT_MPP_FINISHED';
export const gundamImport = (data: any, isMPP: boolean): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch, 
      isMPP ? IMPORT_MPP : IMPORT_EXCEL, 
      ProjectGundamEffects.gundamImport, 
      data, 
      isMPP
      );
  };
};

export const GET_TASK_FORM_TEMPLATE: string = 'ProjectGundamActions.REQUEST_GET_TASK_FORM_TEMPLATE';
export const GET_TASK_FORM_TEMPLATE_FINISHED: string = 'ProjectGundamActions.REQUEST_GET_TASK_FORM_TEMPLATE_FINISHED';

export const getFormTemplate = (templateName: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<TaskFormTemplateModel>(
      dispatch, 
        GET_TASK_FORM_TEMPLATE, 
        ProjectGundamEffects.getFormTemplate, 
        templateName
      );
  };
};

export const GET_DROPDOWN_TYPE_TASK: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_TYPE_TASK';
export const GET_DROPDOWN_TYPE_TASK_FINISHED: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_TYPE_TASK_FINISHED';

export const GET_DROPDOWN_SLA: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_SLA';
export const GET_DROPDOWN_SLA_FINISHED: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_SLA_FINISHED';

export const getDropdown = (dropdown: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownGunadamModel[]>(
      dispatch, 
        dropdown === "sla" ? GET_DROPDOWN_SLA : GET_DROPDOWN_TYPE_TASK, 
        ProjectGundamEffects.getDropdown, 
        dropdown
      );
  };
};



export const GET_DROPDOWN_TASK_TEMPLATE: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_TASK_TEMPLATE';
export const GET_DROPDOWN_TASK_TEMPLATE_FINISHED: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_TASK_TEMPLATE_FINISHED';

export const GET_DROPDOWN_TASK_CATEGORY: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_TASK_CATEGORY';
export const GET_DROPDOWN_TASK_CATEGORY_FINISHED: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_TASK_CATEGORY_FINISHED';

export const GET_DROPDOWN_TASK_SUB_CATEGORY: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_TASK_SUB_CATEGORY';
export const GET_DROPDOWN_TASK_SUB_CATEGORY_FINISHED: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_TASK_SUB_CATEGORY_FINISHED';

export const GET_DROPDOWN_TASK_ISSUE: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_TASK_ISSUE';
export const GET_DROPDOWN_TASK_ISSUE_FINISHED: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_TASK_ISSUE_FINISHED';

export const GET_DROPDOWN_TASK_SUB_ISSUE: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_TASK_SUB_ISSUE';
export const GET_DROPDOWN_TASK_SUB_ISSUE_FINISHED: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_TASK_SUB_ISSUE_FINISHED';

export const getDropdownByEntryKey = (dropdown: string, text1?: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<GundamByEntryKeyModel[]>(
      dispatch, 
        !text1 && dropdown === "TaskCategory" ? GET_DROPDOWN_TASK_CATEGORY 
        : !text1 && dropdown === "TaskIssueType" ? GET_DROPDOWN_TASK_ISSUE 
        : !text1 && dropdown ===  "taskTemplate" ? GET_DROPDOWN_TASK_TEMPLATE
        : text1 && dropdown === "taskSubCategory" ? GET_DROPDOWN_TASK_SUB_CATEGORY : GET_DROPDOWN_TASK_SUB_ISSUE,
        ProjectGundamEffects.getDropdownByEntryKey, 
        dropdown,
        text1
      );
  };
};

export const GET_HISTORY: string = 'ProjectGundamActions.REQUEST_GET_HISTORY';
export const GET_HISTORY_FINISHED: string = 'ProjectGundamActions.REQUEST_GET_HISTORY_FINISHED';

export const getHistoryTask = (projectId: number, taskId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<GundamHistoryModel[]>(
      dispatch, 
        GET_HISTORY, 
        ProjectGundamEffects.getHistoryTask, 
        projectId,
        taskId
      );
  };
};

export const VALUE_EMAIL: string = 'ProjectGundamActions.REQUEST_VALUE_EMAIL';
export const VALUE_EMAIL_FINISHED: string = 'ProjectGundamActions.REQUEST_VALUE_EMAIL_FINISHED';
export const getValueEmail = (taskId: number, userLoginId: number ): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<GundamValueEmailModel>(
      dispatch, 
        VALUE_EMAIL, 
        ProjectGundamEffects.getValueEmail, 
        taskId,
        userLoginId,
      );
  };
};

export const GET_IS_ESCALATION: string = 'ProjectGundamActions.REQUEST_GET_IS_ESCALATION';
export const GET_IS_ESCALATION_FINISHED: string = 'ProjectGundamActions.REQUEST_GET_IS_ESCALATION_FINISHED';
export const getIsEscalation = (data: GetEscalationModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<IsEscalationModel>(
      dispatch, 
        GET_IS_ESCALATION, 
        ProjectGundamEffects.getIsEscalation, 
        data,
      );
  };
};

export const RESET_TEMPLATE:string ='ProjectGundamActions.RESET_TEMPLATE';
export const resetTemplate = (): IAction<boolean> => {
  return ActionUtility.createAction(RESET_TEMPLATE);
};

export const REMOVE_PROJECT_GUNDAM_RESULT:string ='ProjectGundamActions.REMOVE_PROJECT_GUNDAM_RESULT';
export const removeResult = (): IAction<number> => {
  return ActionUtility.createAction(REMOVE_PROJECT_GUNDAM_RESULT);
};

export const SET_PAGE: string = 'ProjectGundamActions.SET_PAGE';
export const setActivePage = (activePage: number): IAction<number> => {
  return ActionUtility.createAction(SET_PAGE, activePage);
};