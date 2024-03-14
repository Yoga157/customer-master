import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import * as ActivityTypeEffects from './ActivityTypeEffects';
import ActivityTypeModel from './models/ActivityTypeModel';

type ActionUnion = undefined | HttpErrorResponseModel | ActivityTypeModel[];

export const REQUEST_ACTIVITY_TYPE: string = 'ActivityType.REQUEST_ACTIVITY_TYPE';
export const REQUEST_ACTIVITY_TYPE_FINISHED: string = 'ActivityType.REQUEST_ACTIVITY_TYPE_FINISHED';

export const requestActivityType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ActivityTypeModel[]>(dispatch, REQUEST_ACTIVITY_TYPE, ActivityTypeEffects.requestActivityType);
  };
};

export const REQUEST_ACTIVITY_TYPE_ALL: string = 'ActivityType.REQUEST_ACTIVITY_TYPE_ALL';
export const REQUEST_ACTIVITY_TYPE_ALL_FINISHED: string = 'ActivityType.REQUEST_ACTIVITY_TYPE_ALL_FINISHED';

export const requestActivityTypeAll = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ActivityTypeModel[]>(dispatch, REQUEST_ACTIVITY_TYPE_ALL, ActivityTypeEffects.requestActivityTypeAll);
  };
};
