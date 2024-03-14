import IMeetingRequestState from './models/IMeetingRequestState';
import * as MeetingRequestActions from './MeetingRequestActions';
import IAction from '../../models/IAction';
import MeetingRequestModel from './models/MeetingRequestModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IMeetingRequestState = {
  meetingRequest: [],
};

const meetingRequestReducer: Reducer = baseReducer(initialState, {
  [MeetingRequestActions.POST_MEETING_REQUEST_FINISHED](state: IMeetingRequestState, action: IAction<MeetingRequestModel[]>): IMeetingRequestState {
    return {
      ...state,
      meetingRequest: action.payload!,
    };
  },
});

export default meetingRequestReducer;
