import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ActionPlanNotesHistoryModel extends BaseModel {
  public comment: string = '';
  public logUser: string = '';
  public logDate?: Date = undefined;

  constructor(data: Partial<ActionPlanNotesHistoryModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ActionPlanNotesHistoryModel>): void {
    const conversionOptions: IConversionOption = {
      logUser: ConversionTypeEnum.String,
      comment: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
