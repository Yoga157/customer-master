import MeetingMOMItemModel from '../../meeting-mom-items/models/MeetingMomItemModel';
import MeetingMOMModel from './MeetingMomModel';

export default class ActivityMeeting {
  public salesActivityMOM: MeetingMOMModel = new MeetingMOMModel({});
  public salesActivityMOMItems: MeetingMOMItemModel[] = [];
}
