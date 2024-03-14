import FunnelStatusModel from './FunnelSplitModel';
import FunnelStatusUdcModel from './FunnelStatusUdcModel';
import FunnelSplitEnvelope from './FunnelSplitEnvelope';
import ResultActions from 'models/ResultActions';

export default interface IFunnelPerformanceState {
  readonly data: FunnelSplitEnvelope;
  readonly dataStatus: FunnelStatusUdcModel;
  readonly splitType: any;
  readonly ResultActions: ResultActions;
  readonly error: boolean;
}
