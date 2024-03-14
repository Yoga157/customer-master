import { BaseModel } from 'sjs-base-model';

export default class UsageDetailModel extends BaseModel {
  public customerCreditServiceID: number = 0;
  public presalesID: number = 0;
  public ticketNumber: string = '';
  public ticketTitle: string = '';
  public presalesName: string = '';
  public customer: string = '';
  public dept: string = '';
  public category: string = '';
  public description: string = '';
  public ticketDate: string = '';
  public resource: string = '';
  public status: string = '';
  public notes: string = '';
  public price: number = 0;
  public createdDate: string = '';
  public createdBy: string = '';
  public modifiedDate: string = '';
  public modifiedBy: string = '';
  public customerCreditAmount: number = 0;
  public salesID: number = 0;
  public complexity: string = '';

  constructor(data: Partial<UsageDetailModel>) {
    super();
    this.update(data);
  }
}
