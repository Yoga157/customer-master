import { BaseModel } from 'sjs-base-model';
import FunnelCostHistoryModel from './FunnelCostHistoryModel';

export default class FunnelCostHistoryEnvelope extends BaseModel {
  public historyDate: string = '';
  public historyList: FunnelCostHistoryModel[] = [];

  constructor(data: Partial<FunnelCostHistoryEnvelope>) {
    super();
    this.update(data);
  }
}
