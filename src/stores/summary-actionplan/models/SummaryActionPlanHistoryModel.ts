import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SummaryActionPlanHistoryModel extends BaseModel {
  public logDate: string = '';
  public logUser: string = '';
  public actionPlan: string = '';
  public forSales: string = '';
  public reviewMonth: string = '';

  constructor(data: Partial<SummaryActionPlanHistoryModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<SummaryActionPlanHistoryModel>): void {
    const conversionOptions: IConversionOption = {
      logDate: ConversionTypeEnum.String,
      logUser: ConversionTypeEnum.String,
      actionPlan: ConversionTypeEnum.String,
      forSales: ConversionTypeEnum.String,
      reviewMonth: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
