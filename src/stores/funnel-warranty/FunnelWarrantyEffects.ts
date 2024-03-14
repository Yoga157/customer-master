import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import FunnelWarrantySLADetailModel from './models/FunnelWarrantySLADetailModel';
import FunnelWarrantySLAModel from './models/FunnelWarrantySLAModel';
import FunnelWarrantySupportModel from './models/FunnelWarrantySupportModel';
import FunnelWarrantySLADetailEnvelope from './models/FunnelWarrantySLADetailEnvelope';
import FunnelWarrantySLAEnvelope from './models/FunnelWarrantySLAEnvelope';
import ResultActions from 'models/ResultActions';
import FunnelWarrantiSLAsModel from './models/FunnelWarrantySLAsModel';

export const requestFunnelWarrantySLAs = async (
  id: number,
  activePage: number,
  pageSize: number
): Promise<FunnelWarrantySLAEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'WarrantySLA/' + id + '?page=' + activePage + '&pageSize=' + pageSize;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<FunnelWarrantySLAEnvelope>(FunnelWarrantySLAEnvelope, endpoint);
};

export const requestFunnelWarrantyDetails = async (
  id: number,
  activePage: number,
  pageSize: number
): Promise<FunnelWarrantySLADetailEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'WarrantySLADetail/' + id + '?page=' + activePage + '&pageSize=' + pageSize;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<FunnelWarrantySLADetailEnvelope>(FunnelWarrantySLADetailEnvelope, endpoint);
};

export const postWarrantySupport = async (data: ResultActions): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'WarrantySupport';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const postWarrantySLA = async (data: FunnelWarrantiSLAsModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'WarrantySLA';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const putSLAHeader = async (data: FunnelWarrantySLAModel): Promise<FunnelWarrantySLAModel | HttpErrorResponseModel> => {
  const controllerName = 'ServiceAreaSLA/UpdateHeader';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<FunnelWarrantySLAModel>(FunnelWarrantySLAModel, endpoint, data);
};

export const putSLACustomer = async (data: FunnelWarrantySLAModel): Promise<FunnelWarrantySLAModel | HttpErrorResponseModel> => {
  const controllerName = 'ServiceAreaSLA/UpdateCustomer';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<FunnelWarrantySLAModel>(FunnelWarrantySLAModel, endpoint, data);
};

export const putSLAVendor = async (data: FunnelWarrantySLAModel): Promise<FunnelWarrantySLAModel | HttpErrorResponseModel> => {
  const controllerName = 'ServiceAreaSLA/UpdateVendor';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<FunnelWarrantySLAModel>(FunnelWarrantySLAModel, endpoint, data);
};

export const putWarrantySLADetail = async (data: FunnelWarrantySLADetailModel): Promise<FunnelWarrantySLADetailModel | HttpErrorResponseModel> => {
  const controllerName = 'WarrantySLADetail';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<FunnelWarrantySLADetailModel>(FunnelWarrantySLADetailModel, endpoint, data);
};

export const delWarrantySLADetail = async (id: number): Promise<FunnelWarrantySLADetailModel | HttpErrorResponseModel> => {
  const controllerName = 'WarrantySLADetail?warrantySLADetailID=' + id;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.delToModel<FunnelWarrantySLADetailModel>(FunnelWarrantySLADetailModel, endpoint);
};

export const postWarrantySLADetail = async (data: FunnelWarrantySLADetailModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'WarrantySLADetail';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestWarrantySupportById = async (funnelGenID: number): Promise<FunnelWarrantySupportModel | HttpErrorResponseModel> => {
  const controllerName = 'WarrantySupport/funnelGenID=' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelWarrantySupportModel>(FunnelWarrantySupportModel, endpoint);
};

export const requestWarrantySLAById = async (slaGenID: number): Promise<FunnelWarrantySLAModel | HttpErrorResponseModel> => {
  const controllerName = 'WarrantySLA/warrantySLAGenID=' + slaGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelWarrantySLAModel>(FunnelWarrantySLAModel, endpoint);
};

export const requestWarrantySLADetailById = async (slaDetailID: number): Promise<FunnelWarrantySLADetailModel | HttpErrorResponseModel> => {
  const controllerName = 'WarrantySLADetail/warrantySLADetailID=' + slaDetailID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelWarrantySLADetailModel>(FunnelWarrantySLADetailModel, endpoint);
};

export const requestWarrantyCustomerLocal = async (): Promise<FunnelWarrantySLADetailEnvelope | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('warrantySLA');
  let listWarrantyCustomer: FunnelWarrantySLADetailModel[] = [];
  let total: number = 0;
  if (jsonString !== null) {
    listWarrantyCustomer = JSON.parse(jsonString);
    total = listWarrantyCustomer.length;
  }
  const result = new FunnelWarrantySLADetailEnvelope({ totalRows: total, rows: listWarrantyCustomer });
  return result;
};

export const postWarrantyDetailLocal = async (data: FunnelWarrantySLADetailModel): Promise<FunnelWarrantySLADetailModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('warrantySLA');
  let listWarranty: FunnelWarrantySLADetailModel[] = [];
  let warrantyID = 0;

  if (jsonString !== null && jsonString !== '[]') {
    listWarranty = JSON.parse(jsonString);
    listWarranty.map((item) => {
      return (warrantyID = item.warrantySLADetailID);
    });
    data.warrantySLADetailID = warrantyID + 1;
  } else {
    data.warrantySLADetailID = 1;
  }

  const warranty = new FunnelWarrantySLADetailModel(data);
  listWarranty.push(warranty);
  localStorage.setItem('warrantySLA', JSON.stringify(listWarranty));
  return warranty;
};

