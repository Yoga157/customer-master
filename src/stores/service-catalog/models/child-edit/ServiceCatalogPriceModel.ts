import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ServiceCatalogPriceModel extends BaseModel {
  svcCatGenID: number = 0;
  priceType: string = '';
  sourcePrice: string = '';
  svcPrice: number = 0;
  modifyUserID: number = 0;

  constructor(data: Partial<ServiceCatalogPriceModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ServiceCatalogPriceModel>): void {
    const conversionOptions: IConversionOption = {
      svcCatGenID: ConversionTypeEnum.Number,
      priceType: ConversionTypeEnum.String,
      sourcePrice: ConversionTypeEnum.String,
      svcPrice: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
