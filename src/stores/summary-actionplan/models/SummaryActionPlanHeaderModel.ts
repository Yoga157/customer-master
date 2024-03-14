import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SummaryActionPlanHeaderModel extends BaseModel {
  public quotaGPM: number = 0;
  public month: string = '';
  public performanceGPM: number = 0;
  public gapGPM: number = 0;
  public lastActionPlan: string = '';

  constructor(data: Partial<SummaryActionPlanHeaderModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<SummaryActionPlanHeaderModel>): void {
    const conversionOptions: IConversionOption = {
      month: ConversionTypeEnum.String,
      quotaGPM: ConversionTypeEnum.Number,
      performanceGPM: ConversionTypeEnum.Number,
      lastActionPlan: ConversionTypeEnum.String,
      gapGPM: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
