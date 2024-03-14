import IFunnelState from './models/IFunnelState';
import * as FunnelActions from './FunnelActivityActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import FunnelOpportunityModel from './models/FunnelOpportunityModel';
import FunnelOpportunityRow from './models/FunnelOpportunityRow';
import ResultActions from 'models/ResultActions';

export const initialState: IFunnelState = {
  data: new FunnelOpportunityModel({}),
  listCustomer: [],
  employee: [],
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
  dataById: [],
  listDirektorat: [],
  checkData: '',
};

const funnelReducer: Reducer = baseReducer(initialState, {
  [FunnelActions.REQUEST_FUNNELS_OPPORTUNITY_FINISHED](state: IFunnelState, action: IAction<FunnelOpportunityModel>): IFunnelState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_FUNNELS_OPPORTUNITY_SALES_FINISHED](state: IFunnelState, action: IAction<FunnelOpportunityModel>): IFunnelState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_SEARCH_OPP_FINISHED](state: IFunnelState, action: IAction<FunnelOpportunityModel>): IFunnelState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_SEARCH_MARKETING_FINISHED](state: IFunnelState, action: IAction<FunnelOpportunityModel>): IFunnelState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_CUSTOMERS_FINISHED](state: IFunnelState, action: IAction<any>): IFunnelState {
    return {
      ...state,
      listCustomer: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_SALES_FINISHED](state: IFunnelState, action: IAction<any>): IFunnelState {
    return {
      ...state,
      employee: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.POST_FUNNELS_OPPORTUNITY_FINISHED](state: IFunnelState, action: IAction<ResultActions>): any {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelActions.REQUEST_REASSIGN_SALES_FINISHED](state: IFunnelState, action: IAction<ResultActions>): any {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelActions.POST_UPLOAD_OPP_FINISHED](state: IFunnelState, action: IAction<ResultActions>): any {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelActions.PUT_FUNNELS_OPPORTUNITY_FINISHED](state: IFunnelState, action: IAction<ResultActions>): any {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelActions.REQUEST_OPPORTUNITY_BYID_FINISHED](state: IFunnelState, action: IAction<FunnelOpportunityModel>): IFunnelState {
    return {
      ...state,
      dataById: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.CLEAR_RESULT_OPP_FINISHED](state: IFunnelState, action: IAction<any>): IFunnelState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_DIREKTORAT_FINISHED](state: IFunnelState, action: IAction<any>): IFunnelState {
    return {
      ...state,
      listDirektorat: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_DELETE_OPPORTUNITY_FINISHED](state: IFunnelState, action: IAction<any>): IFunnelState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_CHECK_OPPORTUNITY_FINISHED](state: IFunnelState, action: IAction<any>): IFunnelState {
    return {
      ...state,
      checkData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
});

export default funnelReducer;
