import SalesFunnelHistoryModel from './SalesFunnelHistoryModel';
import { BaseModel } from 'sjs-base-model';

export default class FunnelHistoryEnvelope extends BaseModel {
  public historyDate: string = '';
  public historyList: SalesFunnelHistoryModel[] = [];

  constructor(data: Partial<FunnelHistoryEnvelope>) {
    super();
    this.update(data);
  }
}
