import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class KpiDataDetailPointModel extends BaseModel {
  docno: string = '';
  emplid: number = 0;
  udcid: number = 0;
  doctype: string = '';
  creator: string = '';
  remark: string = '';
  remaks: string = '';
  bu: string = '';
  startDate: string = '';
  endDate: string = '';
  customer: string = '';
  point: number = 0;
  rnum2: number = 0;
  id: number = 0;
  modifyUserID: number = 0;

  constructor(data: Partial<KpiDataDetailPointModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<KpiDataDetailPointModel>) {
    const conversionOptions: IConversionOption = {
      docno: ConversionTypeEnum.String,
      emplid: ConversionTypeEnum.Number,
      id: ConversionTypeEnum.Number,
      udcid: ConversionTypeEnum.Number,
      doctype: ConversionTypeEnum.String,
      creator: ConversionTypeEnum.String,
      remark: ConversionTypeEnum.String,
      bu: ConversionTypeEnum.String,
      customer: ConversionTypeEnum.String,
      startDate: ConversionTypeEnum.String,
      endDate: ConversionTypeEnum.String,
      remaks: ConversionTypeEnum.String,
      point: ConversionTypeEnum.Number,
      rnum2: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
