import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SearchTopNumberModel extends BaseModel {
  textData: string = '';
  valueData: string = '';

  constructor(data: Partial<SearchTopNumberModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<SearchTopNumberModel>): void {
    const conversionOptions: IConversionOption = {
      textData: ConversionTypeEnum.String,
      valueData: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}