import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import ISubBrandState from './models/ISubBrandState';
import SubBrandModel from './models/SubBrandModel';
import * as SubBrandAction from './SubBrandAction';
import ResultActions from 'models/ResultActions';

export const initialState: ISubBrandState = {
  data: [],
  dataSubBrand: [],
  firstdata: new SubBrandModel({}),
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
};

const subBrandReducer: Reducer = baseReducer(initialState, {
  [SubBrandAction.REQUEST_SUB_BRAND_FINISHED](state: ISubBrandState, action: IAction<SubBrandModel[]>): ISubBrandState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [SubBrandAction.REQUEST_SUB_BRAND_PROD_FINISHED](state: ISubBrandState, action: IAction<SubBrandModel[]>): ISubBrandState {
    return {
      ...state,
      dataSubBrand: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [SubBrandAction.REQUEST_SUB_BRANDS_FINISHED](state: ISubBrandState, action: IAction<SubBrandModel[]>): ISubBrandState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [SubBrandAction.REQUEST_SUB_BRAND_GROUP_FINISHED](state: ISubBrandState, action: IAction<SubBrandModel[]>): ISubBrandState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [SubBrandAction.REQUEST_SUB_BRAND_BY_ID_FINISHED](state: ISubBrandState, action: IAction<SubBrandModel>): ISubBrandState {
    return {
      ...state,
      firstdata: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [SubBrandAction.POST_SUB_BRAND_FINISHED](state: ISubBrandState, action: IAction<ResultActions>): ISubBrandState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },
});

export default subBrandReducer;
