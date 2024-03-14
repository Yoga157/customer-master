import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ActionPlanNotesHeaderModel extends BaseModel {
  public funnelGenID: number = 0;
  public projectName: string = '';
  public lastUpdate: string = '';
  public lastComment: string = '';

  constructor(data: Partial<ActionPlanNotesHeaderModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ActionPlanNotesHeaderModel>): void {
    const conversionOptions: IConversionOption = {
      projectName: ConversionTypeEnum.String,
      lastUpdate: ConversionTypeEnum.String,
      lastComment: ConversionTypeEnum.String,
      funnelGenID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
