import IBrandTypeState from './models/IBrandTypeState';
import * as BrandTypeAction from './BrandTypeAction';
import IAction from '../../models/IAction';
import BrandTypeModel from './models/BrandTypeModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import BrandTypeEnvelope from './models/BrandTypeEnvelope';

export const initialState: IBrandTypeState = {
  data: [],
  firstData: new BrandTypeModel({}),
  listData: new BrandTypeEnvelope({}),
  error: false,
  refreshPage: false,
};

const brandTypeReducer: Reducer = baseReducer(initialState, {
  [BrandTypeAction.REQUEST_BRAND_MODEL_FINISHED](state: IBrandTypeState, action: IAction<BrandTypeEnvelope>): IBrandTypeState {
    return {
      ...state,
      listData: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [BrandTypeAction.REQUEST_BRAND_MODELS_FINISHED](state: IBrandTypeState, action: IAction<BrandTypeEnvelope>): IBrandTypeState {
    return {
      ...state,
      listData: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [BrandTypeAction.REQUEST_BRAND_MODEL_GROUP_FINISHED](state: IBrandTypeState, action: IAction<BrandTypeModel[]>): IBrandTypeState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },

  [BrandTypeAction.POST_BRAND_MODEL_FINISHED](state: IBrandTypeState, action: IAction<BrandTypeModel>): IBrandTypeState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [BrandTypeAction.PUT_BRAND_MODEL_FINISHED](state: IBrandTypeState, action: IAction<BrandTypeModel>): IBrandTypeState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [BrandTypeAction.PUT_STATUS_BRAND_MODEL_FINISHED](state: IBrandTypeState, action: IAction<BrandTypeModel>): IBrandTypeState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [BrandTypeAction.PUT_CHANGE_PM_BRAND_FINISHED](state: IBrandTypeState, action: IAction<BrandTypeModel>): IBrandTypeState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [BrandTypeAction.REQUEST_BRAND_MODEL_BY_ID_FINISHED](state: IBrandTypeState, action: IAction<BrandTypeModel>): IBrandTypeState {
    return {
      ...state,
      firstData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [BrandTypeAction.REQUEST_BRAND_MODELS_SEARCH_FINISHED](state: IBrandTypeState, action: IAction<BrandTypeEnvelope>): IBrandTypeState {
    return {
      ...state,
      listData: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
});

export default brandTypeReducer;
