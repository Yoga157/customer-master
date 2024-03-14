import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelSARowModel extends BaseModel {
  funnelGenID: number = 0;
  saNo: string = '';
  projectName: string = '';
  customerName: string = '';
  salesName: string = '';
  funnelDate?: string = '';
  saDate: string = '';
  customerGenID: string = '';
  so: string = '';
  salesID: number = 0;

  constructor(data: Partial<FunnelSARowModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelSARowModel>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      saNo: ConversionTypeEnum.String,
      projectName: ConversionTypeEnum.String,
      customerName: ConversionTypeEnum.String,
      salesName: ConversionTypeEnum.String,
      funnelDate: ConversionTypeEnum.String,
      saDate: ConversionTypeEnum.String,
      customerGenID: ConversionTypeEnum.String,
      so: ConversionTypeEnum.String,
      salesID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
