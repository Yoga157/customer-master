import { BaseModel } from 'sjs-base-model';

export default class UsageAmountModel extends BaseModel {
  public customer: string = '';
  public dept: string = '';
  public usageAmount: number = 0;

  constructor(data: Partial<UsageAmountModel>) {
    super();
    this.update(data);
  }
}
