import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelBrandModel extends BaseModel {
  funnelGenID: number = 0;
  itemID: number = 0;
  discPercent: number = 0;
  discAmount: number = 0;
  notes: string = '';
  createUserID: string = '';
  discountStatus: string = '';
  constructor(data: Partial<FunnelBrandModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelBrandModel>): void {
    const conversionOptions: IConversionOption = {
      brandID: ConversionTypeEnum.Number,
      brandName: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
