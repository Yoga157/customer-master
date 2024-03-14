// import ICreditBillingState from './models/ICreditBillingState';
// import * as CreditBillingActions from './CreditBillingActions';
import * as AWSCredentialActions from './AWSCredentialActions';
import IAction from '../../models/IAction';
//import SoftwareModel from './models/SoftwareModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
// import CreditBillingEnvelope from './models/CreditBillingEnvelope';
import ResultActions from 'models/ResultActions';
import IAWSCredentialState from './models/IAWSCredentialState';
import AWSCredentialEnvelope from './models/AWSCredentialEnvelope';
import AWSCredentialModel from './models/AWSCredentialModel';
//import SoftwareToolEnvelope from './models/SoftwareToolEnvelope';
//import SoftwareTypeModel from './models/SoftwareTypeModel';
//import SoftwareMainModel from './models/SoftwareMainModel';
//import SoftwareHeaderModel from './models/SoftwareHeaderModel';
//import SoftwareUpdateHeaderModel from './models/SoftwareUpdateHeaderModel';
//import SoftwareSearchModel from './models/SoftwareSearchModel';

export const initialState: IAWSCredentialState = {
  listData: new AWSCredentialEnvelope({}),
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
};

const AWSCredentialReducer: Reducer = baseReducer(initialState, {
  [AWSCredentialActions.REQUEST_AWS_CREDENTIAL_FINISHED](state: IAWSCredentialState, action: IAction<AWSCredentialEnvelope>): IAWSCredentialState {
    return {
      ...state,
      listData: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [AWSCredentialActions.POST_AWS_CREDENTIAL_FINISHED](state: IAWSCredentialState, action: IAction<ResultActions>): IAWSCredentialState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [AWSCredentialActions.UPDATE_AWS_CREDENTIAL_FINISHED](state: IAWSCredentialState, action: IAction<ResultActions>): IAWSCredentialState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [AWSCredentialActions.DEL_AWS_CREDENTIAL_FINISHED](state: IAWSCredentialState, action: IAction<ResultActions>): IAWSCredentialState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [AWSCredentialActions.REMOVE_SUBMIT_RESULT_FINISHED](state: IAWSCredentialState, action: IAction<ResultActions>): IAWSCredentialState {
    const clearResult = new ResultActions({})
    return {
    ...state,
    error: action.error!,
    refreshPage: action.error ? false : true,
    resultActions: clearResult!,
    };
  },
  /* [SoftwareActions.REQUEST_SOFTWARES_SEARCH_FINISHED](state: ISoftwareState, action: IAction<SoftwareEnvelope>): ISoftwareState {
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
    }, */
});

export default AWSCredentialReducer;
