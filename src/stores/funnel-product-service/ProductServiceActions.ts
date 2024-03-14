import * as ProductServiceEffects from './ProductServiceEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import ProductServiceModel from './models/ProductServiceModel';
import ProductServiceEnvelope from './models/ProductServiceEnvelope';
import FunnelBrandModel from './models/FunnelBrandModel';
import InternalServiceExistingModel from './models/InternalServiceExistingModel';
import ItemSubModel from './models/ItemSubModel';
import FunnelServiceDiscountModel from './models/FunnelServiceDiscountModel';
import ResultActions from 'models/ResultActions';
import FunnelItemHistoryEnvelope from './models/FunnelItemHistoryEnvelope';
import FunnelVoucherAmountPICNameModel from './models/FunnelVoucherAmountPICNameModel';
import ProcessorTypeModel from './models/ProcessorTypeModel';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | boolean
  | ProductServiceModel
  | ProductServiceEnvelope
  | FunnelBrandModel[]
  | InternalServiceExistingModel
  | ItemSubModel[]
  | FunnelServiceDiscountModel
  | ResultActions
  | FunnelItemHistoryEnvelope[]
  | FunnelVoucherAmountPICNameModel
  | ProcessorTypeModel;

export const REQUEST_FUNNEL_PRODUCT_SERVICE: string = 'FunnelProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE';
export const REQUEST_FUNNEL_PRODUCT_SERVICE_FINISHED: string = 'FunnelProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_FINISHED';

export const requestFunnelProductService = (funnelGenID: number, page: number, pageSize: number | string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductServiceEnvelope>(
      dispatch,
      REQUEST_FUNNEL_PRODUCT_SERVICE,
      ProductServiceEffects.requestFunnelProductService,
      funnelGenID,
      page,
      pageSize
    );
  };
};

export const REQUEST_FUNNEL_ITEM_HISTORY: string = 'FunnelProductServiceActions.REQUEST_FUNNEL_ITEM_HISTORY';
export const REQUEST_FUNNEL_ITEM_HISTORY_FINISHED: string = 'FunnelProductServiceActions.REQUEST_FUNNEL_ITEM_HISTORY_FINISHED';

export const requestFunnelItemHistory = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelItemHistoryEnvelope[]>(
      dispatch,
      REQUEST_FUNNEL_ITEM_HISTORY,
      ProductServiceEffects.requestFunnelItemHistory,
      funnelGenID
    );
  };
};

export const REQUEST_FUNNEL_PRODUCT_SERVICE_ALL: string = 'FunnelProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_ALL';
export const REQUEST_FUNNEL_PRODUCT_SERVICE_ALL_FINISHED: string = 'FunnelProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_ALL_FINISHED';

export const requestFunnelProductServiceAll = (funnelGenID: number, page: number, pageSize: number | string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductServiceEnvelope>(
      dispatch,
      REQUEST_FUNNEL_PRODUCT_SERVICE_ALL,
      ProductServiceEffects.requestFunnelProductService,
      funnelGenID,
      page,
      pageSize
    );
  };
};

// API Funnel Product

export const REQUEST_POST_FUNNEL_PRODUCT: string = 'FunnelProductServiceActions.REQUEST_POST_FUNNEL_PRODUCT';
export const REQUEST_POST_FUNNEL_PRODUCT_FINISHED: string = 'FunnelProductServiceActions.REQUEST_POST_FUNNEL_PRODUCT_FINISHED';

export const postFunnelProduct = (data: ProductServiceModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductServiceModel>(dispatch, REQUEST_POST_FUNNEL_PRODUCT, ProductServiceEffects.postFunnelProduct, data);
  };
};

export const REQUEST_PUT_FUNNEL_PRODUCT: string = 'FunnelProductServiceActions.REQUEST_PUT_FUNNEL_PRODUCT';
export const REQUEST_PUT_FUNNEL_PRODUCT_FINISHED: string = 'FunnelProductServiceActions.REQUEST_PUT_FUNNEL_PRODUCT_FINISHED';

export const putFunnelProduct = (data: ProductServiceModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductServiceModel>(dispatch, REQUEST_PUT_FUNNEL_PRODUCT, ProductServiceEffects.putFunnelProduct, data);
  };
};

