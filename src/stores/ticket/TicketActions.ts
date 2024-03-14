

import TicketDropdownTextValueModel from './models/TicketDropdownTextValueModel';
import TicketDropdownSearchByModel from './models/TicketDropdownSearchByModel';
import TicketValueEndDateModel from './models/TicketValueEndDateModel';
import TicketProjSummaryModel from './models/TicketProjSummaryModel';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import TicketValueEmailModel from './models/TicketValueEmailModel';
import ReAssignTicketModel from './models/ReAssignTicketModel';
import TicketEntrykeyModel from './models/TicketEntrykeyModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import  TicketHeaderModel  from './models/TicketHeaderModel';
import TicketDetailModel from './models/TicketDetailModel';
import TicketListModel from './models/TicketListModel';
import TicketPutModel from './models/TicketPutModel';
import * as TicketListEffects from './TicketEffects';
import { ReduxDispatch } from 'models/ReduxProps';
import ResultActions from 'models/ResultActions';
import IAction from 'models/IAction';

type ActionUnion =
  TicketDropdownTextValueModel[]
  | TicketDropdownSearchByModel[]
  | TicketValueEndDateModel
  | HttpErrorResponseModel
  | TicketProjSummaryModel
  | TicketValueEmailModel
  | TicketEntrykeyModel[]
  | TicketHeaderModel
  | TicketDetailModel
  | ResultActions
  | undefined
  | boolean
  | boolean
  | any


  export const GET_TICKET_LIST: string = 'TicketActions.REQUEST_GET_TICKET_LIST';
  export const GET_TICKET_LIST_FINISHED: string = 'TicketActions.REQUEST_GET_TICKET_LIST_FINISHED';

  export const getTiketList = (page: number, pageSize: number, column: string, sorting: string, userLogin: string, userLoginId: number ): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<TicketListModel>(
        dispatch, 
          GET_TICKET_LIST, 
          TicketListEffects.getTiketList, 
          page,
          pageSize,
          column,
          sorting,
          userLogin,
          userLoginId
        );
    };
  };

  export const GET_TICKET_LIST_BY_IDPROJECT: string = 'TicketActions.REQUEST_GET_TICKET_LIST_BY_IDPROJECT';
  export const GET_TICKET_LIST_BY_IDPROJECT_FINISHED: string = 'TicketActions.REQUEST_GET_TICKET_LIST_BY_IDPROJECT_FINISHED';

  export const getTiketListByIdProject = (page: number, pageSize: number, column: string, sorting: string, projectId: number ): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<TicketListModel>(
        dispatch, 
          GET_TICKET_LIST_BY_IDPROJECT, 
          TicketListEffects.getTiketListByIdProject, 
          page,
          pageSize,
          column,
          sorting,
          projectId
        );
    };
  };

  export const GET_TICKET_LIST_SEARCH: string = 'TicketActions.REQUEST_GET_TICKET_LIST_SEARCH';
  export const GET_TICKET_LIST_SEARCH_FINISHED: string = 'TicketActions.REQUEST_GET_TICKET_LIST_SEARCH_FINISHED';

  export const getTicketlistSearch = (page: number, pageSize: number, column: string, sorting: string, search: string, userLogin: string, userLoginId: number ): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<TicketListModel>(
        dispatch, 
          GET_TICKET_LIST_SEARCH, 
          TicketListEffects.getTicketlistSearch, 
          page,
          pageSize,
          column,
          sorting,
          search,
          userLogin,
          userLoginId
        );
    };
  };

  
  export const GET_TICKET_LIST_SEARCH_BY_IDPROJECT: string = 'TicketActions.REQUEST_GET_TICKET_LIST_SEARCH_BY_IDPROJECT';
  export const GET_TICKET_LIST_SEARCH_BY_IDPROJECT_FINISHED: string = 'TicketActions.REQUEST_GET_TICKET_LIST_SEARCH_BY_IDPROJECT_FINISHED';

  export const getTiketListSearchByIdProject = (page: number, pageSize: number, column: string, sorting: string, search: string, projectId: number ): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<TicketListModel>(
        dispatch, 
          GET_TICKET_LIST_SEARCH_BY_IDPROJECT, 
          TicketListEffects.getTiketListSearchByIdProject, 
          page,
          pageSize,
          column,
          sorting,
          search,
          projectId
        );
    };
  };


    export const GET_TICKET_LIST_FILTER: string = 'TicketActions.REQUEST_GET_TICKET_LIST_FILTER';
    export const GET_TICKET_LIST_FILTER_FINISHED: string = 'TicketActions.REQUEST_GET_TICKET_LIST_FILTER_FINISHED';
  
    export const getTicketlistFilter = (data: any): any => {
      return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<TicketListModel>(
          dispatch, 
            GET_TICKET_LIST_FILTER, 
            TicketListEffects.getTicketlistFilter, 
            data
          );
      };
    };

    export const GET_TICKET_LIST_FILTER_BY_IDPROJECT: string = 'TicketActions.REQUEST_GET_TICKET_LIST_FILTER_BY_IDPROJECT';
    export const GET_TICKET_LIST_FILTER_BY_IDPROJECT_FINISHED: string = 'TicketActions.REQUEST_GET_TICKET_LIST_FILTER_BY_IDPROJECT_FINISHED';
  
    export const getTicketlistFilterByIdProject = (data: any): any => {
      return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<TicketListModel>(
          dispatch, 
            GET_TICKET_LIST_FILTER_BY_IDPROJECT, 
            TicketListEffects.getTicketlistFilterByIdProject, 
            data
          );
      };
    };

    export const POST_TICKET: string = 'TicketActions.REQUEST_POST_TICKET';
    export const POST_TICKET_FINISHED: string = 'TicketActions.REQUEST_POST_TICKET_FINISHED';
    export const postTicket = (data: any): any => {
      return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
          dispatch, 
            POST_TICKET, 
            TicketListEffects.postTicket, 
            data
          );
      };
    };

    export const PUT_TICKET: string = 'TicketActions.REQUEST_PUT_TICKET';
    export const PUT_TICKET_FINISHED: string = 'TicketActions.REQUEST_PUT_TICKET_FINISHED';
    export const putTicket = (data: TicketPutModel): any => {
      return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
          dispatch, 
            PUT_TICKET, 
            TicketListEffects.putTicket, 
            data
          );
      };
    };

    export const GET_TICKET_DETAIL: string = 'TicketActions.REQUEST_GET_TICKET_DETAIL';
    export const GET_TICKET_DETAIL_FINISHED: string = 'TicketActions.REQUEST_GET_TICKET_DETAIL_FINISHED';
    export const getTicketDetail = (ticketId: number): any => {
      return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<TicketDetailModel>(
          dispatch, 
            GET_TICKET_DETAIL, 
            TicketListEffects.getTicketDetail, 
            ticketId
          );
      };
    };

  export const REASSIGN_TICKET: string = 'TicketActions.REQUEST_REASSIGN_TICKET';
  export const REASSIGN_TICKET_FINISHED: string = 'TicketActions.REQUEST_REASSIGN_TICKET_FINISHED';

  export const reqReAssignTicket = (data: ReAssignTicketModel): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch, 
          REASSIGN_TICKET, 
          TicketListEffects.reqReAssignTicket, 
          data,
        );
    };
  };

  export const GET_TICKET_HEADER: string = 'TicketActions.REQUEST_GET_TICKET_HEADER';
  export const GET_TICKET_HEADER_FINISHED: string = 'TicketActions.REQUEST_GET_TICKET_HEADER_FINISHED';
  export const getTicketHeader = ( projectId: number, funnelGenId: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<TicketHeaderModel>(
        dispatch, 
          GET_TICKET_HEADER, 
          TicketListEffects.getTicketHeader, 
          projectId,
          funnelGenId
        );
    };
  };

  export const GET_PROJECT_SUMMARY_BY_PROJECT_ID: string = 'TicketActions.REQUEST_GET_PROJECT_SUMMARY_BY_PROJECT_ID';
  export const GET_PROJECT_SUMMARY_BY_PROJECT_ID_FINISHED: string = 'TicketActions.REQUEST_GET_PROJECT_SUMMARY_BY_PROJECT_ID_FINISHED';

  export const GET_PROJECT_SUMMARY_BY_FUNNEL_ID: string = 'TicketActions.REQUEST_GET_PROJECT_SUMMARY_BY_FUNNEL_ID';
  export const GET_PROJECT_SUMMARY_BY_FUNNEL_ID_FINISHED: string = 'TicketActions.REQUEST_GET_PROJECT_SUMMARY_BY_FUNNEL_ID_FINISHED';

  export const GET_PROJECT_SUMMARY_BY_SO: string = 'TicketActions.REQUEST_GET_PROJECT_SUMMARY_BY_SO';
  export const GET_PROJECT_SUMMARY_BY_SO_FINISHED: string = 'TicketActions.REQUEST_GET_PROJECT_SUMMARY_BY_SO_FINISHED';

  export const GET_PROJECT_SUMMARY_BY_CUSTOMER: string = 'TicketActions.REQUEST_GET_PROJECT_SUMMARY_BY_CUSTOMER';
  export const GET_PROJECT_SUMMARY_BY_CUSTOMER_FINISHED: string = 'TicketActions.REQUEST_GET_PROJECT_SUMMARY_BY_CUSTOMER_FINISHED';

  export const GET_PROJECT_SUMMARY_BY_TICKETID: string = 'TicketActions.REQUEST_GET_PROJECT_SUMMARY_BY_TICKETID';
  export const GET_PROJECT_SUMMARY_BY_TICKETID_FINISHED: string = 'TicketActions.REQUEST_GET_PROJECT_SUMMARY_BY_TICKETID_FINISHED';

  export const getSummaryBy = (by: string, val: string|number, funnelGenId?: number, so?: string): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<TicketProjSummaryModel>(
        dispatch, 
          by === "projectId" ? GET_PROJECT_SUMMARY_BY_PROJECT_ID : 
          by === "funnelGenId" ? GET_PROJECT_SUMMARY_BY_FUNNEL_ID :  
          by === "so" ? GET_PROJECT_SUMMARY_BY_SO :
          by === "customerName" ? GET_PROJECT_SUMMARY_BY_CUSTOMER :  
          by === "ticketId" ? GET_PROJECT_SUMMARY_BY_TICKETID : "", 
          TicketListEffects.getSummaryBy, 
          by,
          val,
          funnelGenId,
          so
        );
    };
  };


