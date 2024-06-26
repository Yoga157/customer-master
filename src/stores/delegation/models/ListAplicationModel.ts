import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ListAplicationModel extends BaseModel {
  udcid:number = 0;
  entryKey: string = '';
  text1: string = '';
  text2: string = '';
  
  constructor(data: Partial<ListAplicationModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ListAplicationModel>): void {
    const conversionOptions: IConversionOption = {
      udcid: ConversionTypeEnum.Number,
      entryKey: ConversionTypeEnum.String,
      text1: ConversionTypeEnum.String,
      text2: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
