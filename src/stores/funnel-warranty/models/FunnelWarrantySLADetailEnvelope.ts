import FunnelWarrantySLADetailModel from './FunnelWarrantySLADetailModel';
import { BaseModel } from 'sjs-base-model';

export default class FunnelWarrantySLADetailEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: FunnelWarrantySLADetailModel[] = [];

  constructor(data: Partial<FunnelWarrantySLADetailEnvelope>) {
    super();
    this.update(data);
  }
}
