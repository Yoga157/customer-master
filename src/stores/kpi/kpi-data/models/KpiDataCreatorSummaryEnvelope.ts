import { BaseModel } from 'sjs-base-model';
import KpiDataCreatorSummaryModel from './KpiDataCreatorSummaryModel';

export default class KpiDataCreatorSummaryEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: KpiDataCreatorSummaryModel[] = [];

  constructor(data: Partial<KpiDataCreatorSummaryEnvelope>) {
    super();
    this.update(data);
  }
}
