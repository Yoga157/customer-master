import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class ActivityReportTicketNumberOptions extends BaseModel {
    public readonly valueData: string = '';
    public readonly textData: string = '';
    
    constructor(data: Partial<ActivityReportTicketNumberOptions>) {
      super();
      this.update(data);
    }

    public update(data: Partial<ActivityReportTicketNumberOptions>): void {
      const conversionOptions: IConversionOption = {
        valueData:ConversionTypeEnum.String,
        textData: ConversionTypeEnum.String,
      };

    super.update(data, conversionOptions);
  }
}
