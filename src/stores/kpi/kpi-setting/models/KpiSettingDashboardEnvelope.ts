import { BaseModel } from 'sjs-base-model';
import KpiSettingDashboardModel from './KpiSettingDashboardModel';

export default class KpiSettingDashboardEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: KpiSettingDashboardModel[] = [];
  // public readonly filter:any = null;
  // public readonly column:string = "";
  // public readonly sorting:string = "";
  // public readonly search:any = null;

  constructor(data: Partial<KpiSettingDashboardEnvelope>) {
    super();
    this.update(data);
  }
}
