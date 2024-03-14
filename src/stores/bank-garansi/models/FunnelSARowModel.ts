import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelSARowModel extends BaseModel {
  funnelGenID: string = '';
  saNo: string = '';
  projectName: string = '';
  customerName: string = '';
  salesName: string = '';
  funnelDate?: string = '';
  saDate: string = '';
  customerGenID: string = '';
  so: string = '';
  projectAmount: number = 0;
  customerAddress: number = 0;

  constructor(data: Partial<FunnelSARowModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelSARowModel>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.String,
      saNo: ConversionTypeEnum.String,
      projectName: ConversionTypeEnum.String,
      customerName: ConversionTypeEnum.String,
      salesName: ConversionTypeEnum.String,
      funnelDate: ConversionTypeEnum.String,
      saDate: ConversionTypeEnum.String,
      customerGenID: ConversionTypeEnum.String,
      so: ConversionTypeEnum.String,
      projectAmount: ConversionTypeEnum.Number,
      customerAddress: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
