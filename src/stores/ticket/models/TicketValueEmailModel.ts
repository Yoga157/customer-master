import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class TicketValueEmailModel extends BaseModel {
  subject: string = '';
  body: string = '';
  
  constructor(data: Partial<TicketValueEmailModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<TicketValueEmailModel>): void {
    const conversionOptions: IConversionOption = {
      subject: ConversionTypeEnum.String,
      body: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}