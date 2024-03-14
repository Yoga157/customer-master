import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ServiceItemModel extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';
  public readonly flag: string = '';

  constructor(data: Partial<ServiceItemModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<ServiceItemModel>): void {
    const conversionOptions: IConversionOption = {
      valueData: ConversionTypeEnum.Number,
      textData: ConversionTypeEnum.String,
      flag: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
