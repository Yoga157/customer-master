import { BaseModel } from 'sjs-base-model';
import FunnelTopHistoryModel from './FunnelTopHistoryModel';

export default class FunnelTopHistoryEnvelope extends BaseModel {
  public historyDate: string = '';
  public historyList: FunnelTopHistoryModel[] = [];

  constructor(data: Partial<FunnelTopHistoryEnvelope>) {
    super();
    this.update(data);
  }
}
