import { BaseModel } from 'sjs-base-model';
import CBVUsageDetailDashboard from './CBVUsageDetailDashboard';

export default class CBVUsageDetailEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly totalCBVAmount: number = 0;
  public readonly totalUsedAmount: number = 0;
  public readonly totalRemainingAmount: number = 0;
  public readonly rows: CBVUsageDetailDashboard[] = [];
  public readonly column: string = '';
  public readonly sorting: string = '';

  constructor(data: Partial<CBVUsageDetailEnvelope>) {
    super();
    this.update(data);
  }
}
