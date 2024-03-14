import { BaseModel } from 'sjs-base-model';

export default class FunnelInfoModel extends BaseModel {
    funnelGenID: number = 0;
    funnelID: number = 0;
    salesID: number = 0;
    salesName: string = '';
    deptID: any = 0;
    deptName: string = '';
    customerGenID: number = 0;
    customerName: string = '';
    projectName: string = '';
    totalOrderingPrice: number = 0;
    totalSellingPrice: number = 0;
    gpmPctg: number = 0;
    gpmAmount: number = 0;

  constructor(data: Partial<FunnelInfoModel>) {
    super();
    this.update(data);
  }

}
