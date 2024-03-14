

import WorkActivityReportModel from './models/WorkActivityReportModel';
import ListWorkAttachmentModel from './models/ListWorkAttachmentModel';
import ActivityReportViewModel from './models/ActivityReportViewModel';
import DropdownTextValueModel from './models/DropdownTextValueModel';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import ActivityCategoryModel from './models/ActivityCategoryModel';
import WorklistHistoryModel from './models/WorklistHistoryModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import WorkListDetailModel from './models/WorkListDetailModel';
import ReAssignWorkModel from './models/ReAssignWorkModel';
import ProductListModel from './models/ProductListModel';
import * as WorkListEffects from './WorkListEffects';
import WorkListModel from './models/WorkListModel';
import { ReduxDispatch } from 'models/ReduxProps';
import ResultActions from 'models/ResultActions';
import IAction from 'models/IAction';

type ActionUnion =
  | DropdownTextValueModel[]
  | ActivityCategoryModel[]
  | ActivityReportViewModel
  | WorkActivityReportModel
  | ListWorkAttachmentModel
  | HttpErrorResponseModel
  | WorklistHistoryModel[]
  | WorkListDetailModel
  | ProductListModel[]
  | WorkListModel
  | ResultActions
  | undefined
  | boolean
  | boolean
  | any

  export const GET_WORK_LIST: string = 'WorkListActions.REQUEST_GET_WORK_LIST';
  export const GET_WORK_LIST_FINISHED: string = 'WorkListActions.REQUEST_GET_WORK_LIST_FINISHED';

  export const getWorklist = (page: number, pageSize: number, column: string, sorting: string, userLoginId: number ): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<WorkListModel>(
        dispatch, 
          GET_WORK_LIST, 
          WorkListEffects.getWorklist, 
          page,
          pageSize,
          column,
          sorting,
          userLoginId
        );
    };
  };

  export const GET_WORK_LIST_SEARCH: string = 'WorkListActions.REQUEST_GET_WORK_LIST_SEARCH';
  export const GET_WORK_LIST_SEARCH_FINISHED: string = 'WorkListActions.REQUEST_GET_WORK_LIST_SEARCH_FINISHED';

  export const getWorklistSearch = (page: number, pageSize: number, column: string, sorting: string, search: string, userLoginId: number ): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<WorkListModel>(
        dispatch, 
          GET_WORK_LIST_SEARCH, 
          WorkListEffects.getWorklistSearch, 
          page,
          pageSize,
          column,
          sorting,
          search,
          userLoginId
        );
    };
  };
  
    export const GET_WORK_LIST_FILTER: string = 'WorkListActions.REQUEST_GET_WORK_LIST_FILTER';
    export const GET_WORK_LIST_FILTER_FINISHED: string = 'WorkListActions.REQUEST_GET_WORK_LIST_FILTER_FINISHED';
  
    export const getWorklistFilter = (data: any): any => {
      return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<WorkListModel>(
          dispatch, 
            GET_WORK_LIST_FILTER, 
            WorkListEffects.getWorklistFilter, 
            data
          );
      };
    };

  export const GET_DETAIL_WORKLIST: string = 'WorkListActions.REQUEST_GET_DETAIL_WORKLIST';
  export const GET_DETAIL_WORKLIST_FINISHED: string = 'WorkListActions.REQUEST_GET_DETAIL_WORKLIST_FINISHED';

  export const reqGetDetailWorklist = (taskId: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<WorkListDetailModel>(
        dispatch, 
          GET_DETAIL_WORKLIST, 
          WorkListEffects.reqGetDetailWorklist, 
          taskId,
        );
    };
  };

  export const GET_WORK_ACTIVITY_REPORT: string = 'WorkListActions.REQUEST_GET_WORK_ACTIVITY_REPORT';
  export const GET_WORK_ACTIVITY_REPORT_FINISHED: string = 'WorkListActions.REQUEST_GET_WORK_ACTIVITY_REPORT_FINISHED';

  export const getWorkActivityReport = (activePage: number, pageSize: number, uid: string): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<WorkActivityReportModel>(
        dispatch, 
          GET_WORK_ACTIVITY_REPORT, 
          WorkListEffects.getWorkActivityReport,
          activePage,
          pageSize,
          uid,
        );
    };
  };
  
  export const GET_LIST_WORK_ATTATCHMENT: string = 'WorkListActions.REQUEST_GET_LIST_WORK_ATTATCHMENT';
  export const GET_LIST_WORK_ATTATCHMENT_FINISHED: string = 'WorkListActions.REQUEST_GET_LIST_WORK_ATTATCHMENT_FINISHED';

  export const getListWorkAttachment = (activePage: number, pageSize: number, modul: number, docNumber: string): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ListWorkAttachmentModel>(
        dispatch, 
          GET_LIST_WORK_ATTATCHMENT, 
          WorkListEffects.getListWorkAttachment,
          activePage,
          pageSize,
          modul,
          docNumber
        );
    };
  };

  export const GET_LIST_WORK_ATTATCHMENT_ALL: string = 'WorkListActions.REQUEST_GET_LIST_WORK_ATTATCHMENT_ALL';
  export const GET_LIST_WORK_ATTATCHMENT_ALL_FINISHED: string = 'WorkListActions.REQUEST_GET_LIST_WORK_ATTATCHMENT_ALL_FINISHED';

  export const getListWorkAttachmentAll = (activePage: number, pageSize: number, modul: number, docNumber: string): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ListWorkAttachmentModel>(
        dispatch, 
          GET_LIST_WORK_ATTATCHMENT_ALL, 
          WorkListEffects.getListWorkAttachment,
          activePage,
          pageSize,
          modul,
          docNumber
        );
    };
  };
  
  export const DELETE_WORK_ATTACHMENT: string = 'WorkListActions.REQUEST_DELETE_WORK_ATTACHMENT';
  export const DELETE_WORK_ATTACHMENT_FINISHED: string = 'WorkListActions.REQUEST_DELETE_WORK_ATTACHMENT_FINISHED';

  export const deleteWorkAttachment = (attachmentId: string): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch, 
          DELETE_WORK_ATTACHMENT, 
          WorkListEffects.deleteWorkAttachment,
          attachmentId
        );
    };
  };
  
  export const PUT_TASK: string = 'WorkListActions.REQUEST_PUT_TASK';
  export const PUT_TASK_FINISHED: string = 'WorkListActions.REQUEST_PUT_TASK_FINISHED';

  export const putTask = (data: any): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch, 
        PUT_TASK, 
        WorkListEffects.putTask,
        data
        );
    };
  };
  
  export const POST_WORK_ATTACHMENT: string = 'WorkListActions.REQUEST_POST_WORK_ATTACHMENT';
  export const POST_WORK_ATTACHMENT_FINISHED: string = 'WorkListActions.REQUEST_POST_WORK_ATTACHMENT_FINISHED';

  export const postWorkAttachment = (data: any): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch, 
        POST_WORK_ATTACHMENT, 
        WorkListEffects.postWorkAttachment,
        data
        );
    };
  };
  
  export const POST_ACTIVITY_REPORT: string = 'WorkListActions.REQUEST_POST_ACTIVITY_REPORT';
  export const POST_ACTIVITY_REPORT_FINISHED: string = 'WorkListActions.REQUEST_POST_ACTIVITY_REPORT_FINISHED';

  export const postActivityReport = (data: any): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch, 
        POST_ACTIVITY_REPORT, 
        WorkListEffects.postActivityReport,
        data
        );
    };
  };
  
  export const GET_ACTIVITY_REPORT_BY_GENID: string = 'WorkListActions.REQUEST_GET_ACTIVITY_REPORT_BY_GENID';
  export const GET_ACTIVITY_REPORT_BY_GENID_FINISHED: string = 'WorkListActions.REQUEST_GET_ACTIVITY_REPORT_BY_GENID_FINISHED';

  export const getActivityReportBy = (activityReportGenID: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ActivityReportViewModel>(
        dispatch, 
        GET_ACTIVITY_REPORT_BY_GENID, 
        WorkListEffects.getActivityReportBy,
        activityReportGenID
        );
    };
  };
  
  export const GET_LIST_PRODUCT_ACTIVITY_REPORT: string = 'WorkListActions.REQUEST_GET_LIST_PRODUCT_ACTIVITY_REPORT';
  export const GET_LIST_PRODUCT_ACTIVITY_REPORT_FINISHED: string = 'WorkListActions.REQUEST_GET_LIST_PRODUCT_ACTIVITY_REPORT_FINISHED';

  export const getListActivityReportProduct = (activityReportGenID: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ProductListModel[]>(
        dispatch, 
        GET_LIST_PRODUCT_ACTIVITY_REPORT, 
        WorkListEffects.getListActivityReportProduct,
        activityReportGenID
        );
    };
  };

  export const REASSIGN_WORK: string = 'WorkListActions.REQUEST_REASSIGN_WORK';
  export const REASSIGN_WORK_FINISHED: string = 'WorkListActions.REQUEST_REASSIGN_WORK_FINISHED';

  export const reqReAssignWork = (data: ReAssignWorkModel): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch, 
          REASSIGN_WORK, 
          WorkListEffects.reqReAssignWork, 
          data,
        );
    };
  };

