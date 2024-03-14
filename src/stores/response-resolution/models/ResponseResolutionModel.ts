import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ResponseResolutionModel extends BaseModel {
  udcid: number = 0;
  entryKey: string = '';
  text1: string = '';

  constructor(data: Partial<ResponseResolutionModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ResponseResolutionModel>): void {
    const conversionOptions: IConversionOption = {
      udcid: ConversionTypeEnum.Number,
      entryKey: ConversionTypeEnum.String,
      text1: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
