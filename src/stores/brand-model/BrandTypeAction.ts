import * as BrandTypeEffect from './BrandTypeEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import BrandTypeModel from './models/BrandTypeModel';
import BrandTypeEnvelope from './models/BrandTypeEnvelope';
import BrandPMModel from 'stores/brand-model/models/BrandPMModel';

type ActionUnion = undefined | HttpErrorResponseModel | BrandTypeModel[] | BrandTypeModel | BrandTypeEnvelope | BrandPMModel;

export const REQUEST_BRAND_MODEL: string = 'BrandModelActions.REQUEST_BRAND_MODEL';
export const REQUEST_BRAND_MODEL_FINISHED: string = 'BrandModelActions.REQUEST_BRAND_MODEL_FINISHED';

export const requestBrandModel = (subBrandId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BrandTypeModel[]>(dispatch, REQUEST_BRAND_MODEL, BrandTypeEffect.requestBrandModel, subBrandId);
  };
};

export const REQUEST_BRAND_MODELS: string = 'BrandModelActions.REQUEST_BRAND_MODELS';
export const REQUEST_BRAND_MODELS_FINISHED: string = 'BrandModelActions.REQUEST_BRAND_MODELS_FINISHED';

export const requestBrandModels = (activePage: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BrandTypeEnvelope>(
      dispatch,
      REQUEST_BRAND_MODELS,
      BrandTypeEffect.requestBrandModels,
      activePage,
      pageSize
    );
  };
};

export const REQUEST_BRAND_MODEL_GROUP: string = 'BrandModelActions.REQUEST_BRAND_MODEL_GROUP';
export const REQUEST_BRAND_MODEL_GROUP_FINISHED: string = 'BrandModelActions.REQUEST_BRAND_MODEL_GROUP_FINISHED';

export const requestBrandModelByGroup = (groupID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BrandTypeModel[]>(dispatch, REQUEST_BRAND_MODEL_GROUP, BrandTypeEffect.requestBrandModelByGroup, groupID);
  };
};

export const POST_BRAND_MODEL: string = 'BrandModelActions.REQUEST_POST_BRAND_MODEL';
export const POST_BRAND_MODEL_FINISHED = 'BrandModelActions.REQUEST_POST_BRAND_MODEL_FINISHED';
export const postBrandModel = (data: BrandTypeModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BrandTypeModel>(dispatch, POST_BRAND_MODEL, BrandTypeEffect.postBrandModel, data);
  };
};

export const PUT_BRAND_MODEL: string = 'BrandModelActions.REQUEST_PUT_BRAND_MODEL';
export const PUT_BRAND_MODEL_FINISHED = 'BrandModelActions.REQUEST_PUT_BRAND_MODEL_FINISHED';
export const putBrandModel = (data: BrandTypeModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BrandTypeModel>(dispatch, PUT_BRAND_MODEL, BrandTypeEffect.putBrandModel, data);
  };
};

export const PUT_STATUS_BRAND_MODEL: string = 'BrandModelActions.REQUEST_PUT_STATUS_BRAND_MODEL';
export const PUT_STATUS_BRAND_MODEL_FINISHED = 'BrandModelActions.REQUEST_PUT_STATUS_BRAND_MODEL_FINISHED';
export const putUpdateStatusBrandModel = (data: BrandTypeModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BrandTypeModel>(dispatch, PUT_STATUS_BRAND_MODEL, BrandTypeEffect.putUpdateStatusBrandModel, data);
  };
};

export const REQUEST_BRAND_MODEL_BY_ID: string = 'BrandModelActions.REQUEST_BRAND_MODEL_BY_ID';
export const REQUEST_BRAND_MODEL_BY_ID_FINISHED: string = 'BrandModelActions.REQUEST_BRAND_MODEL_BY_ID_FINISHED';

export const requestBrandModelById = (brandModelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BrandTypeModel>(
      dispatch,
      REQUEST_BRAND_MODEL_BY_ID,
      BrandTypeEffect.requestBrandModelById,
      brandModelGenID
    );
  };
};

export const REQUEST_BRAND_MODELS_SEARCH: string = 'BrandModelActions.REQUEST_BRAND_MODELS_SEARCH';
export const REQUEST_BRAND_MODELS_SEARCH_FINISHED: string = 'BrandModelActions.REQUEST_BRAND_MODELS_SEARCH_FINISHED';

export const requestBrandModelSearch = (textSearch: string, activePage: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BrandTypeEnvelope>(
      dispatch,
      REQUEST_BRAND_MODELS_SEARCH,
      BrandTypeEffect.requestBrandModelSearch,
      textSearch,
      activePage,
      pageSize
    );
  };
};

export const PUT_CHANGE_PM_BRAND: string = 'BrandModelActions.REQUEST_PUT_CHANGE_PM_BRAND';
export const PUT_CHANGE_PM_BRAND_FINISHED = 'BrandModelActions.REQUEST_PUT_CHANGE_PM_BRAND_FINISHED';
export const putChangePM = (data: BrandPMModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BrandPMModel>(dispatch, PUT_CHANGE_PM_BRAND, BrandTypeEffect.putChangePM, data);
  };
};
