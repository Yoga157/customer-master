import { Reducer } from "redux";

import TicketDropdownTextValueModel from "./models/TicketDropdownTextValueModel";
import TicketDropdownSearchByModel from "./models/TicketDropdownSearchByModel";
import TicketValueEndDateModel from "./models/TicketValueEndDateModel";
import TicketProjSummaryModel from "./models/TicketProjSummaryModel";
import TicketValueEmailModel from "./models/TicketValueEmailModel";
import TicketEntrykeyModel from "./models/TicketEntrykeyModel";
import TicketHeaderModel from "./models/TicketHeaderModel";
import TicketDetailModel from "./models/TicketDetailModel";
import TicketListModel from "./models/TicketListModel";
import ITicketState from "./models/ITicketState";
import * as TicketActions from "./TicketActions"
import ResultActions from "models/ResultActions";
import baseReducer from "utilities/BaseReducer";
import IAction from "models/IAction";

export const initialState: ITicketState = {
  valueEndDate : new TicketValueEndDateModel({}),
  projectSummary: new TicketProjSummaryModel({}),
  valueEmail: new TicketValueEmailModel({}),
  ticketDetail: new TicketDetailModel({}),
  headerTicket: new TicketHeaderModel({}),
  resultActions: new ResultActions({}),
  ticketList: new TicketListModel({}),
  drpSecondaryResource: [],
  dropdownSlaCustomer: [],
  dropdownSubCategory: [],
  dropdownIssueType: [],
  dropdownTemplate: [],
  dropdownCategory: [],
  dropdownSubIssue: [],
  refreshPage: false,
  drpComplexity: [],
  searchSummary: [],
  isExport: false,
  drpCustomer: [],
  drpPriority: [],
  drpResource: [],
  activePage: 1,
  error: false,
};

