import { BaseModel } from 'sjs-base-model';

export default class CreditSourceModel extends BaseModel {
  public funnelGenID: number = 0;
  public customer: any = '';
  public creditAmount: number = 0;
  public createdDate: any = '';
  public createdBy: string = '';
  public modifiedDate: any = '';
  public modifiedBy: any = '';

  constructor(data: Partial<CreditSourceModel>) {
    super();
    this.update(data);
  }
}
