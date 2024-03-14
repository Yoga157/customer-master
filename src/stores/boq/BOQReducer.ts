import * as BOQActions from './BOQActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import BoqModel from './models/BoqModel';
import IBoqState from './models/IBoqState';
import BoqEnvelope from './models/BoqEnvelope';
import ResultActions from 'models/ResultActions';

export const initialState: IBoqState = {
  listData: new BoqEnvelope({}),
  firstData: new BoqModel({}),
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
};

const boqReducer: Reducer = baseReducer(initialState, {
  [BOQActions.REQUEST_BOQS_FINISHED](state: IBoqState, action: IAction<BoqEnvelope>): IBoqState {
    return {
      ...state,
      listData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [BOQActions.REQUEST_BOQ_FINISHED](state: IBoqState, action: IAction<BoqModel>): IBoqState {
    return {
      ...state,
      firstData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [BOQActions.POST_BOQ_FINISHED](state: IBoqState, action: IAction<BoqModel>): IBoqState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [BOQActions.POST_UPLOAD_BOQ_FINISHED](state: IBoqState, action: IAction<ResultActions>): IBoqState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [BOQActions.PUT_BOQ_FINISHED](state: IBoqState, action: IAction<BoqModel>): IBoqState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [BOQActions.DEL_BOQ_FINISHED](state: IBoqState, action: IAction<BoqModel>): IBoqState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  
  [BOQActions.REQUEST_DEL_ALL_BOQ_FINISHED](state: IBoqState, action: IAction<ResultActions>): IBoqState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [BOQActions.REMOVE_BOQ_RESULT](state: IBoqState, action: IAction<BoqModel>): IBoqState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: new ResultActions({}),
    };
  },
});

export default boqReducer;
