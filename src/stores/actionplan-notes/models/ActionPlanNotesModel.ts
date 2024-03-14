import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ActionPlanNotesModel extends BaseModel {
  public funnelGenID: string = '';
  public comment: string = '';
  public sourceNotes: string = '';
  public accName: string = '';

  constructor(data: Partial<ActionPlanNotesModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ActionPlanNotesModel>): void {
    const conversionOptions: IConversionOption = {
      accName: ConversionTypeEnum.String,
      sourceNotes: ConversionTypeEnum.String,
      funnelGenID: ConversionTypeEnum.Number,
      comment: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
