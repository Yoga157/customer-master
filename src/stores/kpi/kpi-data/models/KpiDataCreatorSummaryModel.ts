import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class KpiDataCreatorSummaryModel extends BaseModel {
  point: number = 0;
  creator: string = '';
  remaks: string = '';
  id: number = 0;

  constructor(data: Partial<KpiDataCreatorSummaryModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<KpiDataCreatorSummaryModel>) {
    const conversionOptions: IConversionOption = {
      id: ConversionTypeEnum.Number,
      point: ConversionTypeEnum.Number,
      creator: ConversionTypeEnum.String,
      remaks: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
