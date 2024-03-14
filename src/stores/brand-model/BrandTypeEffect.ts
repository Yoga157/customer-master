import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import BrandTypeModel from './models/BrandTypeModel';
import BrandTypeEnvelope from './models/BrandTypeEnvelope';
import BrandPMModel from './models/BrandPMModel';

export const requestBrandModel = async (subBrand: number): Promise<BrandTypeModel[] | HttpErrorResponseModel> => {
  const controllerName = 'BrandModel/subbrand=' + subBrand;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<BrandTypeModel[]>(BrandTypeModel, endpoint);
};

export const requestBrandModels = async (activePage: number, pageSize: number): Promise<BrandTypeEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'BrandModel?page=' + activePage + '&pageSize=' + pageSize;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<BrandTypeEnvelope>(BrandTypeEnvelope, endpoint);
};

export const requestBrandModelByGroup = async (groupId: number): Promise<BrandTypeModel[] | HttpErrorResponseModel> => {
  const controllerName = 'BrandModel/group=' + groupId;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<BrandTypeModel[]>(BrandTypeModel, endpoint);
};

export const postBrandModel = async (data: BrandTypeModel): Promise<BrandTypeModel | HttpErrorResponseModel> => {
  const controllerName = 'BrandModel';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<BrandTypeModel>(BrandTypeModel, endpoint, data);
};

export const putBrandModel = async (data: BrandTypeModel): Promise<BrandTypeModel | HttpErrorResponseModel> => {
  const controllerName = 'BrandModel';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<BrandTypeModel>(BrandTypeModel, endpoint, data);
};

export const requestBrandModelById = async (brandModelGenID: number): Promise<BrandTypeModel | HttpErrorResponseModel> => {
  const controllerName = 'BrandModel/' + brandModelGenID;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<BrandTypeModel>(BrandTypeModel, endpoint);
};

export const putUpdateStatusBrandModel = async (data: BrandTypeModel): Promise<BrandTypeModel | HttpErrorResponseModel> => {
  const controllerName = 'BrandModel/UpdateStatus';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<BrandTypeModel>(BrandTypeModel, endpoint, data);
};

export const putChangePM = async (data: BrandPMModel): Promise<BrandPMModel | HttpErrorResponseModel> => {
  const controllerName = 'BrandModel/ChangePM';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<BrandPMModel>(BrandPMModel, endpoint, data);
};

export const requestBrandModelSearch = async (
  textSearch: string,
  activePage: number,
  pageSize: number
): Promise<BrandTypeEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'BrandModel/Search?page=' + activePage + '&pageSize=' + pageSize + '&text=' + textSearch;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<BrandTypeEnvelope>(BrandTypeEnvelope, endpoint);
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
