import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelOpportunityRow extends BaseModel {
  funnelOpportunityID: number = 0;
  funnelID: number | null = 0;
  status: string = '';
  eventName: string = '';
  customerName: number = 0;
  brand: string = '';
  salesName: number = 0;
  createUserID: number = 0;
  createDate: string = '';
  brandID: number = 0;
  salesID: number = 0;
  notes: string = '';
  customerGenID: number = 0;
  eventDate?: Date = undefined;

  constructor(data: Partial<FunnelOpportunityRow>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelOpportunityRow>): void {
    const conversionOptions: IConversionOption = {
      funnelOpportunityID: ConversionTypeEnum.Number,
      funnelID: ConversionTypeEnum.Number,
      status: ConversionTypeEnum.String,
      eventName: ConversionTypeEnum.String,
      customerName: ConversionTypeEnum.Number,
      brand: ConversionTypeEnum.String,
      salesName: ConversionTypeEnum.Number,
      createUserID: ConversionTypeEnum.Number,
      createDate: ConversionTypeEnum.String,
      brandID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      notes: ConversionTypeEnum.String,
      customerGenID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
