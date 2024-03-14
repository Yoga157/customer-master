import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelViewEditAdditional extends BaseModel {
  funnelGenID: number = 0;
  funnelID: string = '';
  compellingEvent: string = '';
  customerBudget: number = 0;
  supportiveCoach: string = '';
  customerNeeds: string = '';
  competitor: string = '';
  modifyUserID: number = 0;
  fox: string = '';
  enemy: string = '';
  competitorProduct: string = '';
  competitorService: string = '';
  competitorAmount: number = 0;

  constructor(data: Partial<FunnelViewEditAdditional>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelViewEditAdditional>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      funnelID: ConversionTypeEnum.String,
      compellingEvent: ConversionTypeEnum.String,
      customerBudget: ConversionTypeEnum.Number,
      supportiveCoach: ConversionTypeEnum.String,
      customerNeeds: ConversionTypeEnum.String,
      competitor: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.Number,
      fox: ConversionTypeEnum.String,
      enemy: ConversionTypeEnum.String,
      competitorProduct: ConversionTypeEnum.String,
      competitorAmount: ConversionTypeEnum.Number,
      competitorService: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
