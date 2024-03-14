import { Reducer } from "redux";

import WorkActivityReportModel from "./models/WorkActivityReportModel";
import ListWorkAttachmentModel from "./models/ListWorkAttachmentModel";
import ActivityReportViewModel from "./models/ActivityReportViewModel";
import DropdownTextValueModel from "./models/DropdownTextValueModel";
import ActivityCategoryModel from "./models/ActivityCategoryModel";
import WorklistHistoryModel from "./models/WorklistHistoryModel";
import WorkListDetailModel from "./models/WorkListDetailModel";
import ProductListModel from "./models/ProductListModel";
import IWorkListState from "./models/IWorkListState";
import * as WorkListActions from "./WorkListActions"
import WorkListModel from "./models/WorkListModel";
import ResultActions from "models/ResultActions";
import baseReducer from "utilities/BaseReducer";
import IAction from "models/IAction";

export const initialState: IWorkListState = {
  listWorkAttachmentAll: new ListWorkAttachmentModel({}),
  workActivityReport: new WorkActivityReportModel({}),
  listWorkAttachment: new ListWorkAttachmentModel({}),
  activityReportView: new ActivityReportViewModel({}),
  detailWorkList: new WorkListDetailModel({}),
  resultActions: new ResultActions({}),
  workList: new WorkListModel({}),
  drpActivityCategory: [],
  subBranchByFunnel: [],
  productListState: [],
  branchByFunnel: [],
  refreshPage: false,
  drpTaskStatus: [],
  productList: [],
  drpWorkType: [],
  drpCustomer: [],
  drpEmployee: [],
  isExport: false,
  drpProject: [],
  activePage: 1,
  error: false,
  history: [],
};

