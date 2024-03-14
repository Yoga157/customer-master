import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class CostType extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';

  constructor(data: Partial<CostType>) {
    super();

    this.update(data);
  }

  public update(data: Partial<CostType>): void {
    const conversionOptions: IConversionOption = {
      valueData: ConversionTypeEnum.Number,
      textData: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
