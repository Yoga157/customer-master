import { BaseModel } from 'sjs-base-model';

export default class FunnelHistoryGpmModel extends BaseModel {
  public totalCostProduct: number = 0;
  public totalSellingProduct: number = 0;
  public totalCostService: number = 0;
  public totalSellingService: number = 0;
  public totalExpendProduct: number = 0;
  public totalExpendService: number = 0;
  public gpmProduct: number = 0;
  public gpmService: number = 0;
  public gpmAmount: number = 0;
  public gpmPercentage: number = 0;
  public createDate: string = '';
  public remark: string = '';

  constructor(data: Partial<FunnelHistoryGpmModel>) {
    super();
    this.update(data);
  }
}
