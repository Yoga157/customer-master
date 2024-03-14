import { BaseModel } from 'sjs-base-model';
import BankGaransiAdminModel from './BankGaransiAdminModel';

export default class FilterSearchModel extends BaseModel {
  public userLogin: string = '';
  public submitDateFrom?: Date = undefined;
  public submitDateTo?: Date = undefined;
  public bondType: string = '';
  public letterType: string = '';
  public creator: string = '';
  public effectiveDateFrom?: Date = undefined;
  public effectiveDateTo?: Date = undefined;
  public status: string = '';
  public customer: string = '';
  public division: string = '';
  public sorting: string = '';
  public page: number = 0;
  public column: string = '';
  public statusProject: string = '';
  public pageSize: number = 0;
  public flagExpire: number = 0;

  constructor(data: Partial<FilterSearchModel>) {
    super();
    this.update(data);
  }
}
