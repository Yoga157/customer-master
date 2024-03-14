import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class TicketValueEndDateModel extends BaseModel {
  estEndDate: string = '';
  
  constructor(data: Partial<TicketValueEndDateModel>) {
    super();
    this.update(data);
  }

  // public update(data: Partial<TicketValueEndDateModel>): void {
  //   const conversionOptions: IConversionOption = {
  //     subject: ConversionTypeEnum.String,
  //     body: ConversionTypeEnum.String,
  //   };

  //   super.update(data, conversionOptions);
  // }
}