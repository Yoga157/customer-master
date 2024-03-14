import MeetingMomItemModel from './MeetingMomItemModel';
import MeetingMomItemsEnvelope from './MeetingMomItemsEnvelope';

export default interface IProductServiceState {
  readonly listData: MeetingMomItemsEnvelope;
  readonly firstData: MeetingMomItemModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
}