export const editWarrantyDetailLocal = async (
  data: FunnelWarrantySLADetailModel,
  id: any
): Promise<FunnelWarrantySLADetailModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('warrantySLA');
  let listWarranty: FunnelWarrantySLADetailModel[] = [];

  if (jsonString !== null && jsonString !== '[]') {
    listWarranty = JSON.parse(jsonString);
  }

  const warrantySLADetail = new FunnelWarrantySLADetailModel(data);
  warrantySLADetail.warrantySLADetailID = Number(id);

  const newValue = listWarranty.filter((item: any) => {
    return item.warrantySLADetailID !== Number(id);
  });

  newValue.push(warrantySLADetail);

  localStorage.setItem('warrantySLA', JSON.stringify(newValue));
  return warrantySLADetail;
};

export const deleteWarrantyDetailLocal = async (
  data: FunnelWarrantySLADetailModel,
  id: any
): Promise<FunnelWarrantySLADetailModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('warrantySLA');
  let listWarranty: FunnelWarrantySLADetailModel[] = [];
  let idDetail;

  if (jsonString !== null && jsonString !== '[]') {
    listWarranty = JSON.parse(jsonString);
    listWarranty.map((item) => {
      return (idDetail = item.warrantySLADetailID);
    });
    data.warrantySLADetailID = Number(idDetail) + 1;
  } else {
    data.warrantySLADetailID = 1;
  }

  const warrantySLA = new FunnelWarrantySLADetailModel(data);

  const newValue = listWarranty.filter((item: any) => {
    return item.warrantySLADetailID !== id;
  });

  listWarranty.push(warrantySLA);

  localStorage.setItem('warrantySLA', JSON.stringify(newValue));
  return warrantySLA;
};

export const requestSLADetailLocal = async (id: number): Promise<FunnelWarrantySLADetailModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('warrantySLA');
  let listWarranty: FunnelWarrantySLADetailModel[] = [];
  let result = new FunnelWarrantySLADetailModel({});
  let total: number = 0;
  if (jsonString !== null) {
    listWarranty = JSON.parse(jsonString);
    total = listWarranty.length;
  }
  const warrantySLA = listWarranty.find((warrantySLA) => warrantySLA.warrantySLADetailID === id)!;
  if (warrantySLA !== undefined) {
    result = warrantySLA!;
  }
  return result;
};

/**
 * This is only to trigger an error api response so we can use it for an example in the AboutPage
 */
export const requestError = async (): Promise<any | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.generic;
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data;
};
