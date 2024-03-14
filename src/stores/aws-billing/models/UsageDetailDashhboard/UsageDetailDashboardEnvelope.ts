import UsageDetailDashboardModel from './UsageDetailDashboardModel';
import { BaseModel } from 'sjs-base-model';

export default class UsageDetailDashboardEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: UsageDetailDashboardModel[];
  public readonly column: string = '';
  public readonly sorting: string = '';

  constructor(data: Partial<UsageDetailDashboardEnvelope>) {
    super();
    this.update(data);
  }
}