const WorkListReducer: Reducer = baseReducer(initialState, {

  
  [WorkListActions.GET_WORK_LIST_FINISHED](state: IWorkListState, action: IAction<WorkListModel>): IWorkListState {
    return {
      ...state,
      workList: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [WorkListActions.GET_WORK_LIST_SEARCH_FINISHED](state: IWorkListState, action: IAction<WorkListModel>): IWorkListState {
    return {
      ...state,
      workList: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [WorkListActions.GET_WORK_LIST_FILTER_FINISHED](state: IWorkListState, action: IAction<WorkListModel>): IWorkListState {
    return {
      ...state,
      workList: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [WorkListActions.GET_DROPDOWN_WORK_TYPE_FINISHED](state: IWorkListState, action: IAction<DropdownTextValueModel[]>): IWorkListState {
    return {
      ...state,
      drpWorkType: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [WorkListActions.GET_DROPDOWN_TASK_STATUS_FINISHED](state: IWorkListState, action: IAction<DropdownTextValueModel[]>): IWorkListState {
    return {
      ...state,
      drpTaskStatus: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [WorkListActions.GET_DROPDOWN_PROJECT_FINISHED](state: IWorkListState, action: IAction<DropdownTextValueModel[]>): IWorkListState {
    return {
      ...state,
      drpProject: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [WorkListActions.GET_DROPDOWN_CUSTOMER_FINISHED](state: IWorkListState, action: IAction<DropdownTextValueModel[]>): IWorkListState {
    return {
      ...state,
      drpCustomer: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [WorkListActions.GET_DROPDOWN_EMPLOYEE_FINISHED](state: IWorkListState, action: IAction<DropdownTextValueModel[]>): IWorkListState {
    return {
      ...state,
      drpEmployee: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [WorkListActions.GET_DROPDOWN_WORK_STATUS_FINISHED](state: IWorkListState, action: IAction<DropdownTextValueModel[]>): IWorkListState {
    return {
      ...state,
      drpTaskStatus: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [WorkListActions.GET_DROPDOWN_BRANCH_FINISHED](state: IWorkListState, action: IAction<DropdownTextValueModel[]>): IWorkListState {
    return {
      ...state,
      branchByFunnel: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [WorkListActions.GET_DROPDOWN_SUB_BRANCH_FINISHED](state: IWorkListState, action: IAction<DropdownTextValueModel[]>): IWorkListState {
    return {
      ...state,
      subBranchByFunnel: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
 
  [WorkListActions.GET_DROPDOWN_ACTIVITY_CATEGORY_FINISHED](state: IWorkListState, action: IAction<ActivityCategoryModel[]>): IWorkListState {
    return {
      ...state,
      drpActivityCategory: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
 
  [WorkListActions.GET_HISTORY_FINISHED](state: IWorkListState, action: IAction<WorklistHistoryModel[]>): IWorkListState {
    return {
      ...state,
      history: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [WorkListActions.GET_DETAIL_WORKLIST_FINISHED](state: IWorkListState, action: IAction<WorkListDetailModel>): IWorkListState {
    return {
      ...state,
      detailWorkList: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [WorkListActions.GET_WORK_ACTIVITY_REPORT_FINISHED](state: IWorkListState, action: IAction<WorkActivityReportModel>): IWorkListState {
    return {
      ...state,
      workActivityReport: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [WorkListActions.RESET_LIST_ACTIVITY](state: IWorkListState, action: IAction<WorkActivityReportModel>): IWorkListState {
    return {
      ...state,
      workActivityReport: new WorkActivityReportModel({}),
    };
  },
  
  [WorkListActions.GET_LIST_WORK_ATTATCHMENT_FINISHED](state: IWorkListState, action: IAction<ListWorkAttachmentModel>): IWorkListState {
    return {
      ...state,
      listWorkAttachment: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  
  [WorkListActions.GET_LIST_WORK_ATTATCHMENT_ALL_FINISHED](state: IWorkListState, action: IAction<ListWorkAttachmentModel>): IWorkListState {
    return {
      ...state,
      listWorkAttachmentAll: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [WorkListActions.DELETE_WORK_ATTACHMENT_FINISHED](state: IWorkListState, action: IAction<ResultActions>): IWorkListState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [WorkListActions.PUT_TASK_FINISHED](state: IWorkListState, action: IAction<ResultActions>): IWorkListState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [WorkListActions.POST_WORK_ATTACHMENT_FINISHED](state: IWorkListState, action: IAction<ResultActions>): IWorkListState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [WorkListActions.POST_ACTIVITY_REPORT_FINISHED](state: IWorkListState, action: IAction<ResultActions>): IWorkListState {
    return {
      ...state,
      resultActions: action.payload!,
      productListState: [],
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [WorkListActions.GET_ACTIVITY_REPORT_BY_GENID_FINISHED](state: IWorkListState, action: IAction<ActivityReportViewModel>): IWorkListState {
    return {
      ...state,
      activityReportView: action.payload!,
      error: false,
      refreshPage: false ,
    };
  },
  
  [WorkListActions.GET_LIST_PRODUCT_ACTIVITY_REPORT_FINISHED](state: IWorkListState, action: IAction<ProductListModel[]>): IWorkListState {
    return {
      ...state,
      productList: action.payload!,
      error: false,
      refreshPage: false ,
    };
  },
  
  [WorkListActions.REASSIGN_WORK_FINISHED](state: IWorkListState, action: IAction<ResultActions>): IWorkListState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [WorkListActions.CREATE_ACTIVITY_PRODUCT](state: IWorkListState, action: IAction<any>): IWorkListState {
    return {
      ...state,
      productListState: [...state.productListState, {...action.payload, activityReportProductGenID: state.productListState.length + 1 }!],
    };
  },
  
  [WorkListActions.DELETE_ACTIVITY_PRODUCT](state: IWorkListState, action: IAction<number>): IWorkListState {
    return {
      ...state,
      productListState: state.productListState.filter(i => i.activityReportProductGenID !== action.payload),
    };
  },
  
  [WorkListActions.PUT_ACTIVITY_PRODUCT](state: IWorkListState, action: IAction<any>): IWorkListState {
    const value = state.productListState.filter(i => i.activityReportProductGenID !== action.payload.activityReportProductGenID)
    return {
      ...state,
      productListState: [...value, action.payload!].sort(function(a, b) {
      return a.activityReportProductGenID - b.activityReportProductGenID;
    }),
    };
  },
  
  [WorkListActions.COPY_FUNNEL_ATTACHMENT_FINISHED](state: IWorkListState, action: IAction<ResultActions>): IWorkListState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [WorkListActions.REMOVE_WORK_LIST_RESULT](state: IWorkListState, action: IAction<number>): IWorkListState {
    return {
      ...state,
      resultActions: new ResultActions({}),
    };
  },

  [WorkListActions.SET_PAGE](state: IWorkListState, action: IAction<number>): IWorkListState {
    return {
      ...state,
      activePage: action.payload!,   
    };
  },

  [WorkListActions.SET_EXPORT](state: IWorkListState, action: IAction<boolean>): IWorkListState {
    return {
      ...state,
      isExport: action.payload!,   
    };
  },
});

export default WorkListReducer;