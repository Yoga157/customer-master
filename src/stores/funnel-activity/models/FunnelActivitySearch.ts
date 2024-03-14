import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelActivitySearch extends BaseModel {
  funnelGenID: number = 0;
  text: string = '';
  salesID: number = 0;
  activityType: number = 0;
  excludeSystemActivity: number = 0;

  constructor(data: Partial<FunnelActivitySearch>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelActivitySearch>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      excludeSystemActivity: ConversionTypeEnum.Number,
      activityType: ConversionTypeEnum.Number,
      text: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
