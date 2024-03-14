import { BaseModel } from 'sjs-base-model';
import UsageDetailModel from './UsageDetailModel';

export default class UsageDetailEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: UsageDetailModel[] = [];

  constructor(data: Partial<UsageDetailEnvelope>) {
    super();
    this.update(data);
  }
}
