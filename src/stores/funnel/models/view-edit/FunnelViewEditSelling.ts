import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelViewEditSelling extends BaseModel {
  funnelGenID: number = 0;
  funnelID: string = '';
  currency: string = '';
  totalOrderingPriceProduct: number = 0;
  totalSellingPriceProduct: number = 0;
  totalOrderingPriceService: number = 0;
  totalSellingPriceService: number = 0;
  totalOrderingPrice: number = 0;
  totalSellingPrice: number = 0;
  gpmPctg: number = 0;
  gpmAmount: number = 0;
  modifyUserID: number = 0;
  createUserID: number = 0;
  totalCostProduct: number = 0;
  totalCostService: number = 0;
  totalExpendProduct: number = 0;
  totalExpendService: number = 0;

  totalInvoice: number = 0;
  totalCollection: number = 0;
  gpmsaProduct: number = 0;
  gpmActProduct: number = 0;
  gpmsaService: number = 0;
  gpmActService: number = 0;
  gpmsaProductPctg: number = 0;
  gpmActProductPctg: number = 0;
  gpmsaServicePctg: number = 0;
  gpmActServicePctg: number = 0;
  rate: number = 0;

  constructor(data: Partial<FunnelViewEditSelling>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelViewEditSelling>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      funnelID: ConversionTypeEnum.String,
      currency: ConversionTypeEnum.String,
      totalOrderingPriceProduct: ConversionTypeEnum.Float,
      totalSellingPriceProduct: ConversionTypeEnum.Float,
      totalOrderingPriceService: ConversionTypeEnum.Float,
      totalSellingPriceService: ConversionTypeEnum.Float,
      totalOrderingPrice: ConversionTypeEnum.Float,
      totalSellingPrice: ConversionTypeEnum.Float,
      gpmPctg: ConversionTypeEnum.Float,
      gpmAmount: ConversionTypeEnum.Float,
      modifyUserID: ConversionTypeEnum.Number,
      createUserID: ConversionTypeEnum.Number,
      totalCostProduct: ConversionTypeEnum.Number,
      totalCostService: ConversionTypeEnum.Number,
      totalExpendProduct: ConversionTypeEnum.Number,
      totalExpendService: ConversionTypeEnum.Number,

      totalInvoice: ConversionTypeEnum.Number,
      totalCollection: ConversionTypeEnum.Number,
      gpmsaProduct: ConversionTypeEnum.Number,
      gpmActProduct: ConversionTypeEnum.Number,
      gpmsaService: ConversionTypeEnum.Number,
      gpmActService: ConversionTypeEnum.Number,
      rate: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
