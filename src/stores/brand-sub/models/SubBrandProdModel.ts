import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class SubBrandProdModel extends BaseModel {
  public brandID: number = 0;
  public subBrandID: number = 0;
  public subBrandName: string = '';

  constructor(data: Partial<SubBrandProdModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<SubBrandProdModel>): void {
    const conversionOptions: IConversionOption = {
      brandID: ConversionTypeEnum.Number,
      subBrandID: ConversionTypeEnum.Number,
      subBrandName: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
