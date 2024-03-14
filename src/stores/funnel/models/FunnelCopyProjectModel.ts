import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelCopyProjectModel extends BaseModel {
  funnelGenID: number = 0;
  funnelID: string = '';
  funnelStatusID: number = 0;
  dealCloseDate: Date;
  salesID: number = 0;
  customerName:string='';
  customerGenID: number = 0;
  endUserCustomerName:string='';
  endUserCustomerGenID: number = 0;
  customerPICID: number = 0;
  projectName: string = '';
  PICJobTitle: string = '';
  PICEmailAddr: string = '';
  PICMobilePhone: string = '';
  gpmPctg: number = 0;
  gpmAmount: number = 0;
  totalOrderingPriceProduct: number = 0;
  totalSellingPriceProduct: number = 0;
  totalOrderingPriceService: number = 0;
  totalSellingPriceService: number = 0;
  totalOrderingPrice: number = 0;
  totalSellingPrice: number = 0;
  currency: string = '';
  estDurationProject: number = 0;
  compellingEvent: string = '';
  customerBudget: number = 0;
  supportiveCoach: string = '';
  customerNeeds: string = '';
  competitor: string = '';
  presalesDeptID: string = '';
  preSalesDeptArr: string[] = [];
  pmoDeptID: boolean = false;
  smoDeptID: boolean = false;
  createUserID: number = 0;
  reqDedicatedResource: number = 0;
  presalesName: string = '';
  productManager: string = '';
  dept: string = '';
  softwareList: string = '';
  softwareArr: string[] = [];
  commercialWorkflow:string = '';
  serviceWorkflow:string = ''

  constructor(data: Partial<FunnelCopyProjectModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelCopyProjectModel>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      funnelID: ConversionTypeEnum.String,
      funnelStatusID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      customerGenID: ConversionTypeEnum.Number,
      endUserCustomerGenID: ConversionTypeEnum.Number,
      customerPICID: ConversionTypeEnum.Number,
      projectName: ConversionTypeEnum.String,
      PICJobTitle: ConversionTypeEnum.String,
      PICEmailAddr: ConversionTypeEnum.String,
      PICMobilePhone: ConversionTypeEnum.String,
      gpmPctg: ConversionTypeEnum.Float,
      gpmAmount: ConversionTypeEnum.Float,
      totalOrderingPriceProduct: ConversionTypeEnum.Float,
      totalSellingPriceProduct: ConversionTypeEnum.Float,
      totalOrderingPriceService: ConversionTypeEnum.Float,
      totalSellingPriceService: ConversionTypeEnum.Float,
      totalOrderingPrice: ConversionTypeEnum.Float,
      totalSellingPrice: ConversionTypeEnum.Float,
      currency: ConversionTypeEnum.String,
      estDurationProject: ConversionTypeEnum.Number,
      compellingEvent: ConversionTypeEnum.String,
      customerBudget: ConversionTypeEnum.Float,
      supportiveCoach: ConversionTypeEnum.String,
      customerNeeds: ConversionTypeEnum.String,
      competitor: ConversionTypeEnum.String,
      presalesDeptID: ConversionTypeEnum.String,
      pmoDeptID: ConversionTypeEnum.Boolean,
      smoDeptID: ConversionTypeEnum.Boolean,
      presalesName: ConversionTypeEnum.String,
      productManager: ConversionTypeEnum.String,
      reqDedicatedResource: ConversionTypeEnum.Number,
      dept: ConversionTypeEnum.String,
      softwareList: ConversionTypeEnum.String,
      commercialWorkflow: ConversionTypeEnum.String,
      serviceWorkflow: ConversionTypeEnum.String,

      //estStartProjectDate:ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
