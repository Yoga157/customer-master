import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import PMOSupportModel from './models/PMOSupportModel';

export const requestPMO = async (salesID: number, customerID: number): Promise<PMOSupportModel[] | HttpErrorResponseModel> => {
  const controllerName = `PMO/${salesID}/${customerID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<PMOSupportModel[]>(PMOSupportModel, endpoint);
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
