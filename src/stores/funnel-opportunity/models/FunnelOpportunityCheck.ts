import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class CheckOpportunity extends BaseModel {
  customerGenID: number = 0;
  salesID: number = 0;
  brandID: string = '';

  constructor(data: Partial<CheckOpportunity>) {
    super();

    this.update(data);
  }

  public update(data: Partial<CheckOpportunity>): void {
    const conversionOptions: IConversionOption = {
      customerGenID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      brandID: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
