import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelSoftware extends BaseModel {
  funnelGenID: number = 0;
  businessSoftware: string = '';
  infrastructureSoftware: string = '';
  programmingSoftware: string = '';
  operatingSystem: string = '';
  database: string = '';
  userLoginID: number = 0;

  constructor(data: Partial<FunnelSoftware>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelSoftware>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      businessSoftware: ConversionTypeEnum.String,
      infrastructureSoftware: ConversionTypeEnum.String,
      programmingSoftware: ConversionTypeEnum.String,
      operatingSystem: ConversionTypeEnum.String,
      database: ConversionTypeEnum.String,
      userLoginID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
