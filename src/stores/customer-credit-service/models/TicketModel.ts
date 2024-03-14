import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class TicketModel extends BaseModel {
  public customerCreditServiceID: number = 0;
  public ticketNumber: string = '';
  public ticketTitle: string = '';
  public presalesID: number = 0;
  public customer: string = '';
  public dept: string = '';
  public category: string = '';
  public description: string = '';
  public ticketDate?: Date = undefined;
  public resource: string = '';
  public emailResource: string = '';
  public status: string = '';
  public complexity: string = '';
  public statusText: string = '';
  public notes: string = '';
  public price: number = 0;
  public isPrimary: number = 0;
  public salesID: number = 0;
  public createdDate: Date = new Date();
  public createUserID: number = 0;
  public modifyDate: Date = new Date();
  public modifyUserID: number = 0;

  constructor(data: Partial<TicketModel>) {
    super();
    this.update(data);
  }
  public update(data: Partial<TicketModel>): void {
    const conversionOptions: IConversionOption = {
      customerCreditServiceID: ConversionTypeEnum.Number,
      ticketNumber: ConversionTypeEnum.String,
      ticketTitle: ConversionTypeEnum.String,
      presalesID: ConversionTypeEnum.Number,
      customer: ConversionTypeEnum.String,
      dept: ConversionTypeEnum.String,
      category: ConversionTypeEnum.String,
      description: ConversionTypeEnum.String,
      resource: ConversionTypeEnum.String,
      emailResource: ConversionTypeEnum.String,
      status: ConversionTypeEnum.String,
      statusText: ConversionTypeEnum.String,
      notes: ConversionTypeEnum.String,
      complexity: ConversionTypeEnum.String,
      price: ConversionTypeEnum.Float,
      salesID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