export const GET_DROPDOWN_TASK_RESOURCE: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_RESOURCE';
export const GET_DROPDOWN_TASK_RESOURCE_FINISHED: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_RESOURCE_FINISHED';

export const GET_DROPDOWN_SECONDARY_RESOURCE: string = 'TicketActions.REQUEST_GET_DROPDOWN_SECONDARY_RESOURCE';
export const GET_DROPDOWN_SECONDARY_RESOURCE_FINISHED: string = 'TicketActions.REQUEST_GET_DROPDOWN_SECONDARY_RESOURCE_FINISHED';

export const GET_DROPDOWN_CUSTOMER: string = 'TicketActions.REQUEST_GET_DROPDOWN_CUSTOMER';
export const GET_DROPDOWN_CUSTOMER_FINISHED: string = 'TicketActions.REQUEST_GET_DROPDOWN_CUSTOMER_FINISHED';

export const getDropdown = (dropdown: string, userLoginId?: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<TicketDropdownTextValueModel[]>(
      dispatch, 
        dropdown === "resource" ? GET_DROPDOWN_TASK_RESOURCE : 
        dropdown === "secoundaryResource" ? GET_DROPDOWN_SECONDARY_RESOURCE : 
        dropdown === "customer" ? GET_DROPDOWN_CUSTOMER :"",
        TicketListEffects.getDropdown, 
        dropdown,
        userLoginId
      );
  };
};

