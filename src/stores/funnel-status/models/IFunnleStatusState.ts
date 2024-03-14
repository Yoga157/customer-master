import FunnelStatusModel from './FunnelStatusModel';
import FunnelStatusUdcModel from './FunnelStatusUdcModel';

export default interface IFunnleStatusState {
  readonly data: FunnelStatusModel[];
  readonly dataStatus: FunnelStatusUdcModel;
  readonly error: boolean;
}
