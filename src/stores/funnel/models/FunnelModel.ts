import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelModel extends BaseModel {
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
  compellingEvent: string = '';
  customerBudget: number = 0;
  supportiveCoach: string = '';
  customerNeeds: string = '';
  competitor: string = '';
  presalesDeptID: string = '';
  preSalesDeptArr: string[] = [];
  pmoDeptID: string = '';
  smoDeptID: string = '';
  soidc: string = '';
  createUserID: number = 0;
  reqDedicatedResource: number = 0;
  presalesName: string = '';
  productManager: string = '';
  dept: string = '';
  softwareList: string = '';
  softwareArr: string[] = [];
  commercialWorkflowStatus:string = '';
  serviceWorkflowStatus:string = '';
  openProjectSAWorkflowStatus:string = '';
  openProjectSAWorkflow:string = '';
  commercialWorkflow:string = '';
  serviceWorkflow:string = ''
  currency:string = ''
  rate: number = 0;
  estDurationProject: number = 0;
  estDurationType: string = '';
  salesAdmin: string = '';
  projectCategory: string = '';
  referTo: string = '';

  constructor(data: Partial<FunnelModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelModel>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      funnelID: ConversionTypeEnum.String,
      funnelStatusID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      customerGenID: ConversionTypeEnum.Number,
      endUserCustomerGenID: ConversionTypeEnum.Number,
      customerPICID: ConversionTypeEnum.Number,
      projectName: ConversionTypeEnum.String,
      gpmPctg: ConversionTypeEnum.Float,
      gpmAmount: ConversionTypeEnum.Float,
      totalOrderingPriceProduct: ConversionTypeEnum.Float,
      totalSellingPriceProduct: ConversionTypeEnum.Float,
      totalOrderingPriceService: ConversionTypeEnum.Float,
      totalSellingPriceService: ConversionTypeEnum.Float,
      totalOrderingPrice: ConversionTypeEnum.Float,
      totalSellingPrice: ConversionTypeEnum.Float,
      compellingEvent: ConversionTypeEnum.String,
      customerBudget: ConversionTypeEnum.Float,
      supportiveCoach: ConversionTypeEnum.String,
      customerNeeds: ConversionTypeEnum.String,
      competitor: ConversionTypeEnum.String,
      presalesDeptID: ConversionTypeEnum.String,
      pmoDeptID: ConversionTypeEnum.String,
      smoDeptID: ConversionTypeEnum.String,
      soidc: ConversionTypeEnum.String,
      presalesName: ConversionTypeEnum.String,
      productManager: ConversionTypeEnum.String,
      reqDedicatedResource: ConversionTypeEnum.Number,
      dept: ConversionTypeEnum.String,
      softwareList: ConversionTypeEnum.String,
      commercialWorkflowStatus: ConversionTypeEnum.String,
      serviceWorkflowStatus: ConversionTypeEnum.String,
      openProjectSAWorkflowStatus: ConversionTypeEnum.String,
      openProjectSAWorkflow: ConversionTypeEnum.String,
      commercialWorkflow: ConversionTypeEnum.String,
      serviceWorkflow: ConversionTypeEnum.String,
      currency: ConversionTypeEnum.String,
      rate: ConversionTypeEnum.Number,
      estDurationProject: ConversionTypeEnum.Number,
      estDurationType: ConversionTypeEnum.String,
      salesAdmin: ConversionTypeEnum.String,
      projectCategory: ConversionTypeEnum.String,
      referTo: ConversionTypeEnum.String,
      //estStartProjectDate:ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
