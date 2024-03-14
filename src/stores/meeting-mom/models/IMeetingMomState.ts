import ActivityMeeting from './ActivityMeeting';
import MeetingMomModel from 'stores/meeting-mom/models/MeetingMomModel';

export default interface IMeetingMomState {
  readonly firstData: MeetingMomModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
}
