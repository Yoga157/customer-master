import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelSARowModel extends BaseModel {
  formID: string = '';
  formType: number = 0;
  salesID: number = 0;
  customerID: number = 0;
  customerPICID: number = 0;
  funnelGenID: number = 0;
  saNo: string = '';
  engineerPMName: string = '';
  notes: string = '';
  createDate: any;
  createUserID: number = 0;
  formDate: string = '';
  so: number | string = 0;
  constructor(data: Partial<FunnelSARowModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelSARowModel>): void {
    const conversionOptions: IConversionOption = {
      formID: ConversionTypeEnum.String,
      formType: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      customerID: ConversionTypeEnum.Number,
      customerPICID: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
      saNo: ConversionTypeEnum.String,
      engineerPMName: ConversionTypeEnum.String,
      notes: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.Number,
      formDate: ConversionTypeEnum.String,
      // so: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
