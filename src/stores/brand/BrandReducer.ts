import IBrandState from './models/IBrandState';
import * as BrandAction from './BrandAction';
import IAction from '../../models/IAction';
import BrandModel from './models/BrandModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import BrandByProdModel from './models/BrandByProdModel';

export const initialState: IBrandState = {
  data: [],
  dataBrand:[],
  dataBrandDate:[],
  error: false,
  refreshPage: false,
};

const brandReducer: Reducer = baseReducer(initialState, {
  [BrandAction.REQUEST_BRAND_FINISHED](state: IBrandState, action: IAction<BrandModel[]>): IBrandState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [BrandAction.REQUEST_BRAND_BY_DATE_FINISHED](state: IBrandState, action: IAction<BrandModel[]>): IBrandState {
    return {
      ...state,
      dataBrandDate: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [BrandAction.REQUEST_BRAND_BY_PROD_FINISHED](state: IBrandState, action: IAction<BrandByProdModel[]>): IBrandState {
    return {
      ...state,
      dataBrand: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [BrandAction.REQUEST_BRAND_USER_LOGIN_FINISHED](state: IBrandState, action: IAction<BrandModel[]>): IBrandState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [BrandAction.POST_BRAND_FINISHED](state: IBrandState, action: IAction<BrandModel>): IBrandState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
});

export default brandReducer;
