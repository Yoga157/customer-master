import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelViewEditCustomerPO extends BaseModel {
  funnelGenID: number = 0;
  poCustomerNo: string = '';
  poCustomerDate?: Date = undefined;
  contractNo: string = '';
  contractStartDate?: Date = undefined;
  contractEndDate?: Date = undefined;
  sa: string = '';
  so: string = '';
  modifyUserID: number = 0;
  soidc: string = '';
  soParent: string = '';
  oiNo: string = '';
  flagKontrakPayung: string = '';
  runRate: string = '';
  flagRunRate: number = 0;
  flagContract: boolean | number = null;
  dept: string = '';
  soDate?: Date = undefined;
  flagManual: string = '';
  
  constructor(data: Partial<FunnelViewEditCustomerPO>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelViewEditCustomerPO>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      poCustomerNo: ConversionTypeEnum.String,
      contractNo: ConversionTypeEnum.String,
      sa: ConversionTypeEnum.String,
      so: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.Number,
      soidc: ConversionTypeEnum.String,
      soParent: ConversionTypeEnum.String,
      oiNo: ConversionTypeEnum.String,
      flagKontrakPayung: ConversionTypeEnum.String,
      runRate: ConversionTypeEnum.String,
      flagRunRate: ConversionTypeEnum.Number,
      dept: ConversionTypeEnum.String,
      flagManual: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
