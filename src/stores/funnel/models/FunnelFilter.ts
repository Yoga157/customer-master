import { BaseModel } from 'sjs-base-model';

export default class FunnelFilter extends BaseModel {
  funnelStatusID: string = '';
  commerceWorkflowStatus: string = '';
  serviceWorkflowStatus: string = '';
  dealCloseDateStart?: Date = undefined;
  dealCloseDateEnd?: Date = undefined;
  dealCloseDateStartConvert: string = '';
  dealCloseDateEndConvert: string = '';
  salesID: string = '';
  customerGenID: string = '';
  dept: string = '';
  itemID: string = '';
  totalSellingPriceMin: number = 0;
  totalSellingPriceMax: number = 0;
  page: number = 0;
  pageSize: number = 0;
  userLoginID: number = 0;
  role: string = '';
  column: string = '';
  sorting: string = '';
  type: string = '';
  salesAdmin: string = '';

  constructor(data: Partial<FunnelFilter>) {
    super();
    this.update(data);
  }
}
