import IFunnelWarrantySLAState from './models/IFunnelWarrantySLAState';
import * as FunnelWarrantyActions from './FunnelWarrantyActions';
import IAction from '../../models/IAction';
import FunnelWarrantySLADetailModel from './models/FunnelWarrantySLADetailModel';
import FunnelWarrantySLAModel from './models/FunnelWarrantySLAModel';
import FunnelWarrantySupportModel from './models/FunnelWarrantySupportModel';
import FunnelWarrantySLADetailEnvelope from './models/FunnelWarrantySLADetailEnvelope';
import FunnelWarrantySLAEnvelope from './models/FunnelWarrantySLAEnvelope';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import ResultActions from 'models/ResultActions';

export const initialState: IFunnelWarrantySLAState = {
  data: [],
  firstData: new FunnelWarrantySLADetailModel({}),
  firstDataSLA: new FunnelWarrantySLAModel({}),
  firstDataSupport: new FunnelWarrantySupportModel({}),
  firstDataSLADetail: new FunnelWarrantySLADetailModel({}),
  listData: new FunnelWarrantySLADetailEnvelope({}),
  listDataSLA: new FunnelWarrantySLAEnvelope({}),
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
};

const funnelWarrantyReducer: Reducer = baseReducer(initialState, {
  [FunnelWarrantyActions.REQUEST_FUNNEL_WARRANTY_SLAS_FINISHED](
    state: IFunnelWarrantySLAState,
    action: IAction<FunnelWarrantySLAEnvelope>
  ): IFunnelWarrantySLAState {
    return {
      ...state,
      listDataSLA: action.payload!,
      error: action.error!,
    };
  },
  [FunnelWarrantyActions.REQUEST_FUNNEL_WARRANTY_DETAILS_FINISHED](
    state: IFunnelWarrantySLAState,
    action: IAction<FunnelWarrantySLADetailEnvelope>
  ): IFunnelWarrantySLAState {
    return {
      ...state,
      listData: action.payload!,
      error: action.error!,
    };
  },
  [FunnelWarrantyActions.POST_WARRANTY_SUPPORT_FINISHED](state: IFunnelWarrantySLAState, action: IAction<ResultActions>): IFunnelWarrantySLAState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },
  [FunnelWarrantyActions.REQUEST_WARRANTY_SUPPORT_BY_ID_FINISHED](
    state: IFunnelWarrantySLAState,
    action: IAction<FunnelWarrantySupportModel>
  ): IFunnelWarrantySLAState {
    return {
      ...state,
      firstDataSupport: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [FunnelWarrantyActions.REQUEST_WARRANTY_SLA_BY_ID_FINISHED](
    state: IFunnelWarrantySLAState,
    action: IAction<FunnelWarrantySLAModel>
  ): IFunnelWarrantySLAState {
    return {
      ...state,
      firstDataSLA: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [FunnelWarrantyActions.REQUEST_WARRANTY_SLA_DETAIL_BY_ID_FINISHED](
    state: IFunnelWarrantySLAState,
    action: IAction<FunnelWarrantySLADetailModel>
  ): IFunnelWarrantySLAState {
    return {
      ...state,
      firstDataSLADetail: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [FunnelWarrantyActions.REQUEST_WARRANTY_CUSTOMER_LOCAL_FINISHED](
    state: IFunnelWarrantySLAState,
    action: IAction<FunnelWarrantySLADetailEnvelope>
  ): IFunnelWarrantySLAState {
    return {
      ...state,
      listData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [FunnelWarrantyActions.POST_WARRANTY_DETAIL_LOCAL_FINISHED](
    state: IFunnelWarrantySLAState,
    action: IAction<ResultActions>
  ): IFunnelWarrantySLAState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },
  [FunnelWarrantyActions.POST_WARRANTY_SLA_FINISHED](state: IFunnelWarrantySLAState, action: IAction<ResultActions>): IFunnelWarrantySLAState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },
  [FunnelWarrantyActions.REQUEST_EDIT_WARRANTY_SLA_DETAIL_LOCAL_FINISHED](
    state: IFunnelWarrantySLAState,
    action: IAction<ResultActions>
  ): IFunnelWarrantySLAState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [FunnelWarrantyActions.POST_WARRANTY_SLA_DETAIL_FINISHED](state: IFunnelWarrantySLAState, action: IAction<ResultActions>): IFunnelWarrantySLAState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [FunnelWarrantyActions.PUT_WARRANTY_SLA_DETAIL_FINISHED](state: IFunnelWarrantySLAState, action: IAction<ResultActions>): IFunnelWarrantySLAState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [FunnelWarrantyActions.DEL_WARRANTY_SLA_DETAIL_FINISHED](state: IFunnelWarrantySLAState, action: IAction<ResultActions>): IFunnelWarrantySLAState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [FunnelWarrantyActions.REQUEST_WARRANTY_SLA_DETAIL_LOCAL_FINISHED](
    state: IFunnelWarrantySLAState,
    action: IAction<FunnelWarrantySLADetailModel>
  ): IFunnelWarrantySLAState {
    return {
      ...state,
      firstDataSLADetail: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
});

export default funnelWarrantyReducer;
