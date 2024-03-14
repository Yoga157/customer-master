import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ServiceCatalogProductModel extends BaseModel {
  svcCatGenID: number = 0;
  svcCatReffID: string = '';
  svcCatID: number = 0;
  employeeID: string = '';
  employeeIDLead: number = 0;
  subBrandGroupID: number = 0;
  brandModelID: string = '';
  brandModelIDArr: string[] = [];
  brandModelName: string = '';
  modifyUserID: number = 0;

  constructor(data: Partial<ServiceCatalogProductModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ServiceCatalogProductModel>): void {
    const conversionOptions: IConversionOption = {
      svcCatGenID: ConversionTypeEnum.Number,
      svcCatReffID: ConversionTypeEnum.String,
      svcCatID: ConversionTypeEnum.Number,
      employeeID: ConversionTypeEnum.String,
      employeeIDLead: ConversionTypeEnum.Number,
      subBrandGroupID: ConversionTypeEnum.Number,
      brandModelID: ConversionTypeEnum.String,
      brandModelName: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
