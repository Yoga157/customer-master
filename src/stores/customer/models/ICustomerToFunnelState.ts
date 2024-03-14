import CustomerToFunnelModel from './CustomerToFunnelModel';
import CustomerToFunnelEnvelope from './CustomerToFunnelEnvelope';

export default interface ICustomerToFunnelState {
  readonly listData: CustomerToFunnelEnvelope;
  readonly firstData: CustomerToFunnelModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
}
