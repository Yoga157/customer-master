import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
export default class ServiceCatalogHeaderModel extends BaseModel {
  svcCatGenID: number = 0;
  svcCatReffID: string = '';
  svcCatID: number = 0;
  isActive: number = 0;
  employeeID: string = '';
  employeeIDLead: number = 0;
  serviceCatalogUDCID: number = 0;
  modifyUserID: number = 0;
  subBrandGroupID: number = 0;
  effectiveDate: any = null;
  expireDate: any = null;
  constructor(data: Partial<ServiceCatalogHeaderModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ServiceCatalogHeaderModel>): void {
    const conversionOptions: IConversionOption = {
      svcCatGenID: ConversionTypeEnum.Number,
      svcCatReffID: ConversionTypeEnum.String,
      svcCatID: ConversionTypeEnum.Number,
      isActive: ConversionTypeEnum.Number,
      employeeID: ConversionTypeEnum.String,
      employeeIDLead: ConversionTypeEnum.Number,
      serviceCatalogUDCID: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.Number,
      subBrandGroupID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