export const GET_DROPDOWN_TASK_RESOURCE_BYPROJECTID: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_RESOURCE_BYPROJECTID';
export const GET_DROPDOWN_TASK_RESOURCE_BYPROJECTID_FINISHED: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_RESOURCE_BYPROJECTID_FINISHED';

export const GET_DROPDOWN_SECONDARY_RESOURCE_BYPROJECTID: string = 'TicketActions.REQUEST_GET_DROPDOWN_SECONDARY_RESOURCE_BYPROJECTID';
export const GET_DROPDOWN_SECONDARY_RESOURCE_BYPROJECTID_FINISHED: string = 'TicketActions.REQUEST_GET_DROPDOWN_SECONDARY_RESOURCE_BYPROJECTID_FINISHED';

export const getDropdownBy = (dropdown: string, projectID?: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<TicketDropdownTextValueModel[]>(
      dispatch, 
        dropdown === "resource" ? GET_DROPDOWN_TASK_RESOURCE_BYPROJECTID : 
        dropdown === "secoundaryResource" ? GET_DROPDOWN_SECONDARY_RESOURCE_BYPROJECTID : "",
        TicketListEffects.getDropdownBy, 
        dropdown,
        projectID
      );
  };
};


export const GET_VAL_SEARCH_PROJECT_ID: string = 'TicketActions.REQUEST_GET_VAL_SEARCH_PROJECT_ID';
export const GET_VAL_SEARCH_PROJECT_ID_FINISHED: string = 'TicketActions.REQUEST_GET_VAL_SEARCH_PROJECT_ID_FINISHED';

