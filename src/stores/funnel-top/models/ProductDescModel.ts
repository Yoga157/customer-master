import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ProductDescModel extends BaseModel {
  textData: string = '';
  valueData: number = 0;

  constructor(data: Partial<ProductDescModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ProductDescModel>): void {
    const conversionOptions: IConversionOption = {
      textData: ConversionTypeEnum.String,
      valueData: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
