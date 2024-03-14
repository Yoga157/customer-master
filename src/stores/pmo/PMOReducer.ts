import { Reducer } from "redux";

import PMORequirementClosingProject from "./models/PMORequirementClosingProject";
import CustomerForPmoProjectModel from "./models/CustomerForPmoProjectModel";
import PMOProgressDetailMilestone from "./models/PMOProgressDetailMilestone";
import PMOViewEditProjectStatus from "./models/PMOViewEditProjectStatus";
import CheckAllowedUpdateModel from "./models/CheckAllowedUpdateModel";
import PMOViewEditCustommerPO from "./models/PMOViewEditCustommerPO";
import PMOGetByEntryKeyModel from "./models/PMOGetByEntryKeyModel";
import PMOGetActualDateModel from "./models/PMOGetActualDateModel";
import PMOProgressMilestone from "./models/PMOProgressMilestone";
import PMOProjectByIDModel from "./models/PMOProjectByIDModel";
import PMOViewEditStatus from "./models/PMOViewEditStatus";
import PMOListEnvelope from "./models/PMOListEnvelope";
import PMOTopListModel from "./models/PMOTopListModel";
import PMOSTypeSelect from "./models/PMOSTypeSelect";
import PMOSOorOIExist from "./models/PMOSOorOIExist";
import ResultActions from "models/ResultActions";
import baseReducer from "utilities/BaseReducer";
import IPMOState from "./models/IPMOState";
import * as PMOActions from "./PMOActions"
import IAction from "models/IAction";    

export const initialState: IPMOState = {
  isExportExcel: false,
  refreshPage: false,
  activePage: 1,
  error: false,
  pmoSummaryStatus: [],
  customerListDrp: [],
  funnelSoOiExist: [],
  smoMappingList: [],
  assignListDrp: [],
  salesListDrp: [],
  projListDrp: [],
  topList: new PMOTopListModel({}),
  isAllow: new CheckAllowedUpdateModel({}),
  customerPmoProject: new CustomerForPmoProjectModel({}),
  progressDetailMilestone: new PMOProgressDetailMilestone({}),
  requirementClosingProject: new PMORequirementClosingProject({}),
  pmoViewEditStatus: new PMOViewEditProjectStatus({}),
  progressMilestone: new PMOProgressMilestone({}),
  pmoViewEditPO: new PMOViewEditCustommerPO({}),
  latestMilestone: new PMOViewEditStatus({}),
  projectSummary: new PMOViewEditStatus({}),
  pmoProjectBy: new PMOProjectByIDModel({}),
  actualDate: new PMOGetActualDateModel({}),
  resultActions: new ResultActions({}),
  data: new PMOListEnvelope({}),
};

