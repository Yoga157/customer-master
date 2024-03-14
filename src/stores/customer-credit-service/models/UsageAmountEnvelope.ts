import { BaseModel } from 'sjs-base-model';
import UsageAmountModel from './UsageAmountModel';

export default class UsageAmountEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: UsageAmountModel[] = [];

  constructor(data: Partial<UsageAmountEnvelope>) {
    super();
    this.update(data);
  }
}
