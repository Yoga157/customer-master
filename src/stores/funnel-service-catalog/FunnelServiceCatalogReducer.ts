import * as FunnelServiceCatalogActions from './FunnelServiceCatalogActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import FunnelServiceCatalogEnvelope from './models/FunnelServiceCatalogEnvelope';
import FunnelServiceCatalogModel from './models/FunnelServiceCatalogModel';
import IFunnelServiceCatalogState from './models/IFunnelServiceCatalogState';
import DiscountServiceModel from './models/DiscountServiceModel';

export const initialState: IFunnelServiceCatalogState = {
  listData: new FunnelServiceCatalogEnvelope({}),
  firstData: new FunnelServiceCatalogModel({}),
  error: false,
  refreshPage: false,
};

const funnelServiceCatalogReducer: Reducer = baseReducer(initialState, {
  [FunnelServiceCatalogActions.REQUEST_FUNNEL_SERVICE_CATALOG_FINISHED](
    state: IFunnelServiceCatalogState,
    action: IAction<FunnelServiceCatalogEnvelope>
  ): IFunnelServiceCatalogState {
    return {
      ...state,
      listData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelServiceCatalogActions.REQUEST_POST_FUNNEL_SERVICE_CATALOG_FINISHED](
    state: IFunnelServiceCatalogState,
    action: IAction<FunnelServiceCatalogModel>
  ): IFunnelServiceCatalogState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelServiceCatalogActions.REQUEST_DEL_FUNNEL_SERVICE_CATALOG_FINISHED](
    state: IFunnelServiceCatalogState,
    action: IAction<FunnelServiceCatalogModel>
  ): IFunnelServiceCatalogState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelServiceCatalogActions.REQUEST_POST_DISCOUNT_SERVICE_FINISHED](
    state: IFunnelServiceCatalogState,
    action: IAction<DiscountServiceModel>
  ): IFunnelServiceCatalogState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelServiceCatalogActions.REQUEST_FUNNEL_SERVICE_CATALOG_FIRST_FINISHED](
    state: IFunnelServiceCatalogState,
    action: IAction<FunnelServiceCatalogModel>
  ): IFunnelServiceCatalogState {
    return {
      ...state,
      firstData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelServiceCatalogActions.REQUEST_PUT_FUNNEL_SERVICE_CATALOG_FINISHED](
    state: IFunnelServiceCatalogState,
    action: IAction<FunnelServiceCatalogModel>
  ): IFunnelServiceCatalogState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
});

export default funnelServiceCatalogReducer;
