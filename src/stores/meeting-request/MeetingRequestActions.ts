import * as MeetingRequestEffect from './MeetingRequestEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import MeetingRequestModel from './models/MeetingRequestModel';

type ActionUnion = undefined | HttpErrorResponseModel | MeetingRequestModel;

export const POST_MEETING_REQUEST: string = 'MeetingRequestActions.REQUEST_POST_MEETING_REQUEST';
export const POST_MEETING_REQUEST_FINISHED = 'MeetingRequestActions.REQUEST_POST_MEETING_REQUEST_FINISHED';
export const postMeetingRequest = (data: MeetingRequestModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<MeetingRequestModel>(dispatch, POST_MEETING_REQUEST, MeetingRequestEffect.postMeetingRequest, data);
  };
};
