import { BaseModel } from 'sjs-base-model';

export default class ListDashboardViewSalesModel extends BaseModel {
  public salesID: number = 0;
  public dept: string = '';
  public sales: string = '';
  public customerCreditAmount: number = 0;
  public actualCreditUsedAmount: number = 0;
  public remainingAmount: number = 0;

  constructor(data: Partial<ListDashboardViewSalesModel>) {
    super();
    this.update(data);
  }
}
