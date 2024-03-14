import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelSASearchModel extends BaseModel {
  page: number = 0;
  pageSize: number = 0;
  funnelGenID: string = '';
  saNo: string = '';
  projectName: string = '';
  customerName: string = '';
  salesName: string = '';
  so: string = '';
  domain: string = '';
  bondType: string = '';

  constructor(data: Partial<FunnelSASearchModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelSASearchModel>): void {
    const conversionOptions: IConversionOption = {
      page: ConversionTypeEnum.Number,
      pageSize: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.String,
      saNo: ConversionTypeEnum.String,
      projectName: ConversionTypeEnum.String,
      customerName: ConversionTypeEnum.String,
      salesName: ConversionTypeEnum.String,
      so: ConversionTypeEnum.String,
      domain: ConversionTypeEnum.String,
      bondType: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
