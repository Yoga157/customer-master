import environment from 'environment';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as HttpUtility from 'utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from 'utilities/EffectUtility';
import FunnelStatusModel from './models/FunnelStatusModel';
import FunnelStatusUdcModel from './models/FunnelStatusUdcModel';

export const requestFunnelStatus = async (type: string): Promise<FunnelStatusModel[] | HttpErrorResponseModel> => {
  const controllerName = `FunnelStatus/type=${type}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<FunnelStatusModel[]>(FunnelStatusModel, endpoint);
};

export const requestFunnelStatusById = async (id: number): Promise<FunnelStatusUdcModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelStatus/${id}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<FunnelStatusUdcModel>(FunnelStatusUdcModel, endpoint);
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
