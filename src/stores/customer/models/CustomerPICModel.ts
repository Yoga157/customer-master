import { BaseModel } from 'sjs-base-model';

export default class CustomerPICModel extends BaseModel {
  public customerPICID: number = 0;
  public customerGenID: number = 0;
  public customerInfoID: number = 0;
  public salesID: number = 0;
  public picName: string = '';
  public picMobilePhone: string = '';
  public picEmailAddr: string = '';
  public picJobTitle: string = '';
  public createUserID: number = 0;

  constructor(data: Partial<CustomerPICModel>) {
    super();
    this.update(data);
  }
}
