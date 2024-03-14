import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class KpiDataRemarkModel extends BaseModel {
  id: number = 0;
  remark: string = '';
  employeeName: string = '';
  modifyUserID: string = '';
  modifyDate: string = '';

  constructor(data: Partial<KpiDataRemarkModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<KpiDataRemarkModel>) {
    const conversionOptions: IConversionOption = {
      id: ConversionTypeEnum.Number,
      remark: ConversionTypeEnum.String,
      employeeName: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.String,
      modifyDate: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
