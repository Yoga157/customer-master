import { BaseModel } from 'sjs-base-model';
import FunnelServiceCatalogDashboard from './FunnelServiceCatalogDashboard';

export default class FunnelServiceCatalogEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly totalPrice: number = 0;
  public readonly rows: FunnelServiceCatalogDashboard[] = [];

  constructor(data: Partial<FunnelServiceCatalogEnvelope>) {
    super();
    this.update(data);
  }
}
