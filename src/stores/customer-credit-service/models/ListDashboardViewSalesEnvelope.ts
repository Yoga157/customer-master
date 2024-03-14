import { BaseModel } from 'sjs-base-model';
import ListDashboardViewSalesModel from './ListDashboardViewSalesModel';

export default class ListDashboardViewSales extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: ListDashboardViewSalesModel[] = [];

  constructor(data: Partial<ListDashboardViewSales>) {
    super();
    this.update(data);
  }
}
