import FunnelModel from './FunnelModel';
//import SalesFunnelActivityModel from "./SalesFunnelActivityModel";
import ProductServiceModel from '../../funnel-product-service/models/ProductServiceModel';
import FunnelHeaderNameModel from './FunnelHeaderNameModel';
import AttachmentModel from 'stores/attachment/models/AttachmentModel';
import RowData from 'stores/funnel-cost/models/TableRowModel';
import TopServiceModel from 'stores/funnel-top/models/TopServiceModel';

export default class FunnelsModel {
  public SalesFunnel: FunnelModel = new FunnelModel({});
  public SalesFunnelItems: ProductServiceModel[] = [];
  public FileFunnelAttachment: AttachmentModel[] = [];
  public salesFunnelCost: RowData[] = [];
  public salesFunnelTop: TopServiceModel[] = [];
  //public SalesFunnelActivity:SalesFunnelActivityModel[] = [];
  public FunnelHeaderName: FunnelHeaderNameModel = new FunnelHeaderNameModel({});
}
