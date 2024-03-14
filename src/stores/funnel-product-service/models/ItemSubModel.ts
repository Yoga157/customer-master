import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ItemSubModel extends BaseModel {
  valueData: number = 0;
  textData: string = '';
  flag: string = '';
  constructor(data: Partial<ItemSubModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ItemSubModel>): void {
    const conversionOptions: IConversionOption = {
      valueData: ConversionTypeEnum.Number,
      textData: ConversionTypeEnum.String,
      flag: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
