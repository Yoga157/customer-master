import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import { HistoryModel, InsertModel } from './models/CustomerTransferModel';
import CustomerTransferEnvelope from './models/CustomerTransferEnvelope';

export const requestCustomerTransfer = async (
  fromSales: number,
  activePage: number,
  pageSize: number,
  role: string
): Promise<CustomerTransferEnvelope | HttpErrorResponseModel> => {
  const controllerName = `Funnel/salesId=` + fromSales + '?role=' + role + '&page=' + activePage + '&pageSize=' + pageSize;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CustomerTransferEnvelope>(CustomerTransferEnvelope, endpoint);
};
export const requestHistory = async (id: number): Promise<HistoryModel | HttpErrorResponseModel> => {
  const controllerName = `ProjectTransfer/${id}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<HistoryModel>(HistoryModel, endpoint);
};

export const postCustomerTransfer = async (data: any): Promise<InsertModel | HttpErrorResponseModel> => {
  const controllerName = 'ProjectTransfer';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<InsertModel>(InsertModel, endpoint, data);
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
