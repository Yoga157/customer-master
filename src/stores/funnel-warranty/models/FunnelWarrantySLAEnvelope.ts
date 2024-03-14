import FunnelWarrantySLAModel from './FunnelWarrantySLAModel';
import { BaseModel } from 'sjs-base-model';

export default class FunnelWarrantySLAEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: FunnelWarrantySLAModel[] = [];

  constructor(data: Partial<FunnelWarrantySLAEnvelope>) {
    super();
    this.update(data);
  }
}
