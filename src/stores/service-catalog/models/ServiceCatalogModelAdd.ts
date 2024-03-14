import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ServiceCatalogModelAdd extends BaseModel {
  svcCatGenID: number = 0;
  svcCatReffID: string = '';
  svcCatID: number = 0;
  employeeID: string = '';
  employeeIDLead:  number = 0;
  subBrandGroupID: number = 0;
  brandModelID: string = '';
  brandModelIDArr?: number[] = undefined;
  brandModelName: string = '';
  manHour: number = 0;
  afterHour: number = 0;
  difficultyLevel: number = 0;
  svcName: string = '';
  svcDescription: string = '';
  svcPrerequisite: string = '';
  notes: string = '';
  flagFunnelGenID: number = 0;
  
  priceType: string = '';
  sourcePrice: string = '';
  svcPrice: number = 0;
  owner: string = '';
  isActive: number = 0;
  serviceCatalogUDCID: number = 0;
  effectiveDate: any = null;
  expireDate: any = null;
  constructor(data: Partial<ServiceCatalogModelAdd>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ServiceCatalogModelAdd>): void {
    const conversionOptions: IConversionOption = {
      svcCatGenID: ConversionTypeEnum.Number,
      svcCatReffID: ConversionTypeEnum.String,
      svcCatID: ConversionTypeEnum.Number,
      employeeID: ConversionTypeEnum.String,
      employeeIDLead: ConversionTypeEnum.Number,
      subBrandGroupID: ConversionTypeEnum.Number,
      brandModelID: ConversionTypeEnum.String,
      brandModelName: ConversionTypeEnum.String,
      manHour: ConversionTypeEnum.Number,
      afterHour: ConversionTypeEnum.Number,
      difficultyLevel: ConversionTypeEnum.Number,
      svcName: ConversionTypeEnum.String,
      svcDescription: ConversionTypeEnum.String,
      svcPrerequisite: ConversionTypeEnum.String,
      notes: ConversionTypeEnum.String,
      priceType: ConversionTypeEnum.String,
      sourcePrice: ConversionTypeEnum.String,
      svcPrice: ConversionTypeEnum.Float,
      flagFunnelGenID: ConversionTypeEnum.Number,
      owner: ConversionTypeEnum.String,
      isActive: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
