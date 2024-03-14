import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class FunnelTopType extends BaseModel {
  public udcid: number = 0;
  public text1: string = '';
  public text2: string = '';

  constructor(data: Partial<FunnelTopType>) {
    super();

    this.update(data);
  }

  public update(data: Partial<FunnelTopType>): void {
    const conversionOptions: IConversionOption = {
      udcid: ConversionTypeEnum.Number,
      text1: ConversionTypeEnum.String,
      text2: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
