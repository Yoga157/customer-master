import * as POCActions from './POCActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import IPOCState from './models/IPOCState';
import POCEnvelope from './models/POCEnvelope';
import POCRequestModel from './models/POCRequestModel';

export const initialState: IPOCState = {
  listData: new POCEnvelope({}),
  firstData: new POCRequestModel({}),
  error: false,
  refreshPage: false,
};

const pocReducer: Reducer = baseReducer(initialState, {
  [POCActions.POST_POC_FINISHED](state: IPOCState, action: IAction<POCRequestModel>): IPOCState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [POCActions.REQUEST_POCS_FINISHED](state: IPOCState, action: IAction<POCEnvelope>): IPOCState {
    return {
      ...state,
      listData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [POCActions.REQUEST_POC_FINISHED](state: IPOCState, action: IAction<POCRequestModel>): IPOCState {
    return {
      ...state,
      firstData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [POCActions.DEL_POC_FINISHED](state: IPOCState, action: IAction<POCRequestModel>): IPOCState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [POCActions.PUT_POC_FINISHED](state: IPOCState, action: IAction<POCRequestModel>): IPOCState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [POCActions.PUT_POC_ACTUAL_DATE_FINISHED](state: IPOCState, action: IAction<POCRequestModel>): IPOCState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
});

export default pocReducer;
