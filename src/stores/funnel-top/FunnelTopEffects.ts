import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as EffectUtility from '../../utilities/EffectUtility';
import FunnelTopItem from './models/FunnelTopItem';
import FunnelTopEnvelope from './models/FunnelTopEnvelope';
import FunnelTopType from './models/FunnelTopType';
import TopServiceModel from './models/TopServiceModel';
import TopServiceOfObjModel from './models/TopServiceOfObjModel';
import ProductDescModel from './models/ProductDescModel';
import ResultActions from 'models/ResultActions';
import FunnelHistoryEnvelope from 'stores/funnel/models/FunnelHistoryEnvelope';
import SearchTopNumberModel from './models/SearchTopNumberModel';

// GetByFunnelGenID
export const requestFunnelTop = async (
  funnelGenId: number,
  page?: number,
  pageSize?: number | string
): Promise<FunnelTopEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'FunnelTop/GetByFunnelGenID?FunnelGenID=' + funnelGenId + '&page=' + page + '&pageSize=' + pageSize;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelTopEnvelope>(FunnelTopEnvelope, endpoint);
};

export const postFunnelTop = async (data: TopServiceModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'FunnelTOP';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestPutFunnelTop = async (data: TopServiceModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'FunnelTOP';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const delFunnelTop = async (funnelTopId: number): Promise<TopServiceModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelTOP?FunnelTopID=${funnelTopId}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.delToModel<TopServiceModel>(TopServiceModel, endpoint);
};

export const requestFunnelTopById = async (funnelTopID: number): Promise<TopServiceOfObjModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelTOP/GetByID?FunnelTopID=' + funnelTopID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<TopServiceOfObjModel>(TopServiceOfObjModel, endpoint);
};

export const requestTopItem = async (): Promise<FunnelTopItem[] | HttpErrorResponseModel> => {
  const controllerName = 'Udc/GetByEntryKey/ItemTop';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<FunnelTopItem[]>(FunnelTopItem, endpoint);
};

export const requestSupportingDocument = async (): Promise<FunnelTopItem[] | HttpErrorResponseModel> => {
  const controllerName = 'Udc/GetByEntryKey/SupportingDocument';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<FunnelTopItem[]>(FunnelTopItem, endpoint);
};

export const requestTopType = async (): Promise<FunnelTopType[] | HttpErrorResponseModel> => {
  const controllerName = 'Udc/GetByEntryKey/TopType';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<FunnelTopType[]>(FunnelTopType, endpoint);
};

export const requestSetPage = async (page: number): Promise<any | HttpErrorResponseModel> => {
  return page;
};

//Dropdown Product Description
export const requestDropdownProductDesc = async (
  duration: number,
  durationType: string,
  type: string
): Promise<ProductDescModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelTOP/DropdownDescription?Duration=' + duration + '&DurationType=' + durationType + '&Type=' + type;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<ProductDescModel>(ProductDescModel, endpoint);
};

export const searchTOPNumber = async (
  funnelGenID: number,
  searchText: string,
): Promise<SearchTopNumberModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelTOP/SearchTOPNumber?funnelGenID=${funnelGenID}&searchText=${searchText}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<SearchTopNumberModel>(SearchTopNumberModel, endpoint);
};


export const requestFunnelTopHistoryById = async (funnelGenID: number): Promise<FunnelHistoryEnvelope[] | HttpErrorResponseModel> => {
  const controllerName = `FunnelTOP/History?funnelGenID=${funnelGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<FunnelHistoryEnvelope[]>(FunnelHistoryEnvelope, endpoint);
};

export const clearResult = async (): Promise<any> => {
  const clear = new ResultActions({});
  return clear;
};
