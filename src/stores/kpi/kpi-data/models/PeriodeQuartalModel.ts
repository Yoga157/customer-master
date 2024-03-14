import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class KpiUpdatePointModel extends BaseModel {
  startDate: string = '';
  endDate: string = '';
  nextMonth: string = '';

  constructor(data: Partial<KpiUpdatePointModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<KpiUpdatePointModel>) {
    const conversionOptions: IConversionOption = {
      startDate: ConversionTypeEnum.String,
      endDate: ConversionTypeEnum.String,
      nextMonth: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
