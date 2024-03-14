import * as CollabToolsEffects from './CollabToolsEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import ResultActions from 'models/ResultActions';
import CollabToolsReviewBySales from './models/CollabToolsReviewBySales';
import CategoryOptionsModel from './models/CategoryOptionsModel';
import ReviewModel from './models/ReviewModel';
import ReviewActivity from './models/ReviewActivityModel';
import FunnelInfoModel from './models/FunnelInfoModel';
type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | CollabToolsReviewBySales
  | CategoryOptionsModel
  | ResultActions
  | ReviewActivity
  | FunnelInfoModel

export const REQUEST_REVIEW_BY_SALES: string = 'CollabToolsActions.REQUEST_REVIEW_BY_SALES';
export const REQUEST_REVIEW_BY_SALES_FINISHED: string = 'CollabToolsActions.REQUEST_REVIEW_BY_SALES_FINISHED';

export const requestReviewBySales = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CollabToolsReviewBySales>(
      dispatch,
      REQUEST_REVIEW_BY_SALES,
      CollabToolsEffects.requestReviewBySales,
      data
    );
  };
};

export const GET_CATEGORY_OPTIONS: string = 'CollabToolsActions.GET_CATEGORY_OPTIONS';
export const GET_CATEGORY_OPTIONS_FINISHED: string = 'CollabToolsActions.GET_CATEGORY_OPTIONS_FINISHED';

export const getReviewCategoryOption = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CategoryOptionsModel>(
      dispatch,
      GET_CATEGORY_OPTIONS,
      CollabToolsEffects.getReviewCategoryOption
    );
  };
};

export const REQUEST_ACTIVITY_REVIEW: string = 'CollabToolsActions.REQUEST_ACTIVITY_REVIEW';
export const REQUEST_ACTIVITY_REVIEW_FINISHED: string = 'CollabToolsActions.REQUEST_ACTIVITY_REVIEW_FINISHED';

export const getReviewActivityHistoryList = (funnelGenID: number, category?: string, includeSystemActivity?: boolean): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ReviewActivity>(
      dispatch,
      REQUEST_ACTIVITY_REVIEW,
      CollabToolsEffects.getReviewActivityHistoryList,
      funnelGenID, category, includeSystemActivity
    );
  };
};
export const REQUEST_GET_FUNNEL_INFO: string = 'CollabToolsActions.REQUEST_GET_FUNNEL_INFO';
export const REQUEST_GET_FUNNEL_INFO_FINISHED: string = 'CollabToolsActions.REQUEST_GET_FUNNEL_INFO_FINISHED';

export const getFunnelInfo = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelInfoModel>(
      dispatch,
      REQUEST_GET_FUNNEL_INFO,
      CollabToolsEffects.getFunnelInfo,
      funnelGenID
    );
  };
};

export const REQUEST_POST_REVIEW: string = 'CollabToolsActions.REQUEST_POST_REVIEW';
export const REQUEST_POST_REVIEW_FINISHED = 'CollabToolsActions.REQUEST_POST_REVIEW_FINISHED';
export const postReview = (data: ReviewModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_REVIEW, CollabToolsEffects.postReview, data);
  };
};

export const REQUEST_SET_COMPLETED: string = 'CollabToolsActions.REQUEST_SET_COMPLETED';
export const REQUEST_SET_COMPLETED_FINISHED = 'CollabToolsActions.REQUEST_SET_COMPLETED_FINISHED';
export const postCompleted = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_SET_COMPLETED, CollabToolsEffects.postCompleted, data);
  };
};


export const REMOVE_SUBMIT_RESULT: string = 'CollabToolsActions.REMOVE_SUBMIT_RESULT';
export const REMOVE_SUBMIT_RESULT_FINISHED = 'CollabToolsActions.REMOVE_SUBMIT_RESULT_FINISHED';

export const removeResult = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REMOVE_SUBMIT_RESULT, CollabToolsEffects.removeResult);
  };
};