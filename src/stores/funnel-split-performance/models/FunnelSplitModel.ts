import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelSplitModel extends BaseModel {
  funnelGenID: number = 0;
  salesID: number = 0;
  splitType: number = 0;
  splitPercentage: number = 0;
  createUserID: number = 0;

  constructor(data: Partial<FunnelSplitModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<FunnelSplitModel>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      splitType: ConversionTypeEnum.Number,
      splitPercentage: ConversionTypeEnum.Number,
      createUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
