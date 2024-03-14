import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SummaryActionPlanModel extends BaseModel {
  public accName: string = '';
  public month: string = '';
  public year: number = 0;
  public actionPlan: string = '';
  public userLoginID: number = 0;
  public direktoratName: string = '';

  constructor(data: Partial<SummaryActionPlanModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<SummaryActionPlanModel>): void {
    const conversionOptions: IConversionOption = {
      accName: ConversionTypeEnum.String,
      month: ConversionTypeEnum.String,
      actionPlan: ConversionTypeEnum.String,
      year: ConversionTypeEnum.Number,
      userLoginID: ConversionTypeEnum.Number,
      direktoratName: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
