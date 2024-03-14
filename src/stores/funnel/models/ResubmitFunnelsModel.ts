import ProductServiceModel from '../../funnel-product-service/models/ProductServiceModel';
import RowData from 'stores/funnel-cost/models/TableRowModel';
import TopServiceModel from 'stores/funnel-top/models/TopServiceModel';
import ResubmitFunnelModel from './ResubmitFunnelModel';
import ResubmitFunnelHeaderNameModel from './ResubmitFunnelHeaderNameModel';
import FunnelSplitListLocalModel from 'stores/funnel-split-performance/models/FunnelSplitListLocalModel';

export default class ResubmitFunnelsModel {
  public remark: string = '';
  public SalesFunnel: ResubmitFunnelModel = new ResubmitFunnelModel({});
  public FunnelHeaderName: ResubmitFunnelHeaderNameModel = new ResubmitFunnelHeaderNameModel({});
  public SalesFunnelItems: ProductServiceModel[] = [];
  public salesFunnelCost: RowData[] = [];
  public salesFunnelTop: TopServiceModel[] = [];
  public salesFunnelSplitPerformance: FunnelSplitListLocalModel[] = [];
}
