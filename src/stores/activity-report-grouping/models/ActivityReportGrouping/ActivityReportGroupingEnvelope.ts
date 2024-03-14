import { BaseModel } from 'sjs-base-model';
import ActivityReportGroupingModel from './ActivityReportGroupingModel';

export default class ActivityReportGroupingEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: ActivityReportGroupingModel[];
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly search: any = null;
  public readonly filter: any = null;

  constructor(data: Partial<ActivityReportGroupingEnvelope>) {
    super();
    this.update(data);
  }
}