export const REQUEST_FUNNEL_PRODUCT: string = 'FunnelProductServiceActions.REQUEST_FUNNEL_PRODUCT';
export const REQUEST_FUNNEL_PRODUCT_FINISHED: string = 'FunnelProductServiceActions.REQUEST_FUNNEL_PRODUCT_FINISHED';

export const requestFunnelProduct = (funnelItemsGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductServiceModel>(
      dispatch,
      REQUEST_FUNNEL_PRODUCT,
      ProductServiceEffects.requestFunnelProduct,
      funnelItemsGenID
    );
  };
};

export const DEL_FUNNEL_PRODUCT: string = 'FunnelProductServiceActions.REQUEST_DEL_FUNNEL_PRODUCT';
export const DEL_FUNNEL_PRODUCT_FINISHED = 'FunnelProductServiceActions.REQUEST_DEL_FUNNEL_PRODUCT_FINISHED';
export const delFunnelProduct = (funnelItemsID: number, userLogin: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductServiceModel>(
      dispatch,
      DEL_FUNNEL_PRODUCT,
      ProductServiceEffects.delFunnelProduct,
      funnelItemsID,
      userLogin
    );
  };
};

export const REQUEST_FUNNEL_PRODUCT_SALES: string = 'FunnelProductServiceActions.REQUEST_FUNNEL_PRODUCT_SALES';
export const REQUEST_FUNNEL_PRODUCT_SALES_FINISHED: string = 'FunnelProductServiceActions.REQUEST_FUNNEL_PRODUCT_SALES_FINISHED';

export const requestFunnelProductBySales = (email: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelBrandModel[]>(
      dispatch,
      REQUEST_FUNNEL_PRODUCT_SALES,
      ProductServiceEffects.requestFunnelProductBySales,
      email
    );
  };
};

// API Funnel Service

export const REQUEST_POST_FUNNEL_SERVICE: string = 'FunnelProductServiceActions.REQUEST_POST_FUNNEL_SERVICE';
export const REQUEST_POST_FUNNEL_SERVICE_FINISHED: string = 'FunnelProductServiceActions.REQUEST_POST_FUNNEL_SERVICE_FINISHED';

export const postFunnelService = (data: ProductServiceModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductServiceModel>(dispatch, REQUEST_POST_FUNNEL_SERVICE, ProductServiceEffects.postFunnelService, data);
  };
};

export const REQUEST_PUT_FUNNEL_SERVICE: string = 'FunnelProductServiceActions.REQUEST_PUT_FUNNEL_SERVICE';
export const REQUEST_PUT_FUNNEL_SERVICE_FINISHED: string = 'FunnelProductServiceActions.REQUEST_PUT_FUNNEL_SERVICE_FINISHED';

export const putFunnelService = (data: ProductServiceModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductServiceModel>(dispatch, REQUEST_POST_FUNNEL_SERVICE, ProductServiceEffects.putFunnelService, data);
  };
};

export const DEL_FUNNEL_SERVICE: string = 'FunnelProductServiceActions.REQUEST_DEL_FUNNEL_SERVICE';
export const DEL_FUNNEL_SERVICE_FINISHED = 'FunnelProductServiceActions.REQUEST_DEL_FUNNEL_SERVICE_FINISHED';
export const delFunnelService = (funnelItemsID: number, userLogin: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductServiceModel>(
      dispatch,
      DEL_FUNNEL_PRODUCT,
      ProductServiceEffects.delFunnelService,
      funnelItemsID,
      userLogin
    );
  };
};

export const REQUEST_FUNNEL_SERVICE: string = 'FunnelProductServiceActions.REQUEST_FUNNEL_SERVICE';
export const REQUEST_FUNNEL_SERVICE_FINISHED: string = 'FunnelProductServiceActions.REQUEST_FUNNEL_SERVICE_FINISHED';

export const requestFunnelService = (funnelItemsGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductServiceModel>(
      dispatch,
      REQUEST_FUNNEL_SERVICE,
      ProductServiceEffects.requestFunnelService,
      funnelItemsGenID
    );
  };
};

