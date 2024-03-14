import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as EffectUtility from '../../utilities/EffectUtility';
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

export const requestFunnelProductService = async (
  funnelGenId: number,
  page: number,
  pageSize: number | string
): Promise<ProductServiceEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'FunnelItems/' + funnelGenId + '?page=' + page + '&pageSize=' + pageSize;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<ProductServiceEnvelope>(ProductServiceEnvelope, endpoint);
};

export const requestFunnelItemHistory = async (funnelGenId: number): Promise<FunnelItemHistoryEnvelope[] | HttpErrorResponseModel> => {
  const controllerName = 'FunnelItems/History?funnelGenID=' + funnelGenId;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelItemHistoryEnvelope[]>(FunnelItemHistoryEnvelope, endpoint);
};
// export const requestFunnelProductServiceAll = async (
//   funnelGenId: number,
//   page: number,
//   pageSize: number|string
// ): Promise<ProductServiceEnvelope | HttpErrorResponseModel> => {
//   const controllerName = 'FunnelItems/' + funnelGenId + '?page=' + page + '&pageSize=' + pageSize;
//   const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
//   return EffectUtility.getToModel<ProductServiceEnvelope>(ProductServiceEnvelope, endpoint);
// };

export const postFunnelProduct = async (data: ProductServiceModel): Promise<ProductServiceModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelProduct';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ProductServiceModel>(ProductServiceModel, endpoint, data);
};

export const delFunnelProduct = async (funnelItemsID: number, userLogin: number): Promise<ProductServiceModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelProduct?funnelItemsID=${funnelItemsID}&userLogin=${userLogin}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.delToModel<ProductServiceModel>(ProductServiceModel, endpoint);
};

export const putFunnelProduct = async (data: ProductServiceModel): Promise<ProductServiceModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelProduct';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ProductServiceModel>(ProductServiceModel, endpoint, data);
};

export const requestFunnelProduct = async (funnelItemsID: number): Promise<ProductServiceModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelProduct/' + funnelItemsID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<ProductServiceModel>(ProductServiceModel, endpoint);
};

export const requestFunnelProductBySales = async (email: string): Promise<FunnelBrandModel[] | HttpErrorResponseModel> => {
  const controllerName = 'FunnelProduct/email=' + email;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelBrandModel[]>(FunnelBrandModel, endpoint);
};

export const postFunnelService = async (data: ProductServiceModel): Promise<ProductServiceModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelService';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ProductServiceModel>(ProductServiceModel, endpoint, data);
};

export const putFunnelService = async (data: ProductServiceModel): Promise<ProductServiceModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelService';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ProductServiceModel>(ProductServiceModel, endpoint, data);
};

export const delFunnelService = async (funnelItemsID: number, userLogin: number): Promise<ProductServiceModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelService?funnelItemsID=${funnelItemsID}&userLogin=${userLogin}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.delToModel<ProductServiceModel>(ProductServiceModel, endpoint);
};

export const requestFunnelService = async (funnelItemsID: number): Promise<ProductServiceModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelService/' + funnelItemsID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<ProductServiceModel>(ProductServiceModel, endpoint);
};

export const requestFunnelProductServiceLocal = async (): Promise<ProductServiceEnvelope | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('productService');
  let listProductService: ProductServiceModel[] = [];
  let total: number = 0;
  if (jsonString !== null) {
    listProductService = JSON.parse(jsonString);
    total = listProductService.length;
  }
  const result = new ProductServiceEnvelope({ totalRows: total, rows: listProductService });
  return result;
};

export const postFunnelProductServiceLocal = async (data: ProductServiceModel): Promise<ProductServiceModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('productService');

  let listProductService: ProductServiceModel[] = [];
  let idFunnel = 0;

  if (jsonString !== null && jsonString !== '[]') {
    listProductService = JSON.parse(jsonString);
    listProductService.map((item) => {
      if (idFunnel < item.funnelItemsID) {
        return (idFunnel = item.funnelItemsID);
      } else {
        return (idFunnel = idFunnel);
      }
    });
    data.funnelItemsID = Number(idFunnel) + 1;
  } else {
    data.funnelItemsID = 1;
  }

  const productService = new ProductServiceModel(data);
  listProductService.push(productService);
  localStorage.setItem('productService', JSON.stringify(listProductService));
  return productService;
};

