import ISoftwareState from './models/ISoftwareState';
import * as SoftwareActions from './SoftwareActions';
import IAction from '../../models/IAction';
import SoftwareModel from './models/SoftwareModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import SoftwareEnvelope from './models/SoftwareEnvelope';
import SoftwareToolEnvelope from './models/SoftwareToolEnvelope';
import SoftwareTypeModel from './models/SoftwareTypeModel';
import SoftwareMainModel from './models/SoftwareMainModel';
import SoftwareHeaderModel from './models/SoftwareHeaderModel';
import SoftwareUpdateHeaderModel from './models/SoftwareUpdateHeaderModel';
import SoftwareSearchModel from './models/SoftwareSearchModel';

export const initialState: ISoftwareState = {
  data: [],
  search: [],
  listSoftware: [],
  softwareType: [],
  businessSoftware: [],
  infrastructureSoftware: [],
  programmingSoftware: [],
  operatingSystem: [],
  listOS: [],
  listBusiness: [],
  listDB: [],
  listInfra: [],
  listProgramming: [],
  database: [],
  subSoftwareType: [],
  softwareToolType: [],
  firstData: new SoftwareMainModel({}),
  headerData: new SoftwareHeaderModel({}),
  listData: new SoftwareEnvelope({}),
  listDataDetail: new SoftwareToolEnvelope({}),
  error: false,
  refreshPage: false,
};

const softwareReducer: Reducer = baseReducer(initialState, {
  [SoftwareActions.REQUEST_SOFTWARE_TOOLS_FINISHED](state: ISoftwareState, action: IAction<SoftwareToolEnvelope>): ISoftwareState {
    return {
      ...state,
      listDataDetail: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [SoftwareActions.REQUEST_SOFTWARE_HEADER_FINISHED](state: ISoftwareState, action: IAction<SoftwareHeaderModel>): ISoftwareState {
    return {
      ...state,
      headerData: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [SoftwareActions.REQUEST_SOFTWARES_FINISHED](state: ISoftwareState, action: IAction<SoftwareEnvelope>): ISoftwareState {
    return {
      ...state,
      listData: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [SoftwareActions.REQUEST_SOFTWARES_SEARCH_FINISHED](state: ISoftwareState, action: IAction<SoftwareEnvelope>): ISoftwareState {
    return {
      ...state,
      listData: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [SoftwareActions.REQUEST_SOFTWARE_BY_FUNNEL_FINISHED](state: ISoftwareState, action: IAction<SoftwareSearchModel[]>): ISoftwareState {
    return {
      ...state,
      listSoftware: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [SoftwareActions.REQUEST_SOFTWARE_TYPE_FINISHED](state: ISoftwareState, action: IAction<SoftwareTypeModel[]>): ISoftwareState {
    return {
      ...state,
      softwareType: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [SoftwareActions.REQUEST_SOFTWARE_TOOL_TYPE_FINISHED](state: ISoftwareState, action: IAction<SoftwareTypeModel[]>): ISoftwareState {
    return {
      ...state,
      softwareToolType: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [SoftwareActions.REQUEST_SUB_SOFTWARE_TYPE_FINISHED](state: ISoftwareState, action: IAction<SoftwareTypeModel[]>): ISoftwareState {
    return {
      ...state,
      subSoftwareType: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [SoftwareActions.POST_SOFTWARE_FINISHED](state: ISoftwareState, action: IAction<SoftwareModel>): ISoftwareState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [SoftwareActions.PUT_SOFTWARE_FINISHED](state: ISoftwareState, action: IAction<SoftwareMainModel>): ISoftwareState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [SoftwareActions.PUT_SOFTWARE_HEADER_FINISHED](state: ISoftwareState, action: IAction<SoftwareUpdateHeaderModel>): ISoftwareState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [SoftwareActions.REQUEST_SOFTWARE_BY_NAME_FINISHED](state: ISoftwareState, action: IAction<SoftwareSearchModel[]>): ISoftwareState {
    return {
      ...state,
      search: action.payload!,
    };
  },

  [SoftwareActions.REQUEST_SOFTWARE_BY_ID_FINISHED](state: ISoftwareState, action: IAction<SoftwareMainModel>): ISoftwareState {
    return {
      ...state,
      firstData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [SoftwareActions.REQUEST_SOFTWARE_BY_BUSINESS_FINISHED](state: ISoftwareState, action: IAction<SoftwareTypeModel[]>): ISoftwareState {
    return {
      ...state,
      businessSoftware: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [SoftwareActions.REQUEST_SOFTWARE_BY_INFRA_FINISHED](state: ISoftwareState, action: IAction<SoftwareTypeModel[]>): ISoftwareState {
    return {
      ...state,
      infrastructureSoftware: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [SoftwareActions.REQUEST_SOFTWARE_BY_PROGRAMMING_FINISHED](state: ISoftwareState, action: IAction<SoftwareTypeModel[]>): ISoftwareState {
    return {
      ...state,
      programmingSoftware: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [SoftwareActions.REQUEST_SOFTWARE_BY_OS_FINISHED](state: ISoftwareState, action: IAction<SoftwareTypeModel[]>): ISoftwareState {
    return {
      ...state,
      operatingSystem: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [SoftwareActions.REQUEST_SOFTWARE_BY_DB_FINISHED](state: ISoftwareState, action: IAction<SoftwareTypeModel[]>): ISoftwareState {
    return {
      ...state,
      database: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [SoftwareActions.GET_SOFTWARE_BUSINESS_FINISHED](state: ISoftwareState, action: IAction<SoftwareSearchModel[]>): ISoftwareState {
    return {
      ...state,
      listBusiness: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [SoftwareActions.GET_SOFTWARE_DB_FINISHED](state: ISoftwareState, action: IAction<SoftwareSearchModel[]>): ISoftwareState {
    return {
      ...state,
      listDB: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [SoftwareActions.GET_SOFTWARE_INFRA_FINISHED](state: ISoftwareState, action: IAction<SoftwareSearchModel[]>): ISoftwareState {
    return {
      ...state,
      listInfra: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

    [SoftwareActions.GET_SOFTWARE_OS_FINISHED](state:ISoftwareState, action:IAction<SoftwareSearchModel[]>): ISoftwareState {
      return {
        ...state,
        listOS:action.payload!,
        error:action.error!,
        refreshPage:false
      }
    },
    [SoftwareActions.GET_SOFTWARE_PROGRAMMING_FINISHED](state:ISoftwareState, action:IAction<SoftwareSearchModel[]>): ISoftwareState {
      return {
        ...state,
        listProgramming:action.payload!,
        error:action.error!,
        refreshPage:false
      }
    },

    [SoftwareActions.POST_SOFTWARE_TOOL_TYPE_FINISHED](state:ISoftwareState,
      action:IAction<SoftwareUpdateHeaderModel>):ISoftwareState{
      return {
        ...state,
        error:action.error!,
        refreshPage:(action.error) ? false : true    
      }
    },

    [SoftwareActions.POST_SOFTWARE_TOOL_SUB_FINISHED](state:ISoftwareState,
      action:IAction<SoftwareUpdateHeaderModel>):ISoftwareState{
      return {
        ...state,
        error:action.error!,
        refreshPage:(action.error) ? false : true    
      }
    },

  }
  
);

export default softwareReducer;
