import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SummaryActionPlanSubordinateModel extends BaseModel {
  public empName: string = '';
  public quotaGPM: number = 0;
  public performanceGPM: number = 0;
  public gapGPM: number = 0;
  public lastActionPlan: string = '';

  constructor(data: Partial<SummaryActionPlanSubordinateModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<SummaryActionPlanSubordinateModel>): void {
    const conversionOptions: IConversionOption = {
      empName: ConversionTypeEnum.String,
      quotaGPM: ConversionTypeEnum.Number,
      performanceGPM: ConversionTypeEnum.Number,
      gapGPM: ConversionTypeEnum.Number,
      lastActionPlan: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
