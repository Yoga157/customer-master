import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class GundamByEntryKeyModel extends BaseModel {
  udcid:number = 0;
  entryKey: string = '';
  text1: string = '';
  text2: string = '';
  text3: string = '';
  text4: string = '';
  text5: string = '';
  text6: string = '';
  text7: string = '';
  inum1: number = 0;
  
  constructor(data: Partial<GundamByEntryKeyModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<GundamByEntryKeyModel>): void {
    const conversionOptions: IConversionOption = {
      udcid: ConversionTypeEnum.Number,
      entryKey: ConversionTypeEnum.String,
      text1: ConversionTypeEnum.String,
      text2: ConversionTypeEnum.String,
      text3: ConversionTypeEnum.String,
      text4: ConversionTypeEnum.String,
      text5: ConversionTypeEnum.String,
      text6: ConversionTypeEnum.String,
      text7: ConversionTypeEnum.String,
      inum1:ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