const PMOReducer: Reducer = baseReducer(initialState, {

  [PMOActions.REQUEST_PMO_LIST_FINISHED](state: IPMOState, action: IAction<PMOListEnvelope>): IPMOState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },

  [PMOActions.PMO_LIST_SEARCH_FINISHED](state: IPMOState, action: IAction<PMOListEnvelope>): IPMOState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },

  [PMOActions.POST_PMO_FILTER_FINISHED](state: IPMOState, action: IAction<PMOListEnvelope>): IPMOState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },

  [PMOActions.FUNNEL_SO_OI_EXIST_FINISHED](state: IPMOState, action: IAction<PMOSOorOIExist[]>): IPMOState {
    return {
      ...state,
      funnelSoOiExist: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },

  [PMOActions.CUSTOMER_FOR_PMO_PROJECT_FINISHED](state: IPMOState, action: IAction<CustomerForPmoProjectModel>): IPMOState {
    return {
      ...state,
      customerPmoProject: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },

  [PMOActions.PROJECT_DROPDOWN_FINISHED](state: IPMOState, action: IAction<PMOSTypeSelect[]>): IPMOState {
    return {
      ...state,
      projListDrp: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },

  [PMOActions.CUSTOMER_DROPDOWN_FINISHED](state: IPMOState, action: IAction<PMOSTypeSelect[]>): IPMOState {
    return {
      ...state,
      customerListDrp: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },

  [PMOActions.ASSIGN_DROPDOWN_FINISHED](state: IPMOState, action: IAction<PMOSTypeSelect[]>): IPMOState {
    return {
      ...state,
      assignListDrp: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },

  [PMOActions.SALES_DROPDOWN_FINISHED](state: IPMOState, action: IAction<PMOSTypeSelect[]>): IPMOState {
    return {
      ...state,
      salesListDrp: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },

  [PMOActions.PMO_SUMMARY_STATUS_FINISHED](state: IPMOState, action: IAction<PMOSTypeSelect[]>): IPMOState {
    return {
      ...state,
      pmoSummaryStatus: action.payload!,
      error: false,
      refreshPage: (action.error) ? false : true ,
    };
  },

  [PMOActions.PMO_PROJECT_FINISHED](state: IPMOState, action: IAction<ResultActions>): IPMOState {
    return {
      ...state,
      error: action.error!,
      resultActions: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },

  [PMOActions.PMO_PROJECT_BY_PROJECTID_FINISHED](state: IPMOState, action: IAction<PMOProjectByIDModel>): IPMOState {
    return {
      ...state,
      error: action.error!,
      pmoProjectBy: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [PMOActions.PMO_VIEW_EDIT_PO_FINISHED](state: IPMOState, action: IAction<PMOViewEditCustommerPO>): IPMOState {
    return {
      ...state,
      error: action.error!,
      pmoViewEditPO: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [PMOActions.VIEW_EDIT_STATUS_PROJECT_SUMMARY_FINISHED](state: IPMOState, action: IAction<PMOViewEditStatus>): IPMOState {
    return {
      ...state,
      error: action.error!,
      projectSummary: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [PMOActions.VIEW_EDIT_STATUS_LATEST_MILESTONE_FINISHED](state: IPMOState, action: IAction<PMOViewEditStatus>): IPMOState {
    return {
      ...state,
      error: action.error!,
      latestMilestone: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [PMOActions.VIEW_EDIT_PROGRESS_MILESTONE_FINISHED](state: IPMOState, action: IAction<PMOProgressMilestone>): IPMOState {
    return {
      ...state,
      error: action.error!,
      progressMilestone: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [PMOActions.PROGRESS_DETAIL_MILESTONE_FINISHED](state: IPMOState, action: IAction<PMOProgressDetailMilestone>): IPMOState {
    return {
      ...state,
      error: action.error!,
      progressDetailMilestone: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [PMOActions.PMO_VIEW_EDIT_STATUS_FINISHED](state: IPMOState, action: IAction<PMOViewEditProjectStatus>): IPMOState {
    return {
      ...state,
      error: action.error!,
      pmoViewEditStatus: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [PMOActions.REQUIREMENT_CLOSING_PROJECT_FINISHED](state: IPMOState, action: IAction<PMORequirementClosingProject>): IPMOState {
    return {
      ...state,
      error: action.error!,
      requirementClosingProject: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [PMOActions.PUT_WARRANTY_DATE_PROJECT_FINISHED](state: IPMOState, action: IAction<ResultActions>): IPMOState {
    return {
      ...state,
      error: action.error!,
      resultActions: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [PMOActions.PUT_HANDOVER_FINISHED](state: IPMOState, action: IAction<ResultActions>): IPMOState {
    return {
      ...state,
      error: action.error!,
      resultActions: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [PMOActions.PUT_PMO_PROJECT_STATUS_FINISHED](state: IPMOState, action: IAction<ResultActions>): IPMOState {
    return {
      ...state,
      error: action.error!,
      resultActions: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
 
  [PMOActions.PUT_APPROVAL_SMO_FINISHED](state: IPMOState, action: IAction<ResultActions>): IPMOState {
    return {
      ...state,
      error: action.error!,
      resultActions: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
 
  [PMOActions.PUT_RESUBMIT_FINISHED](state: IPMOState, action: IAction<ResultActions>): IPMOState {
    return {
      ...state,
      error: action.error!,
      resultActions: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },

  [PMOActions.PMO_TOP_FINISHED](state: IPMOState, action: IAction<PMOTopListModel>): IPMOState {
    return {
      ...state,
      error: action.error!,
      topList: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [PMOActions.REASSIGN_PMO_FINISHED](state: IPMOState, action: IAction<ResultActions>): IPMOState {
    return {
      ...state,
      error: action.error!,
      resultActions: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [PMOActions.GET_SMO_MAPPING_FINISHED](state: IPMOState, action: IAction<PMOGetByEntryKeyModel[]>): IPMOState {
    return {
      ...state,
      error: action.error!,
      smoMappingList: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  
  [PMOActions.GET_ACTUAL_DATE_FINISHED](state: IPMOState, action: IAction<PMOGetActualDateModel>): IPMOState {
    return {
      ...state,
      actualDate: action.payload!,
      error: action.error!,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  // [PMOActions.PUT_ACTUAL_START_FINISHED](state: IPMOState, action: IAction<ResultActions>): IPMOState {
  //   return {
  //     ...state,
  //     error: action.error!,
  //     resultActions: action.payload!,
  //     refreshPage: (action.error) ? false : true ,
  //   };
  // },
  
  // [PMOActions.PUT_ACTUAL_END_FINISHED](state: IPMOState, action: IAction<ResultActions>): IPMOState {
  //   return {
  //     ...state,
  //     error: action.error!,
  //     resultActions: action.payload!,
  //     refreshPage: (action.error) ? false : true ,
  //   };
  // },
  
  [PMOActions.GET_ALLOW_UPDATE_FINISHED](state: IPMOState, action: IAction<CheckAllowedUpdateModel>): IPMOState {
    return {
      ...state,
      error: action.error!,
      isAllow: action.payload!,
      refreshPage: (action.error) ? false : true ,
    };
  },
  
  [PMOActions.SET_IS_EXPORT_EXCEL](state: IPMOState, action: IAction<boolean>): IPMOState {
    return {
      ...state,
      isExportExcel: action.payload!,   
    };
  },

  [PMOActions.SET_PAGE](state: IPMOState, action: IAction<number>): IPMOState {
    return {
      ...state,
      activePage: action.payload!,   
    };
  },

  [PMOActions.CLEAR_RESULT](state: IPMOState, action: IAction<number>): IPMOState {
    return {
      ...state,
      resultActions: new ResultActions({}),   
    };
  },
});

export default PMOReducer;