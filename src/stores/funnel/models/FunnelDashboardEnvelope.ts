import FunnelDashbordModel from './FunnelDashbordModel';
import { BaseModel } from 'sjs-base-model';

export default class FunnelDashboardEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly funnels: FunnelDashbordModel[] = [];
  public readonly totalSellingPriceSum: number = 0;
  public readonly totalOrderingItem: number = 0;
  public readonly totalSellingItem: number = 0;
  public readonly gpmAmountSum: number = 0;
  public readonly filter: any = null;
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly search: any = null;

  constructor(data: Partial<FunnelDashboardEnvelope>) {
    super();
    this.update(data);
  }
}
