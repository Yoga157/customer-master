import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import ServiceCatalogEnvelope from './models/ServiceCatalogEnvelope';
import ServiceCatalogModel from './models/ServiceCatalogModel';
import {
  ServiceCatalogPrice,
  ServiceCatalogServices,
  ServiceCatalogManHour,
  ServiceCatalogProduct,
  ServiceCatalogHeaderModel,
  ServiceCatalogBrandModel,
} from './models/child-edit';
import ServiceCatalogModelAdd from './models/ServiceCatalogModelAdd';

export const requestServiceCatalog = async (
  userLoginID: number,
  activeFlag: number,
  page: number,
  pageSize: number,
): Promise<ServiceCatalogEnvelope | HttpErrorResponseModel> => {
  const controllerName = `ServiceCatalog/isActive?UserLoginID=${userLoginID}&activeFlag=${activeFlag}&page=${page}&pageSize=${pageSize}`;
  const endpoint: string = environment.api.serviceCatalog.replace(':controller', controllerName);

  return EffectUtility.getToModel<ServiceCatalogEnvelope>(ServiceCatalogEnvelope, endpoint);
};

export const requestServiceCatalogAll = async (): Promise<ServiceCatalogEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'ServiceCatalog';
  const endpoint: string = environment.api.serviceCatalog.replace(':controller', controllerName);

  return EffectUtility.getToModel<ServiceCatalogEnvelope>(ServiceCatalogEnvelope, endpoint);
};

export const requestServiceCatalogByFunnel = async (funnelGenID: number): Promise<ServiceCatalogEnvelope | HttpErrorResponseModel> => {
  const controllerName = `ServiceCatalog/FunnelGenID/${funnelGenID}?page=0&pageSize=0`;
  const endpoint: string = environment.api.serviceCatalog.replace(':controller', controllerName);

  return EffectUtility.getToModel<ServiceCatalogEnvelope>(ServiceCatalogEnvelope, endpoint);
};

export const requestServiceCatalogBrandModel = async (svcCatGenID: number): Promise<ServiceCatalogBrandModel[] | HttpErrorResponseModel> => {
  const controllerName = 'ServiceCatalog/BrandModel/' + svcCatGenID;
  const endpoint: string = environment.api.serviceCatalog.replace(':controller', controllerName);

  return EffectUtility.getToModel<ServiceCatalogBrandModel[]>(ServiceCatalogBrandModel, endpoint);
};

export const requestServiceCatalogById = async (svcCatGenID: number): Promise<ServiceCatalogModel | HttpErrorResponseModel> => {
  const controllerName = 'ServiceCatalog/' + svcCatGenID;
  const endpoint: string = environment.api.serviceCatalog.replace(':controller', controllerName);

  return EffectUtility.getToModel<ServiceCatalogModel>(ServiceCatalogModel, endpoint);
};

export const postServiceCatalog = async (data: ServiceCatalogModelAdd): Promise<ServiceCatalogModelAdd | HttpErrorResponseModel> => {
  const controllerName = 'ServiceCatalog';
  const endpoint: string = environment.api.serviceCatalog.replace(':controller', controllerName);
  return EffectUtility.postToModel<ServiceCatalogModelAdd>(ServiceCatalogModelAdd, endpoint, data);
};

export const putServiceCatalog = async (data: ServiceCatalogModel): Promise<ServiceCatalogModel | HttpErrorResponseModel> => {
  const controllerName = 'ServiceCatalog';
  const endpoint: string = environment.api.serviceCatalog.replace(':controller', controllerName);
  return EffectUtility.putToModel<ServiceCatalogModel>(ServiceCatalogModel, endpoint, data);
};

export const putServiceCatalogHeader = async (data: ServiceCatalogHeaderModel): Promise<ServiceCatalogHeaderModel | HttpErrorResponseModel> => {
  const controllerName = 'ServiceCatalog/UpdateHeader';
  const endpoint: string = environment.api.serviceCatalog.replace(':controller', controllerName);
  return EffectUtility.putToModel<ServiceCatalogHeaderModel>(ServiceCatalogHeaderModel, endpoint, data);
};

export const putServiceCatalogProduct = async (data: ServiceCatalogProduct): Promise<ServiceCatalogProduct | HttpErrorResponseModel> => {
  const controllerName = 'ServiceCatalog/UpdateProduct';
  const endpoint: string = environment.api.serviceCatalog.replace(':controller', controllerName);
  return EffectUtility.putToModel<ServiceCatalogProduct>(ServiceCatalogProduct, endpoint, data);
};

export const putServiceCatalogManHour = async (data: ServiceCatalogManHour): Promise<ServiceCatalogManHour | HttpErrorResponseModel> => {
  const controllerName = 'ServiceCatalog/UpdateManHour';
  const endpoint: string = environment.api.serviceCatalog.replace(':controller', controllerName);
  return EffectUtility.putToModel<ServiceCatalogManHour>(ServiceCatalogManHour, endpoint, data);
};

export const putServiceCatalogServices = async (data: ServiceCatalogServices): Promise<ServiceCatalogServices | HttpErrorResponseModel> => {
  const controllerName = 'ServiceCatalog/UpdateServices';
  const endpoint: string = environment.api.serviceCatalog.replace(':controller', controllerName);
  return EffectUtility.putToModel<ServiceCatalogServices>(ServiceCatalogServices, endpoint, data);
};

export const putServiceCatalogPrice = async (data: ServiceCatalogPrice): Promise<ServiceCatalogPrice | HttpErrorResponseModel> => {
  const controllerName = 'ServiceCatalog/UpdatePrice';
  const endpoint: string = environment.api.serviceCatalog.replace(':controller', controllerName);
  return EffectUtility.putToModel<ServiceCatalogPrice>(ServiceCatalogPrice, endpoint, data);
};

export const requestServiceCatalogSearch = async (
  userLoginID: number,
  text: string,
  page: number,
  pageSize: number
): Promise<ServiceCatalogEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'ServiceCatalog/Search?UserLoginID=' + userLoginID + '&page=' + page + '&pageSize=' + pageSize + '&text=' + text;
  const endpoint: string = environment.api.serviceCatalog.replace(':controller', controllerName);

  return EffectUtility.getToModel<ServiceCatalogEnvelope>(ServiceCatalogEnvelope, endpoint);
};

export const delServiceCatalog = async (svcCatGenID: number, userLogin: number): Promise<ServiceCatalogModel | HttpErrorResponseModel> => {
  const controllerName = `ServiceCatalog/Inactive?svcCatGenID=${svcCatGenID}&userLogin=${userLogin}`;
  const endpoint: string = environment.api.serviceCatalog.replace(':controller', controllerName);
  return EffectUtility.delToModel<ServiceCatalogModel>(ServiceCatalogModel, endpoint);
};

/**
 * This is only to trigger an error api response so we can use it for an example in the AboutPage
 */
export const requestError = async (): Promise<any | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.serviceCatalog;
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data;
};
