import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as EffectUtility from '../../utilities/EffectUtility';
import ActivityMeeting from './models/ActivityMeeting';
import MeetingMomModel from './models/MeetingMomModel';

export const postMeetingMom = async (data: ActivityMeeting): Promise<ActivityMeeting | HttpErrorResponseModel> => {
  const controllerName = 'MeetingMom';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ActivityMeeting>(ActivityMeeting, endpoint, data);
};

export const requestMeetingMom = async (activityID: number): Promise<MeetingMomModel | HttpErrorResponseModel> => {
  const controllerName = 'MeetingMom/' + activityID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<MeetingMomModel>(MeetingMomModel, endpoint);
};
