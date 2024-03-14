import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SearchProjectNameModel extends BaseModel {
    textData: string = '';
    valueData: string = '';

  constructor(data: Partial<SearchProjectNameModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<SearchProjectNameModel>): void {
    const conversionOptions: IConversionOption = {
        textData: ConversionTypeEnum.String,
        valueData: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
