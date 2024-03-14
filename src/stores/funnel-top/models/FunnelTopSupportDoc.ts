import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class FunnelTopSupportDoc extends BaseModel {
  public udcid: number = 0;
  public text1: string = '';
  public text2: string = '';

  constructor(data: Partial<FunnelTopSupportDoc>) {
    super();

    this.update(data);
  }

  public update(data: Partial<FunnelTopSupportDoc>): void {
    const conversionOptions: IConversionOption = {
      udcid: ConversionTypeEnum.Number,
      text1: ConversionTypeEnum.String,
      text2: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
