import IServiceCatalogState from './models/IServiceCatalogState';
import * as ServiceCatalogActions from './ServiceCatalogActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import ServiceCatalogEnvelope from './models/ServiceCatalogEnvelope';
import ServiceCatalogModel from './models/ServiceCatalogModel';
import { ServiceCatalogBrandModel } from './models/child-edit';

export const initialState: IServiceCatalogState = {
  data: new ServiceCatalogEnvelope({}),
  firstData: new ServiceCatalogModel({}),
  serviceCatalogBrandModel: [],
  error: false,
  refreshPage: false,
  isActive: true,
  meta: '' as any,
};

const serviceCatalogReducer: Reducer = baseReducer(initialState, {
  [ServiceCatalogActions.REQUEST_SERVICE_CATALOG_FINISHED](state: IServiceCatalogState, action: IAction<ServiceCatalogModel>): IServiceCatalogState {
    return {
      ...state,
      firstData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ServiceCatalogActions.REQUEST_SERVICE_CATALOGS_ALL_FINISHED](
    state: IServiceCatalogState,
    action: IAction<ServiceCatalogEnvelope>
  ): IServiceCatalogState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ServiceCatalogActions.RREQUEST_SERVICE_CATALOGS_BY_FUNNEL_FINISHED](
    state: IServiceCatalogState,
    action: IAction<ServiceCatalogEnvelope>
  ): IServiceCatalogState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ServiceCatalogActions.REQUEST_SERVICE_CATALOG_BRAND_MODEL_FINISHED](
    state: IServiceCatalogState,
    action: IAction<ServiceCatalogBrandModel[]>
  ): IServiceCatalogState {
    return {
      ...state,
      serviceCatalogBrandModel: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ServiceCatalogActions.REQUEST_SERVICE_CATALOGS_FINISHED](
    state: IServiceCatalogState,
    action: IAction<ServiceCatalogEnvelope>
  ): IServiceCatalogState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ServiceCatalogActions.POST_SERVICE_CATALOG_FINISHED](state: IServiceCatalogState, action: IAction<ServiceCatalogModel>): IServiceCatalogState {
    return {
      ...state,
      error: action.error!,
      firstData: action.payload!,
      meta: action.meta,
      refreshPage: action.error ? false : true,
    };
  },

  [ServiceCatalogActions.PUT_SERVICE_CATALOG_FINISHED](state: IServiceCatalogState, action: IAction<ServiceCatalogModel>): IServiceCatalogState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [ServiceCatalogActions.REQUEST_SERVICE_CATALOG_SEARCH_FINISHED](
    state: IServiceCatalogState,
    action: IAction<ServiceCatalogEnvelope>
  ): IServiceCatalogState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ServiceCatalogActions.REQUEST_DELETE_SERVICE_CATALOG_FINISHED](
    state: IServiceCatalogState,
    action: IAction<ServiceCatalogModel>
  ): IServiceCatalogState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  
  [ServiceCatalogActions.FLAG_AKTIVE](state: IServiceCatalogState, action: IAction<boolean>): IServiceCatalogState {
    return {
      ...state,
      isActive: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
});

export default serviceCatalogReducer;
