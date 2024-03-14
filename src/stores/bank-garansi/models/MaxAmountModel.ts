import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class MaxAmountModel extends BaseModel {
  nilai: string = '';

  constructor(data: Partial<MaxAmountModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<MaxAmountModel>): void {
    const conversionOptions: IConversionOption = {
        nilai: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
