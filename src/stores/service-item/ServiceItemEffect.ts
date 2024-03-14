import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import ServiceItemModel from './models/ServiceItemModel';

export const requestServiceItem = async (
  deptid: string,
  funnelGenID: number,
  itemID: number
): Promise<ServiceItemModel[] | HttpErrorResponseModel> => {
  const controllerName = `Services?direktoratID=${deptid}&funnelGenID=${funnelGenID}&itemID=${itemID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<ServiceItemModel[]>(ServiceItemModel, endpoint);
};

/**
 * This is only to trigger an error api response so we can use it for an example in the AboutPage
 */
export const requestError = async (): Promise<any | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.funnel;
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data;
};
