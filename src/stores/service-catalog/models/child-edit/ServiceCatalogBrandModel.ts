import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ServiceCatalogBrandModel extends BaseModel {
  brandModelGenID: number = 0;
  modelName: string = '';

  constructor(data: Partial<ServiceCatalogBrandModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ServiceCatalogBrandModel>): void {
    const conversionOptions: IConversionOption = {
      brandModelGenID: ConversionTypeEnum.Number,
      modelName: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
