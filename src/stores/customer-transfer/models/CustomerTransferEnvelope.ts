import { CustomerTransferModel } from './CustomerTransferModel';
import { BaseModel } from 'sjs-base-model';

export default class CustomerTransferEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly funnels: CustomerTransferModel[] = [];

  constructor(data: Partial<CustomerTransferEnvelope>) {
    super();
    this.update(data);
  }
}
