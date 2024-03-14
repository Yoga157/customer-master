import FunnelTopEnvelope from './FunnelTopEnvelope';
import FunnelTopHistoryEnvelope from './FunnelTopHistoryEnvelope';
import FunnelTopItem from './FunnelTopItem';
import FunnelTopSupportDoc from './FunnelTopSupportDoc';
import FunnelTopType from './FunnelTopType';
import ProductDescModel from './ProductDescModel';
import SearchTopNumberModel from './SearchTopNumberModel';
import TopServiceOfObjModel from './TopServiceOfObjModel';

export default interface IFunnelTopState {
  readonly dataProductDesc: ProductDescModel[];
  readonly searchTopNumber: SearchTopNumberModel[];
  readonly listData: FunnelTopEnvelope;
  readonly listDataAll: FunnelTopEnvelope;
  readonly firstData: TopServiceOfObjModel;
  readonly listTopItem: FunnelTopItem[];
  readonly listSupportingDoc: FunnelTopSupportDoc[];
  readonly listTopType: FunnelTopType[];
  readonly funnelTopHistory: FunnelTopHistoryEnvelope[];
  readonly setPage: number;
  readonly error: boolean;
  readonly refreshPage: boolean;
  readonly resultActions: any;
}
