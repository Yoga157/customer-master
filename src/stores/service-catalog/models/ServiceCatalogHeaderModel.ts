import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
export default class ServiceCatalogHeaderModel extends BaseModel {
  svcCatGenID: number = 0;
  svcCatReffID: string = '';
  svcCatID: number = 0;
  employeeID: string = '';
  employeeIDLead: number = 0;

  constructor(data: Partial<ServiceCatalogHeaderModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ServiceCatalogHeaderModel>): void {
    const conversionOptions: IConversionOption = {
      svcCatGenID: ConversionTypeEnum.Number,
      svcCatReffID: ConversionTypeEnum.String,
      svcCatID: ConversionTypeEnum.Number,
      employeeID: ConversionTypeEnum.String,
      employeeIDLead: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
