import * as BrandEffect from './BrandEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import BrandModel from './models/BrandModel';
import BrandByProdModel from './models/BrandByProdModel';

type ActionUnion = undefined | HttpErrorResponseModel | BrandModel[] | BrandModel | BrandByProdModel[];

export const REQUEST_BRAND: string = 'BrandActions.REQUEST_BRAND';
export const REQUEST_BRAND_FINISHED: string = 'BrandActions.REQUEST_BRAND_FINISHED';

export const requestBrand = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BrandModel[]>(dispatch, REQUEST_BRAND, BrandEffect.requestBrand);
  };
};

export const REQUEST_BRAND_BY_DATE: string = 'BrandActions.REQUEST_BRAND_BY_DATE';
export const REQUEST_BRAND_BY_DATE_FINISHED: string = 'BrandActions.REQUEST_BRAND_BY_DATE_FINISHED';

export const requestBrandDate = (createDate: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BrandModel[]>(dispatch, REQUEST_BRAND_BY_DATE, BrandEffect.requestBrandDate, createDate);
  };
};

export const REQUEST_BRAND_BY_PROD: string = 'BrandActions.REQUEST_BRAND_BY_PROD';
export const REQUEST_BRAND_BY_PROD_FINISHED: string = 'BrandActions.REQUEST_BRAND_BY_PROD_FINISHED';

export const requestBrandProd = (funnelGenID:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BrandByProdModel[]>(dispatch, REQUEST_BRAND_BY_PROD, BrandEffect.requestBrandProd,funnelGenID);
  };
};

export const REQUEST_BRAND_USER_LOGIN: string = 'BrandActions.REQUEST_BRAND_USER_LOGIN';
export const REQUEST_BRAND_USER_LOGIN_FINISHED: string = 'BrandActionsREQUEST_BRAND_USER_LOGIN_FINISHED';

export const requestBrandByUserlogin = (userlogin: string, direktoratID: string, projectCategory: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BrandModel[]>(dispatch, REQUEST_BRAND, BrandEffect.requestBrandByUserlogin, userlogin, direktoratID, projectCategory);
  };
};

export const POST_BRAND: string = 'BrandActions.REQUEST_POST_BRAND';
export const POST_BRAND_FINISHED = 'BrandActions.REQUEST_POST_BRAND_FINISHED';
export const postBrand = (data: BrandModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BrandModel>(dispatch, POST_BRAND, BrandEffect.postBrand, data);
  };
};
