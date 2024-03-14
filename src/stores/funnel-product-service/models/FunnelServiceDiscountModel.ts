import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelServiceDiscountModel extends BaseModel {
  funnelGenID: number = 0;
  itemID: number = 0;
  discPercent: number = 0;
  discAmount: number = 0;
  notes: string = '';
  createUserID: string = '';
  discountStatus: string = '';
  constructor(data: Partial<FunnelServiceDiscountModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelServiceDiscountModel>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      itemID: ConversionTypeEnum.Number,
      discPercent: ConversionTypeEnum.Number,
      discAmount: ConversionTypeEnum.Number,
      notes: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.String,
      discountStatus: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
