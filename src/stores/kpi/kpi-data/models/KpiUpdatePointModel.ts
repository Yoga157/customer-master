import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class KpiUpdatePointModel extends BaseModel {
  udcid: number = 0;
  emplid: number = 0;
  year: number = 0;
  userlogin: number = 0;
  measurementNumber: string = '';
  fileName: string = '';
  remark: string = '';
  point: number = 0;

  constructor(data: Partial<KpiUpdatePointModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<KpiUpdatePointModel>) {
    const conversionOptions: IConversionOption = {
      udcid: ConversionTypeEnum.Number,
      emplid: ConversionTypeEnum.Number,
      year: ConversionTypeEnum.Number,
      userlogin: ConversionTypeEnum.Number,
      measurementNumber: ConversionTypeEnum.String,
      fileName: ConversionTypeEnum.String,
      remark: ConversionTypeEnum.String,
      point: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
