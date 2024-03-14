import FunnelServiceCatalogModel from './FunnelServiceCatalogModel';
import FunnelServiceCatalogEnvelope from './FunnelServiceCatalogEnvelope';

export default interface IFunnelServiceCatalogState {
  readonly listData: FunnelServiceCatalogEnvelope;
  readonly firstData: FunnelServiceCatalogModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
}
