import * as CollabToolsActions from './CollabToolsActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import ResultActions from 'models/ResultActions';
import ICollabToolsState from './models/ICollabToolsState';
import CollabToolsReviewBySales from './models/CollabToolsReviewBySales';
import CategoryOptionsModel from './models/CategoryOptionsModel';
import ReviewActivity from './models/ReviewActivityModel';
import FunnelInfoModel from './models/FunnelInfoModel';

export const initialState: ICollabToolsState = {
  ReviewBySales: [],
  ReviewActivity: [],
  CategoryOptions: [],
  FunnelInfo: new FunnelInfoModel({}),
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
};

const CollabToolsReducer: Reducer = baseReducer(initialState, {
  [CollabToolsActions.REQUEST_REVIEW_BY_SALES_FINISHED](state: ICollabToolsState, action: IAction<CollabToolsReviewBySales[]>): ICollabToolsState {
    return {
      ...state,
      ReviewBySales: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [CollabToolsActions.GET_CATEGORY_OPTIONS_FINISHED](state: ICollabToolsState, action: IAction<CategoryOptionsModel[]>): ICollabToolsState {
    return {
      ...state,
      CategoryOptions: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [CollabToolsActions.REQUEST_ACTIVITY_REVIEW_FINISHED](state: ICollabToolsState, action: IAction<ReviewActivity[]>): ICollabToolsState {
    return {
      ...state,
      ReviewActivity: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [CollabToolsActions.REQUEST_GET_FUNNEL_INFO_FINISHED](state: ICollabToolsState, action: IAction<FunnelInfoModel>): ICollabToolsState {
    return {
      ...state,
      FunnelInfo: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [CollabToolsActions.REQUEST_POST_REVIEW_FINISHED](state: ICollabToolsState, action: IAction<ResultActions>): ICollabToolsState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },
  [CollabToolsActions.REMOVE_SUBMIT_RESULT](state: ICollabToolsState, action: IAction<ResultActions>): ICollabToolsState {
    return {
      ...state,
      resultActions: action.payload!,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },[CollabToolsActions.REQUEST_SET_COMPLETED_FINISHED](state: ICollabToolsState, action: IAction<ResultActions>): ICollabToolsState {
    return {
      ...state,
      resultActions: action.payload!,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

});

export default CollabToolsReducer;
