import { BaseModel } from 'sjs-base-model';

export default class PaymentTypeModel extends BaseModel {
  public readonly valueData: string = '';
  public readonly textData: string = '';

  constructor(data: Partial<PaymentTypeModel>) {
    super();

    this.update(data);
  }
}
