import { BaseModel } from 'sjs-base-model';
import KpiDataDashboardDeptModel from './KpiDataDashboardDeptModel';

export default class KpiDataDashboardDeptEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: KpiDataDashboardDeptModel[] = [];

  constructor(data: Partial<KpiDataDashboardDeptEnvelope>) {
    super();
    this.update(data);
  }
}
