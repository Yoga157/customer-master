import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import SubBrandModel from './models/SubBrandModel';
import ResultActions from 'models/ResultActions';
import SubBrandProdModel from './models/SubBrandProdModel';

export const requestSubBrand = async (brandID: number, projectCategoryID: string): Promise<SubBrandModel[] | HttpErrorResponseModel> => {
  const controllerName = 'SubBrand/brand=' + brandID + "?projectCategoryID=" + projectCategoryID;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<SubBrandModel[]>(SubBrandModel, endpoint);
};

export const requestSubBrandProd = async (funnelGenID:number,brandID: number): Promise<SubBrandProdModel[] | HttpErrorResponseModel> => {
  const controllerName = `FunnelProduct/SubBrand?funnelGenID=${funnelGenID}&brandID=${brandID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<SubBrandProdModel[]>(SubBrandProdModel, endpoint);
};

export const requestSubBrandGroup = async (svcCatGenID: any): Promise<SubBrandModel[] | HttpErrorResponseModel> => {
  const controllerName = 'SubBrand/GroupBy?svcCatGenID=' + svcCatGenID;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<SubBrandModel[]>(SubBrandModel, endpoint);
};

export const requestSubBrandById = async (subBrandID: number): Promise<SubBrandModel | HttpErrorResponseModel> => {
  const controllerName = 'SubBrand/subbrand=' + subBrandID;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<SubBrandModel>(SubBrandModel, endpoint);
};

export const postSubBrand = async (data: SubBrandModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'SubBrand';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestSubBrands = async (): Promise<SubBrandModel[] | HttpErrorResponseModel> => {
  const controllerName = 'SubBrand';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<SubBrandModel[]>(SubBrandModel, endpoint);
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
