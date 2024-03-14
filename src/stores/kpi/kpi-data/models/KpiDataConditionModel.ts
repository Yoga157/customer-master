import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class KpiDataConditionModel extends BaseModel {
  kpiConditionID: number = 0;
  point: number = 0;
  description: string = '';
  kpiSettingId: number = 0;

  constructor(data: Partial<KpiDataConditionModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<KpiDataConditionModel>) {
    const conversionOptions: IConversionOption = {
      point: ConversionTypeEnum.Number,
      kpiConditionID: ConversionTypeEnum.Number,
      kpiSettingId: ConversionTypeEnum.Number,
      description: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
