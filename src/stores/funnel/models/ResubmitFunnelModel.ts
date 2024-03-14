import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ResubmitFunnelModel extends BaseModel {
  funnelGenID: number = 0;
  funnelID: string = '';
  funnelStatusID: number = 0;
  dealCloseDate: string = '';
  salesID: number = 0;
  customerGenID: number = 0;
  endUserCustomerGenID: number = 0;
  customerPICID: number = 0;
  projectName: string = '';
  gpmPctg: number = 0;
  gpmAmount: number = 0;
  totalOrderingPriceProduct: number = 0;
  totalSellingPriceProduct: number = 0;
  totalOrderingPriceService: number = 0;
  totalSellingPriceService: number = 0;
  totalOrderingPrice: number = 0;
  totalSellingPrice: number = 0;
  presalesDeptID: string = '';
  pmoDeptID: string = '';
  smoDeptID: string = '';
  createUserID: number = 0;
  reqDedicatedResource: number = 0;
  estStartProjectDate: Date;
  estEndProjectDate: Date;
  actStartProjectDate: Date;
  actEndProjectDate: Date;
  estDurationProject: number = 0;
  estDurationType: string = '';
  numOfMaxResource: number = 0;
  poCustomerNo: string = '';
  contractNo: string = '';
  totalCostProduct: number = 0;
  totalExpendProduct: number = 0;
  totalCostService: number = 0;
  totalExpendService: number = 0;
  so: string = '';
  currency: string = '';
  flagKontrakPayung: string = '';
  runRate: string = '';
  createDate: Date;
  modifyDate: Date;
  modifyUserID: number = 0;
  deliveryDate: Date;
  projectCategory: string = '';
  manDays: number = 0;
  flagContract: boolean | number = null;
  soDate: Date;
  oiNo: any = '';
  constructor(data: Partial<ResubmitFunnelModel>) {
    super({});
    this.update(data);
  }
}

// commerceWorkflow
