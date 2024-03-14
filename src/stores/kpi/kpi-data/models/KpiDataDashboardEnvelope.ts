import { BaseModel } from 'sjs-base-model';
import KpiDataDashboardModel from './KpiDataDashboardModel';

export default class KpiDataDashboardEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: KpiDataDashboardModel[] = [];

  constructor(data: Partial<KpiDataDashboardEnvelope>) {
    super();
    this.update(data);
  }
}