const TicketReducer: Reducer = baseReducer(initialState, {

  
  [TicketActions.GET_TICKET_LIST_FINISHED](state: ITicketState, action: IAction<TicketListModel>): ITicketState {
    return {
      ...state,
      ticketList: action.payload!,
      error: false,
      refreshPage: false,  
    };
  },
  
  [TicketActions.GET_TICKET_LIST_BY_IDPROJECT_FINISHED](state: ITicketState, action: IAction<TicketListModel>): ITicketState {
    return {
      ...state,
      ticketList: action.payload!,
      error: false,
      refreshPage: false,  
    };
  },

  [TicketActions.GET_TICKET_LIST_SEARCH_FINISHED](state: ITicketState, action: IAction<TicketListModel>): ITicketState {
    return {
      ...state,
      ticketList: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_TICKET_LIST_SEARCH_BY_IDPROJECT_FINISHED](state: ITicketState, action: IAction<TicketListModel>): ITicketState {
    return {
      ...state,
      ticketList: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_TICKET_LIST_FILTER_FINISHED](state: ITicketState, action: IAction<TicketListModel>): ITicketState {
    return {
      ...state,
      ticketList: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_TICKET_LIST_FILTER_BY_IDPROJECT_FINISHED](state: ITicketState, action: IAction<TicketListModel>): ITicketState {
    return {
      ...state,
      ticketList: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.POST_TICKET_FINISHED](state: ITicketState, action: IAction<ResultActions>): ITicketState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.PUT_TICKET_FINISHED](state: ITicketState, action: IAction<ResultActions>): ITicketState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_TICKET_DETAIL_FINISHED](state: ITicketState, action: IAction<TicketDetailModel>): ITicketState {
    return {
      ...state,
      ticketDetail: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.REASSIGN_TICKET_FINISHED](state: ITicketState, action: IAction<ResultActions>): ITicketState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_TICKET_HEADER_FINISHED](state: ITicketState, action: IAction<TicketHeaderModel>): ITicketState {
    return {
      ...state,
      headerTicket: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_PROJECT_SUMMARY_BY_PROJECT_ID_FINISHED](state: ITicketState, action: IAction<TicketProjSummaryModel>): ITicketState {
    return {
      ...state,
      projectSummary: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_PROJECT_SUMMARY_BY_FUNNEL_ID_FINISHED](state: ITicketState, action: IAction<TicketProjSummaryModel>): ITicketState {
    return {
      ...state,
      projectSummary: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_PROJECT_SUMMARY_BY_SO_FINISHED](state: ITicketState, action: IAction<TicketProjSummaryModel>): ITicketState {
    return {
      ...state,
      projectSummary: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_PROJECT_SUMMARY_BY_CUSTOMER_FINISHED](state: ITicketState, action: IAction<TicketProjSummaryModel>): ITicketState {
    return {
      ...state,
      projectSummary: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_PROJECT_SUMMARY_BY_TICKETID_FINISHED](state: ITicketState, action: IAction<TicketProjSummaryModel>): ITicketState {
    return {
      ...state,
      projectSummary: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_DROPDOWN_TASK_RESOURCE_FINISHED](state: ITicketState, action: IAction<TicketDropdownTextValueModel[]>): ITicketState {
    return {
      ...state,
      drpResource: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_DROPDOWN_SECONDARY_RESOURCE_FINISHED](state: ITicketState, action: IAction<TicketDropdownTextValueModel[]>): ITicketState {
    return {
      ...state,
      drpSecondaryResource: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_DROPDOWN_CUSTOMER_FINISHED](state: ITicketState, action: IAction<TicketDropdownTextValueModel[]>): ITicketState {
    return {
      ...state,
      drpCustomer: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_DROPDOWN_TASK_RESOURCE_BYPROJECTID_FINISHED](state: ITicketState, action: IAction<TicketDropdownTextValueModel[]>): ITicketState {
    return {
      ...state,
      drpResource: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_DROPDOWN_SECONDARY_RESOURCE_BYPROJECTID_FINISHED](state: ITicketState, action: IAction<TicketDropdownTextValueModel[]>): ITicketState {
    return {
      ...state,
      drpSecondaryResource: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_VAL_SEARCH_PROJECT_ID_FINISHED](state: ITicketState, action: IAction<TicketDropdownSearchByModel[]>): ITicketState {
    return {
      ...state,
      searchSummary: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_VAL_SEARCH_FUNNEL_ID_FINISHED](state: ITicketState, action: IAction<TicketDropdownSearchByModel[]>): ITicketState {
    return {
      ...state,
      searchSummary: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_VAL_SEARCH_SO_FINISHED](state: ITicketState, action: IAction<TicketDropdownSearchByModel[]>): ITicketState {
    return {
      ...state,
      searchSummary: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_VAL_SEARCH_CUSTOMER_FINISHED](state: ITicketState, action: IAction<TicketDropdownSearchByModel[]>): ITicketState {
    return {
      ...state,
      searchSummary: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_DROPDOWN_TASK_PRIORITY_FINISHED](state: ITicketState, action: IAction<TicketEntrykeyModel[]>): ITicketState {
    return {
      ...state,
      drpPriority: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.GET_DROPDOWN_COMPLEXITY_FINISHED](state: ITicketState, action: IAction<TicketEntrykeyModel[]>): ITicketState {
    
    return {
      ...state,
      drpComplexity: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
    [TicketActions.GET_DROPDOWN_TASK_TEMPLATE_FINISHED](state: ITicketState, action: IAction<TicketEntrykeyModel[]>): ITicketState {
      
      return {
        ...state,
        dropdownTemplate: action.payload!,
        error: false,
        refreshPage: false,
      };
    },
  
    [TicketActions.GET_DROPDOWN_TASK_CATEGORY_FINISHED](state: ITicketState, action: IAction<TicketEntrykeyModel[]>): ITicketState {
      
      return {
        ...state,
        dropdownCategory: action.payload!,
        error: false,
        refreshPage: false,
      };
    },
  
    [TicketActions.GET_DROPDOWN_TASK_SUB_CATEGORY_FINISHED](state: ITicketState, action: IAction<TicketEntrykeyModel[]>): ITicketState {
      
      return {
        ...state,
        dropdownSubCategory: action.payload!,
        error: false,
        refreshPage: false,
      };
    },

      
  [TicketActions.GET_DROPDOWN_SLA_CUSTOMER_FINISHED](state: ITicketState, action: IAction<TicketEntrykeyModel[]>): ITicketState {
    return {
       ...state,
      dropdownSlaCustomer: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
    [TicketActions.GET_DROPDOWN_TASK_ISSUE_FINISHED](state: ITicketState, action: IAction<TicketEntrykeyModel[]>): ITicketState {
      
      return {
        ...state,
        dropdownIssueType: action.payload!,
        error: false,
        refreshPage: false,
      };
    },
  
    [TicketActions.GET_DROPDOWN_TASK_SUB_ISSUE_FINISHED](state: ITicketState, action: IAction<TicketEntrykeyModel[]>): ITicketState {
      
      return {
        ...state,
        dropdownSubIssue: action.payload!,
        error: false,
        refreshPage: false,
      };
    },

  [TicketActions.SET_EXPORT_EXCEL](state: ITicketState, action: IAction<boolean>): ITicketState {
    return {
      ...state,
      isExport: action.payload!,   
    };
  },
  
  [TicketActions.REMOVE_TICKET_RESULT](state: ITicketState, action: IAction<number>): ITicketState {
    return {
      ...state,
      resultActions: new ResultActions({}),
    };
  },
  
  [TicketActions.RESET_PROJECT_SUMMARY](state: ITicketState, action: IAction<TicketProjSummaryModel>): ITicketState {
    return {
      ...state,
      projectSummary: new TicketProjSummaryModel({}),
    };
  },
  
  [TicketActions.RESET_SEARCH_VALUE](state: ITicketState, action: IAction<TicketDropdownTextValueModel[]>): ITicketState {
    return {
      ...state,
      searchSummary: [],
    };
  },
  
  [TicketActions.VALUE_EMAIL_FINISHED](state: ITicketState, action: IAction<TicketValueEmailModel>): ITicketState {
    return {
      ...state,
      valueEmail: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [TicketActions.VALUE_END_DATE_FINISHED](state: ITicketState, action: IAction<TicketValueEndDateModel>): ITicketState {
    return {
      ...state,
      valueEndDate: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [TicketActions.RESET_VALUE_END_DATE](state: ITicketState, action: IAction<TicketValueEndDateModel>): ITicketState {
    return {
      ...state,
      valueEndDate: new TicketValueEndDateModel({}),
    };
  },

  [TicketActions.SET_PAGE](state: ITicketState, action: IAction<number>): ITicketState {
    return {
      ...state,
      activePage: action.payload!,   
    };
  },
});

export default TicketReducer;