export const GET_DROPDOWN_WORK_TYPE: string = 'WorkListActions.REQUEST_GET_DROPDOWN_WORK_TYPE';
export const GET_DROPDOWN_WORK_TYPE_FINISHED: string = 'WorkListActions.REQUEST_GET_DROPDOWN_WORK_TYPE_FINISHED';

export const GET_DROPDOWN_TASK_STATUS: string = 'WorkListActions.REQUEST_GET_DROPDOWN_TASK_STATUS';
export const GET_DROPDOWN_TASK_STATUS_FINISHED: string = 'WorkListActions.REQUEST_GET_DROPDOWN_TASK_STATUS_FINISHED';

export const GET_DROPDOWN_PROJECT: string = 'WorkListActions.REQUEST_GET_DROPDOWN_PROJECT';
export const GET_DROPDOWN_PROJECT_FINISHED: string = 'WorkListActions.REQUEST_GET_DROPDOWN_PROJECT_FINISHED';

export const GET_DROPDOWN_CUSTOMER: string = 'WorkListActions.REQUEST_GET_DROPDOWN_CUSTOMER';
export const GET_DROPDOWN_CUSTOMER_FINISHED: string = 'WorkListActions.REQUEST_GET_DROPDOWN_CUSTOMER_FINISHED';

