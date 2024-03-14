import * as FunnelActivitiesEffects from './FunnelActivityEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import FunnelActivitiesModel from './models/FunnelActivitiesModel';
import FunnelActivityModel from './models/FunnelActivityModel';
import FunnelNotesModel from './models/FunnelNotesModel';
import FunnelActivitySearch from './models/FunnelActivitySearch';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | boolean
  | FunnelActivitiesModel[]
  | FunnelActivityModel
  | FunnelActivitiesModel
  | FunnelNotesModel;

export const REQUEST_POST_FUNNEL_ACTIVITY_SEARCH: string = 'FunnelActivityActions.REQUEST_POST_FUNNEL_ACTIVITY_SEARCH';
export const REQUEST_POST_FUNNEL_ACTIVITY_SEARCH_FINISHED: string = 'FunnelActivityActions.REQUEST_POST_FUNNEL_ACTIVITY_SEARCH_FINISHED';

export const postFunnelActivitieSearch = (data: FunnelActivitySearch): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelActivitiesModel[]>(
      dispatch,
      REQUEST_POST_FUNNEL_ACTIVITY_SEARCH,
      FunnelActivitiesEffects.postFunnelActivitieSearch,
      data
    );
  };
};

export const REQUEST_FUNNEL_ACTIVITIES: string = 'FunnelActivityActions.REQUEST_FUNNEL_ACTIVITIES';
export const REQUEST_FUNNEL_ACTIVITIES_FINISHED: string = 'FunnelActivityActions.REQUEST_FUNNEL_ACTIVITIES_FINISHED';

export const requestFunnelActivities = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelActivitiesModel[]>(
      dispatch,
      REQUEST_FUNNEL_ACTIVITIES,
      FunnelActivitiesEffects.requestFunnelActivities,
      funnelGenID
    );
  };
};

export const REQUEST_FUNNEL_ACTIVITY: string = 'FunnelActivityActions.REQUEST_FUNNEL_ACTIVITY';
export const REQUEST_FUNNEL_ACTIVITY_FINISHED: string = 'FunnelActivityActions.REQUEST_FUNNEL_ACTIVITY_FINISHED';

export const requestFunnelActivity = (activityID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelActivitiesModel>(
      dispatch,
      REQUEST_FUNNEL_ACTIVITY,
      FunnelActivitiesEffects.requestFunnelActivity,
      activityID
    );
  };
};

export const REQUEST_POST_FUNNEL_ACTIVITY: string = 'FunnelActivityActions.REQUEST_POST_FUNNEL_ACTIVITY';
export const REQUEST_POST_FUNNEL_ACTIVITY_FINISHED: string = 'FunnelActivityActions.REQUEST_POST_FUNNEL_ACTIVITY_FINISHED';

export const postActivity = (data: FunnelActivityModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelActivityModel>(dispatch, REQUEST_POST_FUNNEL_ACTIVITY, FunnelActivitiesEffects.postActivity, data);
  };
};

export const REQUEST_POST_FUNNEL_NOTES: string = 'FunnelActivityActions.REQUEST_POST_FUNNEL_NOTES';
export const REQUEST_POST_FUNNEL_NOTES_FINISHED: string = 'FunnelActivityActions.REQUEST_POST_FUNNEL_NOTES_FINISHED';

export const postFunnelNotes = (data: FunnelNotesModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelNotesModel>(dispatch, REQUEST_POST_FUNNEL_NOTES, FunnelActivitiesEffects.postFunnelNotes, data);
  };
};
