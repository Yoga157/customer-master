import FunnelWarrantySLAModel from './FunnelWarrantySLAModel';
import FunnelWarrantySLADetailModel from './FunnelWarrantySLADetailModel';

export default class FunnelsModel {
  public SalesWarrantySLA: FunnelWarrantySLAModel = new FunnelWarrantySLAModel({});
  public SalesWarrantySLADetail: FunnelWarrantySLADetailModel[] = [];
}