export const GET_DROPDOWN_EMPLOYEE: string = 'WorkListActions.REQUEST_GET_DROPDOWN_EMPLOYEE';
export const GET_DROPDOWN_EMPLOYEE_FINISHED: string = 'WorkListActions.REQUEST_GET_DROPDOWN_EMPLOYEE_FINISHED';

export const getDropdown = (dropdown: string, taskId?: number, userLoginId?: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownTextValueModel[]>(
      dispatch, 
        dropdown === "workType" ? GET_DROPDOWN_WORK_TYPE : 
        dropdown === "taskStatus" ? GET_DROPDOWN_TASK_STATUS : 
        dropdown === "project" ? GET_DROPDOWN_PROJECT : 
        dropdown === "customer" ? GET_DROPDOWN_CUSTOMER : 
        dropdown === "employee" ? GET_DROPDOWN_EMPLOYEE : "", 
        WorkListEffects.getDropdown, 
        dropdown,
        taskId,
        userLoginId
      );
  };
};

export const GET_DROPDOWN_WORK_STATUS: string = 'WorkListActions.REQUEST_GET_DROPDOWN_WORK_STATUS';
export const GET_DROPDOWN_WORK_STATUS_FINISHED: string = 'WorkListActions.REQUEST_GET_DROPDOWN_WORK_STATUS_FINISHED';

export const getFilterBy = (dropdown: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownTextValueModel[]>(
      dispatch, 
        GET_DROPDOWN_WORK_STATUS, 
        WorkListEffects.getFilterBy, 
        dropdown
      );
  };
};

export const GET_DROPDOWN_BRANCH: string = 'WorkListActions.REQUEST_GET_DROPDOWN_BRANCH';
export const GET_DROPDOWN_BRANCH_FINISHED: string = 'WorkListActions.REQUEST_GET_DROPDOWN_BRANCH_FINISHED';

