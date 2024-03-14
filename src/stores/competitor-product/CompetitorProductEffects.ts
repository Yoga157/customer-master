import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import CompetitorProductModel from './models/CompetitorProductModel';

export const requestCompetitorProduct = async (): Promise<CompetitorProductModel[] | HttpErrorResponseModel> => {
  const controllerName = `Udc/DropdownCompetitor?entryKey=CompetitorProduct`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<CompetitorProductModel[]>(CompetitorProductModel, endpoint);
};

export const requestCompetitorService = async (): Promise<CompetitorProductModel[] | HttpErrorResponseModel> => {
  const controllerName = `Udc/DropdownCompetitor?entryKey=CompetitorService`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<CompetitorProductModel[]>(CompetitorProductModel, endpoint);
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
