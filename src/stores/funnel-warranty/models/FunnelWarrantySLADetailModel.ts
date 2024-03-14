import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelWarrantySLADetailModel extends BaseModel {
  warrantySLADetailID: number = 0;
  warrantySLAGenID: number = 0;
  slaType: string = '';
  productNumber: string = '';
  serviceLocation: string = '';
  coverageHour: string = '';
  responseTime: string = '';
  resolutionTime: string = '';
  createUserID: number = 0;
  createDate?: Date = undefined;

  constructor(data: Partial<FunnelWarrantySLADetailModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelWarrantySLADetailModel>): void {
    const conversionOptions: IConversionOption = {
      warrantySLADetailID: ConversionTypeEnum.Number,
      warrantySLAGenID: ConversionTypeEnum.Number,
      slaType: ConversionTypeEnum.String,
      productNumber: ConversionTypeEnum.String,
      serviceLocation: ConversionTypeEnum.String,
      coverageHour: ConversionTypeEnum.String,
      responseTime: ConversionTypeEnum.String,
      resolutionTime: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
