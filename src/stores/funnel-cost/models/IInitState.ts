import FunnelItemHistoryEnvelope from 'stores/funnel-product-service/models/FunnelItemHistoryEnvelope';
import CostTypeModel from './CostTypeModel';
import FunnelCostHistoryEnvelope from './FunnelCostHistoryEnvelope';

export default interface IUserState {
  readonly dropdownCOF: any[];
  readonly persenCOF: any[];
  readonly costType: any[];
  readonly costName: any[];
  readonly listData: any;
  readonly pmtData: any;
    readonly totalPMT: any;
  readonly error: boolean;
  readonly refreshPage: boolean;
  readonly resultActions: any[];
  readonly rowTable: any[];
  readonly finish: boolean;
  readonly funnelCostHistory: FunnelCostHistoryEnvelope[];
}
