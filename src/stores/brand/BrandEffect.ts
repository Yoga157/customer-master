import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import BrandModel from './models/BrandModel';
import BrandByProdModel from './models/BrandByProdModel';

export const requestBrand = async (): Promise<BrandModel[] | HttpErrorResponseModel> => {
  const controllerName = `Brand`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<BrandModel[]>(BrandModel, endpoint);
};

export const requestBrandDate = async (createDate: string): Promise<BrandModel[] | HttpErrorResponseModel> => {
  const controllerName = `Brand/GetBrandAllByDate?createDate=${createDate}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<BrandModel[]>(BrandModel, endpoint);
};

export const requestBrandProd = async (funnelGenID:number): Promise<BrandByProdModel[] | HttpErrorResponseModel> => {
  const controllerName = `FunnelProduct/Brand?funnelGenID=${funnelGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<BrandByProdModel[]>(BrandByProdModel, endpoint);
};

export const requestBrandByUserlogin = async (funnelGenID: string, direktoratID: string, projectCategory: string): Promise<BrandModel[] | HttpErrorResponseModel> => {
  const controllerName = `Brand/GetBrandAllCreator?funnelGenID=${funnelGenID}&direktoratID=${direktoratID}&projectCategory=${projectCategory}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<BrandModel[]>(BrandModel, endpoint);
};

export const postBrand = async (data: BrandModel): Promise<BrandModel | HttpErrorResponseModel> => {
  const controllerName = 'Brand';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<BrandModel>(BrandModel, endpoint, data);
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