export const REQUEST_INTERNAL_SERVICE_FUNNEL: string = 'FunnelProductServiceActions.REQUEST_INTERNAL_SERVICE_FUNNEL';
export const REQUEST_INTERNAL_SERVICE_FUNNEL_FINISHED: string = 'FunnelProductServiceActions.REQUEST_INTERNAL_SERVICE_FUNNEL_FINISHED';
export const requestExistingInternalService = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<InternalServiceExistingModel>(
      dispatch,
      REQUEST_INTERNAL_SERVICE_FUNNEL,
      ProductServiceEffects.requestExistingInternalService,
      funnelGenID
    );
  };
};

export const REQUEST_FUNNEL_PRODUCT_SERVICE_LOCAL: string = 'FunnelProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_LOCAL';
export const REQUEST_FUNNEL_PRODUCT_SERVICE_LOCAL_FINISHED: string = 'FunnelProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_LOCAL_FINISHED';

export const requestFunnelProductServiceLocal = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductServiceEnvelope>(
      dispatch,
      REQUEST_FUNNEL_PRODUCT_SERVICE_LOCAL,
      ProductServiceEffects.requestFunnelProductServiceLocal
    );
  };
};

export const REQUEST_POST_FUNNEL_PRODUCT_SERVICE_LOCAL: string = 'FunnelProductServiceActions.REQUEST_POST_FUNNEL_PRODUCT_SEVICE_LOCAL';
export const REQUEST_POST_FUNNEL_PRODUCT_SERVICE_LOCAL_FINISHED: string =
  'FunnelProductServiceActions.REQUEST_POST_FUNNEL_PRODUCT_SEVICE_LOCAL_FINISHED';

export const postFunnelProductServiceLocal = (data: ProductServiceModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductServiceModel>(
      dispatch,
      REQUEST_POST_FUNNEL_PRODUCT_SERVICE_LOCAL,
      ProductServiceEffects.postFunnelProductServiceLocal,
      data
    );
  };
};

export const REQUEST_DELETE_FUNNEL_PRODUCT_SEVICE_LOCAL: string = 'FunnelProductServiceActions.REQUEST_DELETE_FUNNEL_PRODUCT_SEVICE_LOCAL';
export const REQUEST_DELETE_FUNNEL_PRODUCT_SEVICE_LOCAL_FINISHED: string =
  'FunnelProductServiceActions.REQUEST_DELETE_FUNNEL_PRODUCT_SEVICE_LOCAL_FINISHED';
export const deleteFunnelProductServiceLocal = (data: ProductServiceModel, id: any, isSalesAnalis?: boolean): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductServiceModel>(
      dispatch,
      REQUEST_DELETE_FUNNEL_PRODUCT_SEVICE_LOCAL,
      ProductServiceEffects.deleteFunnelProductServiceLocal,
      data,
      id,
      isSalesAnalis
    );
  };
};

export const REQUEST_EDIT_FUNNEL_PRODUCT_SEVICE_LOCAL: string = 'FunnelProductServiceActions.REQUEST_EDIT_FUNNEL_PRODUCT_SEVICE_LOCAL';
export const REQUEST_EDIT_FUNNEL_PRODUCT_SEVICE_LOCAL_FINISHED: string =
  'FunnelProductServiceActions.REQUEST_EDIT_FUNNEL_PRODUCT_SEVICE_LOCAL_FINISHED';
export const editFunnelProductServiceLocal = (data: ProductServiceModel, id: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductServiceModel>(
      dispatch,
      REQUEST_EDIT_FUNNEL_PRODUCT_SEVICE_LOCAL,
      ProductServiceEffects.editFunnelProductServiceLocal,
      data,
      id
    );
  };
};

export const REQUEST_PRODUCT_SERVICE_LOCAL: string = 'FunnelProductServiceActions.REQUEST_PRODUCT_SERVICE_LOCAL';
export const REQUEST_PRODUCT_SERVICE_LOCAL_FINISHED: string = 'FunnelProductServiceActions.REQUEST_PRODUCT_SERVICE_LOCAL_FINISHED';

