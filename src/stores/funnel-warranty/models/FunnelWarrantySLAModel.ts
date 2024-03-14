import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelWarrantySLAModel extends BaseModel {
  warrantySLAGenID: number = 0;
  warrantySupportID: number = 0;
  problemClassID: number = 0;
  brandID: number = 0;
  subBrandID: number = 0;
  startWarrantyCust?: Date = undefined;
  customerWarranty: string = '';
  startWarrantyVendor?: Date = undefined;
  vendorWarranty: string = '';
  createUserID: number = 0;
  pCustomer: string = '';
  lCustomer: string = '';
  oCustomer: string = '';
  pVendor: string = '';
  lVendor: string = '';
  oVendor: string = '';

  constructor(data: Partial<FunnelWarrantySLAModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelWarrantySLAModel>): void {
    const conversionOptions: IConversionOption = {
      warrantySLAGenID: ConversionTypeEnum.Number,
      warrantySupportID: ConversionTypeEnum.Number,
      problemClassID: ConversionTypeEnum.Number,
      brandID: ConversionTypeEnum.Number,
      subBrandID: ConversionTypeEnum.Number,
      customerWarranty: ConversionTypeEnum.String,
      vendorWarranty: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.Number,
      pCustomer: ConversionTypeEnum.String,
      lCustomer: ConversionTypeEnum.String,
      oCustomer: ConversionTypeEnum.String,
      pVendor: ConversionTypeEnum.String,
      lVendor: ConversionTypeEnum.String,
      oVendor: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
