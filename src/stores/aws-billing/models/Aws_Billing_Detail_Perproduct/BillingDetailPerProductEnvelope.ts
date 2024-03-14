import BillingDetailPerProductModel from './BillingDetailPerProductModel';
import { BaseModel } from 'sjs-base-model';
import AWSBillingDetailPerProductModel from './AWSBillingDetailPerProductModel';

export default class BillingDetailPerProductEnvelope extends BaseModel {
  public readonly totalAmount: number = 0;
  public readonly awsBillingDetail: AWSBillingDetailPerProductModel[]

  constructor(data: Partial<BillingDetailPerProductEnvelope>) {
    super();
    this.update(data);
  }
}
