import FunnelWarrantySLADetailEnvelope from './FunnelWarrantySLADetailEnvelope';
import FunnelWarrantySLAEnvelope from './FunnelWarrantySLAEnvelope';
import FunnelWarrantySLADetailModel from './FunnelWarrantySLADetailModel';
import FunnelWarrantySLAModel from './FunnelWarrantySLAModel';
import FunnelWarrantySupportModel from './FunnelWarrantySupportModel';
import ResultActions from 'models/ResultActions';

export default interface IFunnelWarrantySLAState {
  readonly data: FunnelWarrantySLADetailModel[];
  readonly listData: FunnelWarrantySLADetailEnvelope;
  readonly listDataSLA: FunnelWarrantySLAEnvelope;
  readonly firstData: FunnelWarrantySLADetailModel;
  readonly firstDataSLA: FunnelWarrantySLAModel;
  readonly firstDataSupport: FunnelWarrantySupportModel;
  readonly firstDataSLADetail: FunnelWarrantySLADetailModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
  readonly resultActions: ResultActions;
}
