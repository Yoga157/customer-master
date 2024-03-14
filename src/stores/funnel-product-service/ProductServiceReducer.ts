import * as ProductServiceActions from './ProductServiceActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import ProductServiceModel from './models/ProductServiceModel';
import ProductServiceEnvelope from './models/ProductServiceEnvelope';
import IProductServiceState from './models/IProductServiceState';
import FunnelBrandModel from './models/FunnelBrandModel';
import InternalServiceExistingModel from './models/InternalServiceExistingModel';
import ItemSubModel from './models/ItemSubModel';
import ResultActions from 'models/ResultActions';
import FunnelItemHistoryEnvelope from './models/FunnelItemHistoryEnvelope';
import FunnelVoucherAmountPICNameModel from './models/FunnelVoucherAmountPICNameModel';
import ProcessorTypeModel from './models/ProcessorTypeModel';

export const initialState: IProductServiceState = {
  listData: new ProductServiceEnvelope({}),
  listDataAll: new ProductServiceEnvelope({}),
  firstData: new ProductServiceModel({}),
  listBrand: [],
  error: false,
  refreshPage: false,
  internalService: new InternalServiceExistingModel({}),
  listSubItem: [],
  listSupplier: [],
  resultActions: new ResultActions({}),
  funnelItemHistory: [],
  VoucherAmount: new FunnelVoucherAmountPICNameModel({}),
  listProcessorType: [],
};

const funnelReducer: Reducer = baseReducer(initialState, {
  [ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_FINISHED](
    state: IProductServiceState,
    action: IAction<ProductServiceEnvelope>
  ): IProductServiceState {
    return {
      ...state,
      listData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ProductServiceActions.REQUEST_FUNNEL_ITEM_HISTORY_FINISHED](
    state: IProductServiceState,
    action: IAction<FunnelItemHistoryEnvelope[]>
  ): IProductServiceState {
    return {
      ...state,
      funnelItemHistory: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_ALL_FINISHED](
    state: IProductServiceState,
    action: IAction<ProductServiceEnvelope>
  ): IProductServiceState {
    return {
      ...state,
      listDataAll: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_LOCAL_FINISHED](
    state: IProductServiceState,
    action: IAction<ProductServiceEnvelope>
  ): IProductServiceState {
    return {
      ...state,
      listData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ProductServiceActions.REQUEST_FUNNEL_PRODUCT_FINISHED](state: IProductServiceState, action: IAction<ProductServiceModel>): IProductServiceState {
    return {
      ...state,
      firstData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SALES_FINISHED](
    state: IProductServiceState,
    action: IAction<FunnelBrandModel[]>
  ): IProductServiceState {
    return {
      ...state,
      listBrand: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ProductServiceActions.REQUEST_POST_FUNNEL_PRODUCT_FINISHED](
    state: IProductServiceState,
    action: IAction<ProductServiceModel>
  ): IProductServiceState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [ProductServiceActions.REQUEST_PUT_FUNNEL_PRODUCT_FINISHED](
    state: IProductServiceState,
    action: IAction<ProductServiceModel>
  ): IProductServiceState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [ProductServiceActions.DEL_FUNNEL_PRODUCT_FINISHED](state: IProductServiceState, action: IAction<ProductServiceModel>): IProductServiceState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [ProductServiceActions.DEL_FUNNEL_SERVICE_FINISHED](state: IProductServiceState, action: IAction<ProductServiceModel>): IProductServiceState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [ProductServiceActions.REQUEST_FUNNEL_SERVICE_FINISHED](state: IProductServiceState, action: IAction<ProductServiceModel>): IProductServiceState {
    return {
      ...state,
      firstData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ProductServiceActions.REQUEST_POST_FUNNEL_SERVICE_FINISHED](
    state: IProductServiceState,
    action: IAction<ProductServiceModel>
  ): IProductServiceState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [ProductServiceActions.REQUEST_PUT_FUNNEL_SERVICE_FINISHED](
    state: IProductServiceState,
    action: IAction<ProductServiceModel>
  ): IProductServiceState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [ProductServiceActions.REQUEST_POST_FUNNEL_PRODUCT_SERVICE_LOCAL_FINISHED](
    state: IProductServiceState,
    action: IAction<ProductServiceModel>
  ): IProductServiceState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [ProductServiceActions.REQUEST_DELETE_FUNNEL_PRODUCT_SEVICE_LOCAL_FINISHED](
    state: IProductServiceState,
    action: IAction<ProductServiceModel>
  ): IProductServiceState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [ProductServiceActions.REQUEST_EDIT_FUNNEL_PRODUCT_SEVICE_LOCAL_FINISHED](
    state: IProductServiceState,
    action: IAction<ProductServiceModel>
  ): IProductServiceState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [ProductServiceActions.REQUEST_PRODUCT_SERVICE_LOCAL_FINISHED](
    state: IProductServiceState,
    action: IAction<ProductServiceModel>
  ): IProductServiceState {
    return {
      ...state,
      firstData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ProductServiceActions.REQUEST_INTERNAL_SERVICE_FUNNEL_FINISHED](
    state: IProductServiceState,
    action: IAction<InternalServiceExistingModel>
  ): IProductServiceState {
    return {
      ...state,
      internalService: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ProductServiceActions.REQUEST_DROPDOWN_CLOUD_FINISHED](state: IProductServiceState, action: IAction<ItemSubModel[]>): any {
    return {
      ...state,
      listSubItem: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ProductServiceActions.REQUEST_DROPDOWN_SUPPLIER_FINISHED](state: IProductServiceState, action: IAction<ItemSubModel[]>): any {
    return {
      ...state,
      listSupplier: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ProductServiceActions.REQUEST_DISCOUNT_SERVICE_FINISHED](state: IProductServiceState, action: IAction<any>): any {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ProductServiceActions.CLEAR_RESULT_PRODUCTSERVICE_FINISHED](state: any, action: IAction<any>): any {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ProductServiceActions.REQUEST_VOUCHER_AMOUNT_BY_PIC_NAME_FINISHED](state: IProductServiceState, action: IAction<FunnelVoucherAmountPICNameModel>): any {
    // console.log('reducer',action)
    return {
      ...state,
      VoucherAmount: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [ProductServiceActions.REQUEST_PROCESSOR_TYPE_FINISHED](state: IProductServiceState, action: IAction<ProcessorTypeModel[]>): IProductServiceState {
    return {
      ...state,
      listProcessorType: action.payload!,
    };
  },
});

export default funnelReducer;
