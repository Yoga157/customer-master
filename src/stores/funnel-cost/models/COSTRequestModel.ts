import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class CostRequestModel extends BaseModel {
  public funnelCostID: number = 0;
  public funnelGenID: number = 0;
  public funnelCostType: number = 0;
  public costID: number = 0;
  public cost: number = 0;
  public createUserID: number = 0;
  public modifyUserID: number = 0;
  public costRemark: string | undefined | null = '';
  constructor(data: Partial<CostRequestModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<CostRequestModel>): void {
    const conversionOptions: IConversionOption = {
      // costRemark: ConversionTypeEnum.String,
      funnelCostID: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
      funnelCostType: ConversionTypeEnum.Number,
      costID: ConversionTypeEnum.Number,
      cost: ConversionTypeEnum.Number,
      createUserID: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