export const deleteFunnelProductServiceLocal = async (
  data: ProductServiceModel,
  id: any,
  isSalesAnalis?: boolean
): Promise<ProductServiceModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('productService');
  let listProductService: ProductServiceModel[] = [];
  let idFunnel;

  if (jsonString !== null && jsonString !== '[]') {
    listProductService = JSON.parse(jsonString);
    listProductService.map((item) => {
      return (idFunnel = item.funnelItemsID);
    });
    if (isSalesAnalis) {
      data.isDelete = 1;
      data.isUpdate = 0;
      data.isAdd = 0;
    } else {
      data.funnelItemsID = Number(idFunnel) + 1;
    }
  } else {
    if (isSalesAnalis) {
      data.isDelete = 1;
      data.isUpdate = 0;
      data.isAdd = 0;
    } else {
      data.funnelItemsID = 1;
    }
  }

  const productService = new ProductServiceModel(data);

  const newValue = listProductService.filter((item: any) => {
    return item.funnelItemsID !== id;
  });
  listProductService.push(productService);

  if (isSalesAnalis) {
    localStorage.setItem('productService', JSON.stringify([...newValue, productService]));
  } else {
    localStorage.setItem('productService', JSON.stringify(newValue));
  }
  return productService;
};

export const editFunnelProductServiceLocal = async (data: ProductServiceModel, id: any): Promise<ProductServiceModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('productService');
  let listProductService: ProductServiceModel[] = [];

  if (jsonString !== null && jsonString !== '[]') {
    listProductService = JSON.parse(jsonString);
  }

  const productService = new ProductServiceModel(data);
  productService.funnelItemsID = Number(id);

  const newValue = listProductService.filter((item: any) => {
    return item.funnelItemsID !== Number(id);
  });

  newValue.push(productService);

  localStorage.setItem('productService', JSON.stringify(newValue));
  return productService;
};

export const requestProductServiceLocal = async (id: number): Promise<ProductServiceModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('productService');
  let listProductService: ProductServiceModel[] = [];
  let result = new ProductServiceModel({});
  let total: number = 0;
  if (jsonString !== null) {
    listProductService = JSON.parse(jsonString);
    total = listProductService.length;
  }
  const productService = listProductService.find((productService) => productService.funnelItemsID === id)!;
  if (productService !== undefined) {
    result = productService!;
  }

  return result;
};

export const requestExistingInternalService = async (funnelGenID: number): Promise<InternalServiceExistingModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelService/CheckInternalService=${funnelGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<InternalServiceExistingModel>(InternalServiceExistingModel, endpoint);
};

export const requestDropdownCloudService = async (itemID: number): Promise<ItemSubModel[] | HttpErrorResponseModel> => {
  const controllerName = `Udc/DropdownCloudService?ItemID=${itemID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<ItemSubModel[]>(ItemSubModel, endpoint);
};

export const requestDropdownSupplier = async (text: string): Promise<ItemSubModel[] | HttpErrorResponseModel> => {
  const controllerName = `Customer/DropdownSupplierName?text=${text}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<ItemSubModel[]>(ItemSubModel, endpoint);
};

export const requestCheckService = async (text: string): Promise<ItemSubModel[] | HttpErrorResponseModel> => {
  const controllerName = `Customer/DropdownSupplierName?text=${text}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<ItemSubModel[]>(ItemSubModel, endpoint);
};

export const requestDiscountService = async (data: FunnelServiceDiscountModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `FunnelService/RequestDiscount`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const clearResult = async (): Promise<any> => {
  const clear = new ResultActions({});
  return clear;
};

export const FunnelGetDetailVoucherAmount = async (VoucherNo: string, salesId: number, currency: string, createDate: string, customerGenID: number, billingPeriod: string): Promise<FunnelVoucherAmountPICNameModel | HttpErrorResponseModel> => {
  const controllerName = `Funnel/GetDetailVoucherAmountByPICName?voucherNo=${VoucherNo}&salesId=${salesId}&currency=${currency}&createDate=${createDate}&customerGenID=${customerGenID}&billingPeriod=${billingPeriod}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelVoucherAmountPICNameModel>(FunnelVoucherAmountPICNameModel, endpoint);
};

export const requestProcessorType = async (): Promise<ProcessorTypeModel | HttpErrorResponseModel> => {
  const controllerName = 'Udc/GetByEntryKey/ProcessorType';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ProcessorTypeModel>(ProcessorTypeModel, endpoint);
};