import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import IMeetingMomState from './models/IMeetingMomState';
import ActivityMeeting from './models/ActivityMeeting';
import * as MeetingMomActions from 'stores/meeting-mom/MeetingMomActions';
import MeetingMomModel from './models/MeetingMomModel';

export const initialState: IMeetingMomState = {
  firstData: new MeetingMomModel({}),
  error: false,
  refreshPage: false,
};

const meetingMomReducer: Reducer = baseReducer(initialState, {
  [MeetingMomActions.REQUEST_POST_MEETING_MOM_FINISHED](state: IMeetingMomState, action: IAction<ActivityMeeting>): IMeetingMomState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [MeetingMomActions.REQUEST_MEETING_MOM_FINISHED](state: IMeetingMomState, action: IAction<MeetingMomModel>): IMeetingMomState {
    return {
      ...state,
      firstData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
});

export default meetingMomReducer;
