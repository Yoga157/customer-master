import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelServiceCatalogDashboard extends BaseModel {
  funnelSvcCatGenID: number = 0;
  funnelGenID: number = 0;
  svcCatGenID: number = 0;
  svcCatReffID: string = '';
  category: string = '';
  serviceName: string = '';
  brandModelGenID: number = 0;
  brandModelName: string = '';
  pic: string = '';
  qty: number = 0;
  unitPrice: number = 0;
  totalPrice: number = 0;
  svcChecked: boolean = false;
  discountStatus: string = '';
  discountPctg: number = 0;
  discountAmount: number = 0;
  owner: string = '';

  constructor(data: Partial<FunnelServiceCatalogDashboard>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelServiceCatalogDashboard>): void {
    const conversionOptions: IConversionOption = {
      funnelSvcCatGenID: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
      svcCatGenID: ConversionTypeEnum.Number,
      svcCatReffID: ConversionTypeEnum.String,
      category: ConversionTypeEnum.String,
      serviceName: ConversionTypeEnum.String,
      brandModelName: ConversionTypeEnum.String,
      pic: ConversionTypeEnum.String,
      qty: ConversionTypeEnum.Number,
      unitPrice: ConversionTypeEnum.Number,
      totalPrice: ConversionTypeEnum.Number,
      discountStatus: ConversionTypeEnum.String,
      discountPctg: ConversionTypeEnum.Number,
      discountAmount: ConversionTypeEnum.Number,
      owner: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
