import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class CostName extends BaseModel {
  public id: number = 0;
  public name: string = '';
  public costTypeID: number = 0;
  public createUserID: number = 0;

  constructor(data: Partial<CostName>) {
    super();

    this.update(data);
  }

  public update(data: Partial<CostName>): void {
    const conversionOptions: IConversionOption = {
      id: ConversionTypeEnum.Number,
      name: ConversionTypeEnum.String,
      costTypeID: ConversionTypeEnum.Number,
      createUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
