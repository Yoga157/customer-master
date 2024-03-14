import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelTopModel extends BaseModel {
  funnelTopID: number = 0;
  funnelGenID: number = 0;
  productDesc: string = '';
  productPercentage: number = 0;
  serviceDesc: string = '';
  servicePercentage: number = 0;
  doc: string = '';
  docCollectionDate?: Date;

  constructor(data: Partial<FunnelTopModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelTopModel>): void {
    const conversionOptions: IConversionOption = {
      funnelTopID: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
      productDesc: ConversionTypeEnum.String,
      productPercentage: ConversionTypeEnum.Float,
      serviceDesc: ConversionTypeEnum.String,
      servicePercentage: ConversionTypeEnum.Float,
      doc: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
