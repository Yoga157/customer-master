import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelBrandModel extends BaseModel {
  brandID: number = 0;
  brandName: string = '';

  constructor(data: Partial<FunnelBrandModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelBrandModel>): void {
    const conversionOptions: IConversionOption = {
      brandID: ConversionTypeEnum.Number,
      brandName: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
