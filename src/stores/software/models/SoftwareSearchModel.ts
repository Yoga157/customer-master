import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SoftwareSearchModel extends BaseModel {
  valueData: number = 0;
  textData: string = '';

  constructor(data: Partial<SoftwareSearchModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<SoftwareSearchModel>): void {
    const conversionOptions: IConversionOption = {
      valueData: ConversionTypeEnum.Number,
      textData: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
