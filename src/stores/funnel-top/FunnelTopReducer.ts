import * as FunnelTopActions from './FunnelTopActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import FunnelTopEnvelope from './models/FunnelTopEnvelope';
import IFunnelTopState from './models/IFunnelTopState';
import FunnelTopItem from './models/FunnelTopItem';
import FunnelTopSupportDoc from './models/FunnelTopSupportDoc';
import FunnelTopType from './models/FunnelTopType';
import TopServiceModel from './models/TopServiceModel';
import ProductDescModel from './models/ProductDescModel';
import TopServiceOfObjModel from './models/TopServiceOfObjModel';
import ResultActions from 'models/ResultActions';
import FunnelTopHistoryEnvelope from './models/FunnelTopHistoryEnvelope';
import SearchTopNumberModel from './models/SearchTopNumberModel';

export const initialState: IFunnelTopState = {
  listData: new FunnelTopEnvelope({}),
  listDataAll: new FunnelTopEnvelope({}),
  firstData: new TopServiceOfObjModel({}),
  listTopItem: [],
  listSupportingDoc: [],
  listTopType: [],
  setPage: 0,
  dataProductDesc: [],
  searchTopNumber: [],
  funnelTopHistory: [],
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
};

const funnelTopReducer: Reducer = baseReducer(initialState, {
  [FunnelTopActions.REQUEST_FUNNEL_TOP_FINISHED](state: IFunnelTopState, action: IAction<FunnelTopEnvelope>): IFunnelTopState {
    return {
      ...state,
      listData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelTopActions.REQUEST_FUNNEL_TOP_ALL_FINISHED](state: IFunnelTopState, action: IAction<FunnelTopEnvelope>): IFunnelTopState {
    return {
      ...state,
      listDataAll: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelTopActions.REQUEST_FUNNEL_TOP_BY_ID_FINISHED](state: IFunnelTopState, action: IAction<TopServiceOfObjModel>): IFunnelTopState {
    return {
      ...state,
      firstData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelTopActions.REQUEST_POST_FUNNEL_TOP_FINISHED](state: IFunnelTopState, action: IAction<ResultActions>): IFunnelTopState {
    return {
      ...state,
      error: action.error!,
      resultActions: action.payload!,
      refreshPage: true,
    };
  },

  [FunnelTopActions.REQUEST_PUT_FUNNEL_TOP_FINISHED](state: IFunnelTopState, action: IAction<TopServiceModel>): IFunnelTopState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelTopActions.DEL_FUNNEL_TOP_FINISHED](state: IFunnelTopState, action: IAction<TopServiceModel>): IFunnelTopState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelTopActions.REQUEST_FUNNEL_TOP_ITEM_FINISHED](state: IFunnelTopState, action: IAction<FunnelTopItem[]>): IFunnelTopState {
    return {
      ...state,
      listTopItem: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [FunnelTopActions.REQUEST_FUNNEL_TOP_SUPPORT_DOC_FINISHED](state: IFunnelTopState, action: IAction<FunnelTopSupportDoc[]>): IFunnelTopState {
    return {
      ...state,
      listSupportingDoc: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [FunnelTopActions.REQUEST_FUNNEL_TOP_TYPE_FINISHED](state: IFunnelTopState, action: IAction<FunnelTopType[]>): IFunnelTopState {
    return {
      ...state,
      listTopType: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [FunnelTopActions.REQUEST_SET_PAGE_FINISHED](state: IFunnelTopState, action: IAction<any>): IFunnelTopState {
    return {
      ...state,
      setPage: state.setPage === 0 ? 1 : 0,
    };
  },

  [FunnelTopActions.REQUEST_DROPDOWN_PRODUCT_DESC_FINISHED](state: IFunnelTopState, action: IAction<ProductDescModel[]>): IFunnelTopState {
    return {
      ...state,
      dataProductDesc: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelTopActions.SEARCH_TOP_NUMBER_FINISHED](state: IFunnelTopState, action: IAction<SearchTopNumberModel[]>): IFunnelTopState {
    return {
      ...state,
      searchTopNumber: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

[FunnelTopActions.REQUEST_FUNNEL_TOP_HISTORY_FINISHED](state: IFunnelTopState, action: IAction<FunnelTopHistoryEnvelope[]>): IFunnelTopState {
    return {
      ...state,
      funnelTopHistory: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [FunnelTopActions.REQUEST_CLEAR_RESULT_GENERATE_FINISHED](state: IFunnelTopState, action: IAction<any>): IFunnelTopState {
    return {
      ...state,
      error: false,
      refreshPage: false,
    };
  },
});

export default funnelTopReducer;
