import * as SubBrandEffect from './SubBrandEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import SubBrandModel from './models/SubBrandModel';
import ResultActions from 'models/ResultActions';
import SubBrandProdModel from './models/SubBrandProdModel';

type ActionUnion = undefined | HttpErrorResponseModel | SubBrandModel[] | SubBrandModel | ResultActions | SubBrandProdModel[];

export const REQUEST_SUB_BRAND: string = 'SubBrandActions.REQUEST_SUB_BRAND';
export const REQUEST_SUB_BRAND_FINISHED: string = 'SubBrandActions.REQUEST_SUB_BRAND_FINISHED';

export const requestSubBrand = (brandId: number, projectCategoryID: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SubBrandModel[]>(dispatch, REQUEST_SUB_BRAND, SubBrandEffect.requestSubBrand, brandId, projectCategoryID);
  };
};

export const REQUEST_SUB_BRAND_PROD: string = 'SubBrandActions.REQUEST_SUB_BRAND_PROD';
export const REQUEST_SUB_BRAND_PROD_FINISHED: string = 'SubBrandActions.REQUEST_SUB_BRAND_PROD_FINISHED';

export const requestSubBrandProd = (funnelGenID:number,brandId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SubBrandProdModel[]>(dispatch, REQUEST_SUB_BRAND_PROD, SubBrandEffect.requestSubBrandProd,funnelGenID, brandId);
  };
};

export const REQUEST_SUB_BRAND_GROUP: string = 'SubBrandActions.REQUEST_SUB_BRAND_GROUP';
export const REQUEST_SUB_BRAND_GROUP_FINISHED: string = 'SubBrandActions.REQUEST_SUB_BRAND_GROUP_FINISHED';

export const requestSubBrandGroup = (svcCatGenID: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SubBrandModel[]>(dispatch, REQUEST_SUB_BRAND_GROUP, SubBrandEffect.requestSubBrandGroup, svcCatGenID);
  };
};

export const REQUEST_SUB_BRAND_BY_ID: string = 'SubBrandActions.REQUEST_SUB_BRAND_BY_ID';
export const REQUEST_SUB_BRAND_BY_ID_FINISHED: string = 'SubBrandActions.REQUEST_SUB_BRAND_BY_ID_FINISHED';

export const requestSubBrandById = (subBrandID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<SubBrandModel>(dispatch, REQUEST_SUB_BRAND_BY_ID, SubBrandEffect.requestSubBrandById, subBrandID);
  };
};

export const POST_SUB_BRAND: string = 'SubBrandActions.REQUEST_POST_SUB_BRAND';
export const POST_SUB_BRAND_FINISHED = 'SubBrandActions.REQUEST_POST_SUB_BRAND_FINISHED';
export const postSubBrand = (data: SubBrandModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, POST_SUB_BRAND, SubBrandEffect.postSubBrand, data);
  };
};

export const REQUEST_SUB_BRANDS: string = 'SubBrandActions.REQUEST_SUB_BRAND';
export const REQUEST_SUB_BRANDS_FINISHED: string = 'SubBrandActions.REQUEST_SUB_BRAND_FINISHED';

export const requestSubBrands = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SubBrandModel[]>(dispatch, REQUEST_SUB_BRANDS, SubBrandEffect.requestSubBrands);
  };
};
