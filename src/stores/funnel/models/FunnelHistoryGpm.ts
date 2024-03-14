import FunnelHistoryGpmModel from './FunnelHistoryGpmModel';
import { BaseModel } from 'sjs-base-model';

export default class FunnelHistoryGpm extends BaseModel {
  public totalRows: number = 0;
  public rows: FunnelHistoryGpmModel[] = [];

  constructor(data: Partial<FunnelHistoryGpm>) {
    super();
    this.update(data);
  }
}
