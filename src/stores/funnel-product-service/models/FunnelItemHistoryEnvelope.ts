import FunnelItemHistoryModel from './FunnelItemHistoryModel';
import { BaseModel } from 'sjs-base-model';

export default class FunnelItemHistoryEnvelope extends BaseModel {
  public historyDate: string = '';
  public historyList: FunnelItemHistoryModel[] = [];

  constructor(data: Partial<FunnelItemHistoryEnvelope>) {
    super();
    this.update(data);
  }
}
