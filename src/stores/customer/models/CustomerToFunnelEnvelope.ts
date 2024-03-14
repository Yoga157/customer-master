import { BaseModel } from 'sjs-base-model';
import CustomerToFunnelModel from './CustomerToFunnelModel';

export default class CustomerToFunnelEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: CustomerToFunnelModel[] = [];

  constructor(data: Partial<CustomerToFunnelEnvelope>) {
    super();
    this.update(data);
  }
}
