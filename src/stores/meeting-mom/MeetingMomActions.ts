import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import * as MeetingMomEffects from './MeetingMomEffects';
import ActivityMeeting from './models/ActivityMeeting';
import MeetingMomModel from './models/MeetingMomModel';

type ActionUnion = undefined | HttpErrorResponseModel | ActivityMeeting | MeetingMomModel;

export const REQUEST_POST_MEETING_MOM: string = 'MeetingMomActions.REQUEST_POST_MEETING_MOM';
export const REQUEST_POST_MEETING_MOM_FINISHED = 'MeetingMomActions.REQUEST_POST_MEETING_MOM_FINISHED';
export const postMeetingMom = (data: ActivityMeeting): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ActivityMeeting>(dispatch, REQUEST_POST_MEETING_MOM, MeetingMomEffects.postMeetingMom, data);
  };
};

export const REQUEST_MEETING_MOM: string = 'MeetingMomActions.REQUEST_MEETING_MOM';
export const REQUEST_MEETING_MOM_FINISHED: string = 'MeetingMomActions.REQUEST_MEETING_MOM_FINISHED';

export const requestMeetingMom = (activityID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<MeetingMomModel>(dispatch, REQUEST_MEETING_MOM, MeetingMomEffects.requestMeetingMom, activityID);
  };
};
