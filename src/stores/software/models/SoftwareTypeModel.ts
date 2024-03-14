import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SoftwareTypeModel extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';

  constructor(data: Partial<SoftwareTypeModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<SoftwareTypeModel>): void {
    const conversionOptions: IConversionOption = {
      valueData: ConversionTypeEnum.Number,
      textData: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
