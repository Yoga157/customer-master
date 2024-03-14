import * as COSTActions from './COSTAction';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import IInitState from './models/IInitState';
import CostType from './models/CostTypeModel';
import TableRowModel from './models/TableRowModel';
import CostName from './models/CostNameModel';
import CostTypeModel from './models/CostTypeModel';
import FunnelItemHistoryEnvelope from 'stores/funnel-product-service/models/FunnelItemHistoryEnvelope';
import FunnelCostHistoryEnvelope from './models/FunnelCostHistoryEnvelope';
import COFModel from './models/COFModel';

export const initialState: IInitState = {
  dropdownCOF: [],
  persenCOF: [],
  costType: [],
  costName: [],
  rowTable: [],
  listData: null,
  pmtData: new COFModel({}),
  error: false,
  refreshPage: false,
  resultActions: [],
  finish: false,
  funnelCostHistory: [],
    totalPMT: 0,
};

const costReducer: Reducer = baseReducer(initialState, {
  [COSTActions.REQUEST_PERSEN_COF_FINISHED](state: IInitState, action: IAction<any>): IInitState {
    return {
      ...state,
      persenCOF: action.payload!,
    };
  },
  [COSTActions.REQUEST_DROPDOWN_COF_FINISHED](state: IInitState, action: IAction<any>): IInitState {
    return {
      ...state,
      dropdownCOF: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [COSTActions.REQUEST_PMT_LOCAL_FINISHED](state: IInitState, action: IAction<any>): IInitState {
    return {
      ...state,
      totalPMT: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [COSTActions.REQUEST_PMT_FINISHED](state: IInitState, action: IAction<COFModel>): IInitState {
    return {
      ...state,
      pmtData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [COSTActions.REQUEST_COSTTYPE_FINISHED](state: IInitState, action: IAction<CostTypeModel[]>): IInitState {
    return {
      ...state,
      costType: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [COSTActions.REQUEST_COSTNAME_FINISHED](state: IInitState, action: IAction<CostName[]>): IInitState {
    return {
      ...state,
      costName: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [COSTActions.REQUEST_FUNNEL_COST_HISTORY_FINISHED](state: IInitState, action: IAction<FunnelCostHistoryEnvelope[]>): IInitState {
    return {
      ...state,
      funnelCostHistory: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [COSTActions.REQUEST_INSERT_COSTNAME_FINISHED](state: IInitState, action: any): IInitState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [COSTActions.REQUEST_POST_FUNNEL_COST_FINISHED](state: IInitState, action: any): IInitState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [COSTActions.REQUEST_FUNNEL_TABLEROW_FINISHED](state: IInitState, action: any): IInitState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      rowTable: action.payload!,
    };
  },

  [COSTActions.DEL_FUNNEL_COST_FINISHED](state: IInitState, action: IAction<TableRowModel>): IInitState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      finish: true,
    };
  },

  [COSTActions.DEL_FUNNEL_COST_LOCAL_FINISHED](state: IInitState, action: IAction<TableRowModel>): IInitState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      finish: true,
    };
  },

  [COSTActions.REQUEST_PUT_FUNNEL_COST_FINISHED](state: IInitState, action: IAction<any>): IInitState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [COSTActions.PUT_FUNNEL_COST_LOCAL_FINISHED](state: IInitState, action: IAction<TableRowModel>): IInitState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [COSTActions.REQUEST_FUNNEL_TABLEROW_LOCAL_FINISHED](state: IInitState, action: IAction<any>): IInitState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      rowTable: action.payload!,
    };
  },
});

export default costReducer;