export const requestProductServiceLocal = (id: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductServiceModel>(
      dispatch,
      REQUEST_PRODUCT_SERVICE_LOCAL,
      ProductServiceEffects.requestProductServiceLocal,
      id
    );
  };
};

export const REQUEST_DROPDOWN_CLOUD: string = 'FunnelProductServiceActions.REQUEST_DROPDOWN_CLOUD';
export const REQUEST_DROPDOWN_CLOUD_FINISHED: string = 'FunnelProductServiceActions.REQUEST_DROPDOWN_CLOUD_FINISHED';

export const requestDropdownCloudService = (itemID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ItemSubModel[]>(
      dispatch,
      REQUEST_DROPDOWN_CLOUD,
      ProductServiceEffects.requestDropdownCloudService,
      itemID
    );
  };
};

export const REQUEST_DROPDOWN_SUPPLIER: string = 'FunnelProductServiceActions.REQUEST_DROPDOWN_SUPPLIER';
export const REQUEST_DROPDOWN_SUPPLIER_FINISHED: string = 'FunnelProductServiceActions.REQUEST_DROPDOWN_SUPPLIER_FINISHED';

export const requestDropdownSupplier = (text: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ItemSubModel[]>(dispatch, REQUEST_DROPDOWN_SUPPLIER, ProductServiceEffects.requestDropdownSupplier, text);
  };
};

export const REQUEST_CHECK_SERVICE: string = 'FunnelProductServiceActions.REQUEST_CHECK_SERVICE';
export const REQUEST_CHECK_SERVICE_FINISHED: string = 'FunnelProductServiceActions.REQUEST_CHECK_SERVICE_FINISHED';

export const requestCheckService = (itemID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ItemSubModel[]>(dispatch, REQUEST_CHECK_SERVICE, ProductServiceEffects.requestCheckService, itemID);
  };
};

export const REQUEST_DISCOUNT_SERVICE: string = 'FunnelProductServiceActions.REQUEST_DISCOUNT_SERVICE';
export const REQUEST_DISCOUNT_SERVICE_FINISHED: string = 'FunnelProductServiceActions.REQUEST_DISCOUNT_SERVICE';

export const requestDiscountService = (data: FunnelServiceDiscountModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_DISCOUNT_SERVICE, ProductServiceEffects.requestDiscountService, data);
  };
};

export const CLEAR_RESULT_PRODUCTSERVICE: string = 'FunnelActions.CLEAR_RESULT_PRODUCTSERVICE';
export const CLEAR_RESULT_PRODUCTSERVICE_FINISHED: string = 'FunnelActions.CLEAR_RESULT_PRODUCTSERVICE';

export const clearResult = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, CLEAR_RESULT_PRODUCTSERVICE, ProductServiceEffects.clearResult);
  };
};

export const REQUEST_VOUCHER_AMOUNT_BY_PIC_NAME: string = 'FunnelActions.REQUEST_VOUCHER_AMOUNT_BY_PIC_NAME';
export const REQUEST_VOUCHER_AMOUNT_BY_PIC_NAME_FINISHED: string = 'FunnelActions.REQUEST_VOUCHER_AMOUNT_BY_PIC_NAME_FINISHED';

export const FunnelGetDetailVoucherAmount = (VoucherNo: string, salesId: number, currency: string, createDate: string, customerGenID: number, billingPeriod: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelVoucherAmountPICNameModel>(
      dispatch,
      REQUEST_VOUCHER_AMOUNT_BY_PIC_NAME,
      ProductServiceEffects.FunnelGetDetailVoucherAmount,
      VoucherNo,
      salesId,
      currency,
      createDate,
      customerGenID,
      billingPeriod
    );
  };
};

export const REQUEST_PROCESSOR_TYPE: string = 'FunnelProductServiceActions.REQUEST_PROCESSOR_TYPE';
export const REQUEST_PROCESSOR_TYPE_FINISHED: string = 'FunnelProductServiceActions.REQUEST_PROCESSOR_TYPE_FINISHED';

export const requestProcessorType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProcessorTypeModel>(dispatch, REQUEST_PROCESSOR_TYPE, ProductServiceEffects.requestProcessorType);
  };
};