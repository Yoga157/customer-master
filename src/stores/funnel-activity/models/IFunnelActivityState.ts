import FunnelActivitiesModel from './FunnelActivitiesModel';
import FunnelActivityModel from './FunnelActivityModel';
import FunnelNotesModel from './FunnelNotesModel';

export default interface IFunnelActivityState {
  readonly data: FunnelActivitiesModel[];
  readonly firstData: FunnelActivityModel;
  readonly notes: FunnelNotesModel;
  readonly activityData: FunnelActivitiesModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
}
