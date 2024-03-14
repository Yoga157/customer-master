import environment from 'environment';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as EffectUtility from 'utilities/EffectUtility';
import FunnelServiceCatalogEnvelope from './models/FunnelServiceCatalogEnvelope';
import FunnelServiceCatalogModel from './models/FunnelServiceCatalogModel';
import DiscountServiceModel from './models/DiscountServiceModel';

export const requestFunnelServiceCatalog = async (
  funnelGenId: number,
  page: number,
  pageSize: number
): Promise<FunnelServiceCatalogEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'FunnelServiceCatalog/' + funnelGenId + '?page=' + page + '&pageSize=' + pageSize;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelServiceCatalogEnvelope>(FunnelServiceCatalogEnvelope, endpoint);
};

export const postFunnelServiceCatalog = async (data: FunnelServiceCatalogModel): Promise<FunnelServiceCatalogModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelServiceCatalog';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<FunnelServiceCatalogModel>(FunnelServiceCatalogModel, endpoint, data);
};

export const delFunnelServiceCatalog = async (
  funnelSvcCatGenID: number,
  userLogin: number
): Promise<FunnelServiceCatalogModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelServiceCatalog?funnelSvcCatGenID=${funnelSvcCatGenID}&userLogin=${userLogin}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.delToModel<FunnelServiceCatalogModel>(FunnelServiceCatalogModel, endpoint);
};

export const postFunnelServiceCatalogIDLocal = async (data: number): Promise<boolean | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('funnelServiceCatalogListID');
  let listID: number[] = [];
  const result: boolean = true;

  if (jsonString !== null && jsonString !== '[]') {
    listID = JSON.parse(jsonString);
  }

  listID.push(data);
  localStorage.setItem('funnelServiceCatalogListID', JSON.stringify(listID));
  return result;
};

export const deleteFunnelServiceCatalogIDLocal = async (data: number): Promise<boolean | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('funnelServiceCatalogListID');
  let listID: number[] = [];
  const result: boolean = true;

  if (jsonString !== null && jsonString !== '[]') {
    listID = JSON.parse(jsonString);
  }

  const newValue = listID.filter((item: number) => {
    return item !== data;
  });

  localStorage.setItem('funnelServiceCatalogListID', JSON.stringify(newValue));

  return result;
};

export const postRequestDiscount = async (data: DiscountServiceModel): Promise<DiscountServiceModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelServiceCatalog/RequestDiscount';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<DiscountServiceModel>(DiscountServiceModel, endpoint, data);
};

export const requestFunnelServiceCatalogFirst = async (funnelSvcCatGenID: number): Promise<FunnelServiceCatalogModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelServiceCatalog/funnelSvcCatGenID=' + funnelSvcCatGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelServiceCatalogModel>(FunnelServiceCatalogModel, endpoint);
};

export const putFunnelServiceCatalog = async (data: FunnelServiceCatalogModel): Promise<FunnelServiceCatalogModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelServiceCatalog';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<FunnelServiceCatalogModel>(FunnelServiceCatalogModel, endpoint, data);
};
