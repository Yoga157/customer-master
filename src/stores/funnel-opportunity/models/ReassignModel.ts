import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ReassignModel extends BaseModel {
  funnelOpportunityID: number = 0;
  salesID: number = 0;
  userLoginID: number = 0;

  constructor(data: Partial<ReassignModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<ReassignModel>): void {
    const conversionOptions: IConversionOption = {
      funnelOpportunityID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      userLoginID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
