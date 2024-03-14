import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class BrandModel extends BaseModel {
  public brandID: number = 0;
  public brandName: string = '';
  public productManager: string = '';
  public portfolio: number = 0;

  constructor(data: Partial<BrandModel>) {
    super();

    this.update(data);
  }
  public update(data: Partial<BrandModel>): void {
    const conversionOptions: IConversionOption = {
      brandID: ConversionTypeEnum.Number,
      brandName: ConversionTypeEnum.String,
      productManager: ConversionTypeEnum.String,
      portfolio: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