export const GET_DROPDOWN_SUB_BRANCH: string = 'WorkListActions.REQUEST_GET_DROPDOWN_SUB_BRANCH';
export const GET_DROPDOWN_SUB_BRANCH_FINISHED: string = 'WorkListActions.REQUEST_GET_DROPDOWN_SUB_BRANCH_FINISHED';

export const getDropdownByFunnelID = (dropdown: string, funnelGenId?: number, branch?: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownTextValueModel[]>(
      dispatch, 
        dropdown === "branch" ? GET_DROPDOWN_BRANCH : 
        dropdown === "subBranch" ? GET_DROPDOWN_SUB_BRANCH : "", 
        WorkListEffects.getDropdownByFunnelID, 
        dropdown,
        funnelGenId,
        branch,
      );
  };
};

export const COPY_FUNNEL_ATTACHMENT: string = 'WorkListActions.REQUEST_COPY_FUNNEL_ATTACHMENT';
export const COPY_FUNNEL_ATTACHMENT_FINISHED: string = 'WorkListActions.REQUEST_COPY_FUNNEL_ATTACHMENT_FINISHED';
export const copyFunnelAttachment = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch, 
        COPY_FUNNEL_ATTACHMENT, 
        WorkListEffects.copyFunnelAttachment, 
        data
      );
  };
};

export const GET_DROPDOWN_ACTIVITY_CATEGORY: string = 'WorkListActions.REQUEST_GET_DROPDOWN_ACTIVITY_CATEGORY';
export const GET_DROPDOWN_ACTIVITY_CATEGORY_FINISHED: string = 'WorkListActions.REQUEST_GET_DROPDOWN_ACTIVITY_CATEGORY_FINISHED';
export const getDropdownActivityCategory = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ActivityCategoryModel[]>(
      dispatch, 
        GET_DROPDOWN_ACTIVITY_CATEGORY, 
        WorkListEffects.getDropdownActivityCategory, 
      );
  };
};

export const GET_HISTORY: string = 'WorkListActions.REQUEST_GET_HISTORY';
export const GET_HISTORY_FINISHED: string = 'WorkListActions.REQUEST_GET_HISTORY_FINISHED';
export const getHistory = (id: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<WorklistHistoryModel[]>(
      dispatch, 
        GET_HISTORY, 
        WorkListEffects.getHistory, 
        id,
      );
  };
};

export const RESET_LIST_ACTIVITY: string = 'WorkListActions.RESET_LIST_ACTIVITY';
export const clearListActivity = (): IAction<WorkActivityReportModel> => {
  return ActionUtility.createAction(RESET_LIST_ACTIVITY);
};

export const CREATE_ACTIVITY_PRODUCT:string ='WorkListActions.CREATE_ACTIVITY_PRODUCT';
export const createActivityProduct = (data: any): IAction<any> => {
  return ActionUtility.createAction(CREATE_ACTIVITY_PRODUCT, data);
};

export const DELETE_ACTIVITY_PRODUCT:string ='WorkListActions.DELETE_ACTIVITY_PRODUCT';
export const deleteActivityProduct = (activityReportProductGenID: number): IAction<any> => {
  return ActionUtility.createAction(DELETE_ACTIVITY_PRODUCT, activityReportProductGenID);
};

export const PUT_ACTIVITY_PRODUCT:string ='WorkListActions.PUT_ACTIVITY_PRODUCT';
export const putActivityProduct = (data: any): IAction<any> => {
  return ActionUtility.createAction(PUT_ACTIVITY_PRODUCT, data);
};

export const REMOVE_WORK_LIST_RESULT:string ='WorkListActions.REMOVE_WORK_LIST_RESULT';
export const clearResult = (): IAction<number> => {
  return ActionUtility.createAction(REMOVE_WORK_LIST_RESULT);
};

export const SET_PAGE: string = 'WorkListActions.SET_PAGE';
export const setActivePage = (activePage: number): IAction<number> => {
  return ActionUtility.createAction(SET_PAGE, activePage);
};

export const SET_EXPORT: string = 'WorkListActions.SET_EXPORT';
export const setExportExcel = (isExport: boolean): IAction<boolean> => {
  return ActionUtility.createAction(SET_EXPORT, isExport);
};