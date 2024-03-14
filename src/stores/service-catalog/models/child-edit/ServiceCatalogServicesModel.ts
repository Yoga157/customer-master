import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ServiceCatalogServicesModel extends BaseModel {
  svcCatGenID: number = 0;
  svcName: string = '';
  svcDescription: string = '';
  svcPrerequisite: string = '';
  notes: string = '';
  modifyUserID: number = 0;
  effectiveDate: any = '';
  expireDate: any = '';
  constructor(data: Partial<ServiceCatalogServicesModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ServiceCatalogServicesModel>): void {
    const conversionOptions: IConversionOption = {
      svcCatGenID: ConversionTypeEnum.Number,
      svcName: ConversionTypeEnum.String,
      svcDescription: ConversionTypeEnum.String,
      svcPrerequisite: ConversionTypeEnum.String,
      notes: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