export const GET_VAL_SEARCH_FUNNEL_ID: string = 'TicketActions.REQUEST_GET_VAL_SEARCH_FUNNEL_ID';
export const GET_VAL_SEARCH_FUNNEL_ID_FINISHED: string = 'TicketActions.REQUEST_GET_VAL_SEARCH_FUNNEL_ID_FINISHED';

export const GET_VAL_SEARCH_SO: string = 'TicketActions.REQUEST_GET_VAL_SEARCH_SO';
export const GET_VAL_SEARCH_SO_FINISHED: string = 'TicketActions.REQUEST_GET_VAL_SEARCH_SO_FINISHED';

export const GET_VAL_SEARCH_CUSTOMER: string = 'TicketActions.REQUEST_GET_VAL_SEARCH_CUSTOMER';
export const GET_VAL_SEARCH_CUSTOMER_FINISHED: string = 'TicketActions.REQUEST_GET_VAL_SEARCH_CUSTOMER_FINISHED';

export const getSearch = (search: string, searchText: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<TicketDropdownSearchByModel[]>(
      dispatch, 
        search === "SearchProjectId" ? GET_VAL_SEARCH_PROJECT_ID : 
        search === "SearchFunnelGenId" ? GET_VAL_SEARCH_FUNNEL_ID : 
        search === "SearchSO" ? GET_VAL_SEARCH_SO :
        search === "SearchCustomer" ? GET_VAL_SEARCH_CUSTOMER: "" ,
        TicketListEffects.getSearch, 
        search,
        searchText
      );
  };
};


export const GET_DROPDOWN_TASK_PRIORITY: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_PRIORITY';
export const GET_DROPDOWN_TASK_PRIORITY_FINISHED: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_PRIORITY_FINISHED';

export const GET_DROPDOWN_COMPLEXITY: string = 'TicketActions.REQUEST_GET_DROPDOWN_COMPLEXITY';
export const GET_DROPDOWN_COMPLEXITY_FINISHED: string = 'TicketActions.REQUEST_GET_DROPDOWN_COMPLEXITY_FINISHED';

export const GET_DROPDOWN_TASK_TEMPLATE: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_TEMPLATE';
export const GET_DROPDOWN_TASK_TEMPLATE_FINISHED: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_TEMPLATE_FINISHED';

export const GET_DROPDOWN_TASK_CATEGORY: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_CATEGORY';
export const GET_DROPDOWN_TASK_CATEGORY_FINISHED: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_CATEGORY_FINISHED';

export const GET_DROPDOWN_TASK_SUB_CATEGORY: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_SUB_CATEGORY';
export const GET_DROPDOWN_TASK_SUB_CATEGORY_FINISHED: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_SUB_CATEGORY_FINISHED';

export const GET_DROPDOWN_TASK_ISSUE: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_ISSUE';
export const GET_DROPDOWN_TASK_ISSUE_FINISHED: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_ISSUE_FINISHED';

