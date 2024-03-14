import FunnelSupportTeamEnvelope from './FunnelSupportTeamEnvelope';
import FunnelSupportTeamModel from './FunnelSupportTeamModel';

export default interface IFunnelSupportTeamState {
  readonly listData: FunnelSupportTeamEnvelope;
  readonly data: FunnelSupportTeamModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
}
