import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class BrandByProdModel extends BaseModel {
  public brandID: number = 0;
  public brandName: string = '';

  constructor(data: Partial<BrandByProdModel>) {
    super();

    this.update(data);
  }
  public update(data: Partial<BrandByProdModel>): void {
    const conversionOptions: IConversionOption = {
      brandID: ConversionTypeEnum.Number,
      brandName: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