export const GET_DROPDOWN_TASK_SUB_ISSUE: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_SUB_ISSUE';
export const GET_DROPDOWN_TASK_SUB_ISSUE_FINISHED: string = 'TicketActions.REQUEST_GET_DROPDOWN_TASK_SUB_ISSUE_FINISHED';


export const GET_DROPDOWN_SLA_CUSTOMER: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_SLA_CUSTOMER';
export const GET_DROPDOWN_SLA_CUSTOMER_FINISHED: string = 'ProjectGundamActions.REQUEST_GET_DROPDOWN_SLA_CUSTOMER_FINISHED';


export const getDrpByEntryKey = (dropdown: string, text1?: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<TicketEntrykeyModel[]>(
      dispatch,
        dropdown === "TaskPriority" ? GET_DROPDOWN_TASK_PRIORITY : 
        dropdown === "Complexity" ? GET_DROPDOWN_COMPLEXITY : 
         dropdown === "TaskCategory" ? GET_DROPDOWN_TASK_CATEGORY  :
         dropdown === "TaskIssueType" ? GET_DROPDOWN_TASK_ISSUE  :
         dropdown ===  "taskTemplate" ? GET_DROPDOWN_TASK_TEMPLATE :
         dropdown === "taskSubCategory" ? GET_DROPDOWN_TASK_SUB_CATEGORY : 
         dropdown === "slaCustomer" ? GET_DROPDOWN_SLA_CUSTOMER : GET_DROPDOWN_TASK_SUB_ISSUE, 
        TicketListEffects.getDrpByEntryKey, 
        dropdown,
        text1
      );
  };
};

export const VALUE_EMAIL: string = 'TicketActions.REQUEST_VALUE_EMAIL';
export const VALUE_EMAIL_FINISHED: string = 'TicketActions.REQUEST_VALUE_EMAIL_FINISHED';
export const getValueEmail = (taskId: number, userLoginId: number ): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<TicketValueEmailModel>(
      dispatch, 
        VALUE_EMAIL, 
        TicketListEffects.getValueEmail, 
        taskId,
        userLoginId,
      );
  };
};

export const VALUE_END_DATE: string = 'TicketActions.REQUEST_VALUE_END_DATE';
export const VALUE_END_DATE_FINISHED: string = 'TicketActions.REQUEST_VALUE_END_DATE_FINISHED';
export const getValueEndDate = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<TicketValueEndDateModel>(
      dispatch, 
        VALUE_END_DATE, 
        TicketListEffects.getValueEndDate, 
        data, 
      );
  };
};


export const SET_EXPORT_EXCEL: string = 'TicketActions.SET_EXPORT_EXCEL';
export const setExportExcel = (isExport: boolean): IAction<boolean> => {
  return ActionUtility.createAction(SET_EXPORT_EXCEL, isExport);
};

export const RESET_PROJECT_SUMMARY: string = 'TicketActions.RESET_PROJECT_SUMMARY';
export const clearProjSummary = (): IAction<TicketProjSummaryModel> => {
  return ActionUtility.createAction(RESET_PROJECT_SUMMARY);
};

export const RESET_VALUE_END_DATE: string = 'TicketActions.RESET_VALUE_END_DATE';
export const clearValueEndDate = (): IAction<TicketProjSummaryModel> => {
  return ActionUtility.createAction(RESET_VALUE_END_DATE);
};

export const RESET_SEARCH_VALUE: string = 'TicketActions.RESET_SEARCH_VALUE';
export const clearSearch = (): IAction<TicketDropdownTextValueModel[]> => {
  return ActionUtility.createAction(RESET_SEARCH_VALUE);
};

export const REMOVE_TICKET_RESULT:string ='TicketActions.REMOVE_TICKET_RESULT';
export const clearResult = (): IAction<number> => {
  return ActionUtility.createAction(REMOVE_TICKET_RESULT);
};

export const SET_PAGE: string = 'TicketActions.SET_PAGE';
export const setActivePage = (activePage: number): IAction<number> => {
  return ActionUtility.createAction(SET_PAGE, activePage);
};