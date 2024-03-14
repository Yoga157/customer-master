import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class FunnelTopItem extends BaseModel {
  public udcid: number = 0;
  public text1: string = '';
  public text2: string = '';

  constructor(data: Partial<FunnelTopItem>) {
    super();

    this.update(data);
  }

  public update(data: Partial<FunnelTopItem>): void {
    const conversionOptions: IConversionOption = {
      udcid: ConversionTypeEnum.Number,
      text1: ConversionTypeEnum.String,
      text2: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
