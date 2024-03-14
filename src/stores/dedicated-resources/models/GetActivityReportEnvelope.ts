import DedicatedResourcesModel from './DedicatedResourcesModel';
import { BaseModel } from 'sjs-base-model';
import GetActivityReportModel from './GetActivityReportModel';

export default class GetActivityReportEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: GetActivityReportModel[];
  public readonly column: any = null;
  public readonly sorting: any = null;

  constructor(data: Partial<GetActivityReportEnvelope>) {
    super();
    this.update(data);
  }
}
