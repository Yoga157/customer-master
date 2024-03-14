import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelDashboardModel extends BaseModel {
  funnelGenID: number = 0;
  funnelID: string = '';
  salesID: number = 0;
  salesName: string = '';
  presalesName: string = '';
  productManager: string = '';
  customerName: string = '';
  projectName: string = '';
  totalSellingPrice: number = 0;
  totalOrderingItem: number = 0;
  totalSellingItem: number = 0;
  gpmPctg: number = 0;
  gpmAmount: number = 0;
  dealCloseDate: string = '';
  createDate: string = '';
  funnelStatus: string = '';
  customerGenID: number = 0;
  dept: string = '';
  commercialWorkflowStatus: string = '';
  serviceWorkflowStatus: string = '';
  flagSA: number = 0;
  flagOpen: string = '';
  soidc: string = '';
  soParent: string = '';
  saDate: string = '';
  saNumber: string = '';
  currency: string = '';
  rate: number = 0;
  reassignFlag: number = 0;
  stepName: string = '';
  flagManual: string = '';
  lastNotesActivityPrevWeek: string = '';
  lastNotesActivityThisWeek: string = '';
  reopenProjectStatusApproval: string = '';

  constructor(data: Partial<FunnelDashboardModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelDashboardModel>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      salesName: ConversionTypeEnum.String,
      presalesName: ConversionTypeEnum.String,
      customerName: ConversionTypeEnum.String,
      projectName: ConversionTypeEnum.String,
      totalSellingPrice: ConversionTypeEnum.Number,
      gpmPctg: ConversionTypeEnum.Number,
      gpmAmount: ConversionTypeEnum.Number,
      dealCloseDate: ConversionTypeEnum.String,
      createDate: ConversionTypeEnum.String,
      funnelStatus: ConversionTypeEnum.String,
      customerGenID: ConversionTypeEnum.Number,
      commercialWorkflowStatus: ConversionTypeEnum.String,
      serviceWorkflowStatus: ConversionTypeEnum.String,
      currency: ConversionTypeEnum.String,
      rate: ConversionTypeEnum.Number,
      reassignFlag: ConversionTypeEnum.Number,
      stepName: ConversionTypeEnum.String,
      flagManual: ConversionTypeEnum.String,
      lastNotesActivityThisWeek: ConversionTypeEnum.String,
      lastNotesActivityPrevWeek: ConversionTypeEnum.String,
      reopenProjectStatusApproval: ConversionTypeEnum.String
    };

    super.update(data, conversionOptions);
  }
}
