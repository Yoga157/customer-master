import { BaseModel } from 'sjs-base-model';
import KpiDataDetailPointModel from './KpiDataDetailPointModel';

export default class KpiDataDetailPointEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly totalPoint: number = 0;
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly rows: KpiDataDetailPointModel[] = [];

  constructor(data: Partial<KpiDataDetailPointEnvelope>) {
    super();
    this.update(data);
  }
}
