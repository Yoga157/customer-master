import { Reducer } from "redux";

import ProjectGundamTaskWithLinkModel from "./models/ProjectGundamTaskWithLinkModel";
import ProjectGundamTaskListModel from "./models/ProjectGundamTaskListModel";
import GundamByEntryKeyModel from "./models/GundamByEntryKeyModel";
import TaskFormTemplateModel from "./models/TaskFormTemplateModel";
import GundamValueEmailModel from "./models/GundamValueEmailModel";
import DropdownGunadamModel from "./models/DropdownGunadamModel";
import IProjectGundamState from "./models/IProjectGundamState";
import * as ProjectGundamActions from "./ProjectGundamActions"
import GundamHistoryModel from "./models/GundamHistoryModel";
import IsEscalationModel from "./models/IsEscalationModel";
import ResultActions from "models/ResultActions";
import baseReducer from "utilities/BaseReducer";
import IAction from "models/IAction";

export const initialState: IProjectGundamState = {
  listTaskLink: new ProjectGundamTaskWithLinkModel({}),
  formTemplate: new TaskFormTemplateModel({}),
  valueEmail: new GundamValueEmailModel({}),
  isEscalation: new IsEscalationModel({}),
  resultActions: new ResultActions({}),
  dropdownTaskSubCategory: [],
  dropdownTaskIssueType: [],
  dropdownTaskTemplate: [],
  dropdownTaskCategory: [],
  dropdownTaskSubIssue: [],
  dropdownTypeTask: [],
  refreshPage: false,
  dropdownSLA: [],
  historyTask: [],
  activePage: 1,
  error: false,
  listData:[],
};

const ProjectGundamReducer: Reducer = baseReducer(initialState, {

  [ProjectGundamActions.GET_PROJECT_GUNDAM_TASK_WITH_LINK_FINISHED](state: IProjectGundamState, action: IAction<ProjectGundamTaskWithLinkModel>): IProjectGundamState {
    return {
      ...state,
      listTaskLink: action.payload!,
      error: false,
      refreshPage:  false  ,
    };
  },

  [ProjectGundamActions.GET_PROJECT_GUNDAM_TASK_LIST_FINISHED](state: IProjectGundamState, action: IAction<ProjectGundamTaskListModel[]>): IProjectGundamState {
    return {
      ...state,
      listData: action.payload!,
      error: false,
      refreshPage:  false  ,
    };
  },
  
  [ProjectGundamActions.POST_PROJECT_GUNDAM_TASK_FINISHED](state: IProjectGundamState, action: IAction<ResultActions>): IProjectGundamState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [ProjectGundamActions.PUT_PROJECT_GUNDAM_TASK_FINISHED](state: IProjectGundamState, action: IAction<ResultActions>): IProjectGundamState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [ProjectGundamActions.DELETE_PROJECT_GUNDAM_TASK_FINISHED](state: IProjectGundamState, action: IAction<ResultActions>): IProjectGundamState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [ProjectGundamActions.POST_PROJECT_GUNDAM_LINK_FINISHED](state: IProjectGundamState, action: IAction<ResultActions>): IProjectGundamState {
    return {
       ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [ProjectGundamActions.PUT_PROJECT_GUNDAM_LINK_FINISHED](state: IProjectGundamState, action: IAction<ResultActions>): IProjectGundamState {
    return {
       ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [ProjectGundamActions.DELETE_PROJECT_GUNDAM_LINK_FINISHED](state: IProjectGundamState, action: IAction<ResultActions>): IProjectGundamState {
    return {
       ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [ProjectGundamActions.IMPORT_EXCEL_FINISHED](state: IProjectGundamState, action: IAction<ResultActions>): IProjectGundamState {
    return {
       ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [ProjectGundamActions.IMPORT_MPP_FINISHED](state: IProjectGundamState, action: IAction<ResultActions>): IProjectGundamState {
    return {
       ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [ProjectGundamActions.GET_TASK_FORM_TEMPLATE_FINISHED](state: IProjectGundamState, action: IAction<TaskFormTemplateModel>): IProjectGundamState {
    return {
       ...state,
      formTemplate: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [ProjectGundamActions.GET_DROPDOWN_TYPE_TASK_FINISHED](state: IProjectGundamState, action: IAction<DropdownGunadamModel[]>): IProjectGundamState {
    return {
       ...state,
      dropdownTypeTask: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [ProjectGundamActions.GET_DROPDOWN_SLA_FINISHED](state: IProjectGundamState, action: IAction<DropdownGunadamModel[]>): IProjectGundamState {
    return {
       ...state,
      dropdownSLA: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [ProjectGundamActions.GET_DROPDOWN_TASK_TEMPLATE_FINISHED](state: IProjectGundamState, action: IAction<GundamByEntryKeyModel[]>): IProjectGundamState {
    return {
       ...state,
      dropdownTaskTemplate: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [ProjectGundamActions.GET_DROPDOWN_TASK_CATEGORY_FINISHED](state: IProjectGundamState, action: IAction<GundamByEntryKeyModel[]>): IProjectGundamState {
    return {
       ...state,
      dropdownTaskCategory: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [ProjectGundamActions.GET_DROPDOWN_TASK_SUB_CATEGORY_FINISHED](state: IProjectGundamState, action: IAction<GundamByEntryKeyModel[]>): IProjectGundamState {
    return {
       ...state,
      dropdownTaskSubCategory: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [ProjectGundamActions.GET_DROPDOWN_TASK_ISSUE_FINISHED](state: IProjectGundamState, action: IAction<GundamByEntryKeyModel[]>): IProjectGundamState {
    return {
       ...state,
      dropdownTaskIssueType: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [ProjectGundamActions.GET_DROPDOWN_TASK_SUB_ISSUE_FINISHED](state: IProjectGundamState, action: IAction<GundamByEntryKeyModel[]>): IProjectGundamState {
    return {
       ...state,
      dropdownTaskSubIssue: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ProjectGundamActions.GET_HISTORY_FINISHED](state: IProjectGundamState, action: IAction<GundamHistoryModel[]>): IProjectGundamState {
    return {
       ...state,
      historyTask: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [ProjectGundamActions.VALUE_EMAIL_FINISHED](state: IProjectGundamState, action: IAction<GundamValueEmailModel>): IProjectGundamState {
    return {
       ...state,
      valueEmail: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [ProjectGundamActions.GET_IS_ESCALATION_FINISHED](state: IProjectGundamState, action: IAction<IsEscalationModel>): IProjectGundamState {
    return {
       ...state,
      isEscalation: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ProjectGundamActions.RESET_TEMPLATE](state: IProjectGundamState, action: IAction<boolean>): IProjectGundamState {
    return {
      ...state,
      formTemplate: new TaskFormTemplateModel({}),
    };
  },

  [ProjectGundamActions.REMOVE_PROJECT_GUNDAM_RESULT](state: IProjectGundamState, action: IAction<number>): IProjectGundamState {
    return {
      ...state,
      resultActions: new ResultActions({}),
    };
  },

  [ProjectGundamActions.SET_PAGE](state: IProjectGundamState, action: IAction<number>): IProjectGundamState {
    return {
      ...state,
      activePage: action.payload!,   
    };
  },
});

export default ProjectGundamReducer;