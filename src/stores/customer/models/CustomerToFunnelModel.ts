import { BaseModel } from 'sjs-base-model';

export default class CustomerToFunnelModel extends BaseModel {
  public customerPICID: number = 0;
  public picEmailAddr: string = '';
  public picJobTitle: string = '';
  public picMobilePhone: string = '';

  constructor(data: Partial<CustomerToFunnelModel>) {
    super();
    this.update(data);
  }
}
