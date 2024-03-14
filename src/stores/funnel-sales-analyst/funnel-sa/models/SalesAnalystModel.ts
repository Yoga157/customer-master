import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SalesAnalystModel extends BaseModel {
  salesId: number = 0;
  funnelGenID: number = 0;

  constructor(data: Partial<SalesAnalystModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<SalesAnalystModel>): void {
    const conversionOptions: IConversionOption = {
      salesId: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
