import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ActivityTypeModel extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';

  constructor(data: Partial<ActivityTypeModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<ActivityTypeModel>): void {
    const conversionOptions: IConversionOption = {
      valueData: ConversionTypeEnum.Number,
      textData: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
