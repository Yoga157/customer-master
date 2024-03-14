import { BaseModel } from 'sjs-base-model';
import KpiDataRemarkModel from './KpiDataRemarkModel';

export default class KpiDataRemarkEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: KpiDataRemarkModel[] = [];

  constructor(data: Partial<KpiDataRemarkEnvelope>) {
    super();
    this.update(data);
  }
}
