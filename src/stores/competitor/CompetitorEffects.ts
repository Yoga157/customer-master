import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import CompetitorModel from './models/CompetitorModel';

export const requestCompetitor = async (): Promise<CompetitorModel[] | HttpErrorResponseModel> => {
  const controllerName = `CollectionContoller/GetCompetitor`;
  const endpoint: string = environment.api.jde.replace(':controller', controllerName);

  return EffectUtility.getToModel<CompetitorModel[]>(CompetitorModel, endpoint);
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
