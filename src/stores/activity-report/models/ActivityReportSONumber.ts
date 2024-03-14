import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class ActivityReportSONumber extends BaseModel {
    public readonly soNumber: string = '';
    // public readonly TicketOrTaskNumber: string = '';
    // public readonly AccountID: number = 0;
    public readonly accountName: string = '';
    // public readonly AccountPhone: string = '';
    public readonly accountAddress: string = '';
    // public readonly ContactID: number = 0;
    // public readonly ContactName: string = '';
    // public readonly ContactPhone: string = '';
    // public readonly ContactEmail: string = '';
    // public readonly ContactAddress: string = '';
    public readonly engineerList: string = '';
    // public readonly ActivityCategory: string = '';
    // public readonly ActivityCategoryArr: string[] = [];
    // public readonly Description: string = '';
    // public readonly StartDate: string = '';
    // public readonly dStartDate?: Date = undefined;
    // public readonly EndDate: string = '';
    // public readonly dEndDate?: Date = undefined;
    // public readonly IsTicket: boolean = false;
    public readonly projectName: string = '';

    constructor(data: Partial<ActivityReportSONumber>) {
      super();
      this.update(data);
    }

    public update(data: Partial<ActivityReportSONumber>): void {
      const conversionOptions: IConversionOption = {
        soNumber: ConversionTypeEnum.String,
        // TicketOrTaskNumber:ConversionTypeEnum.String,
        // AccountID:ConversionTypeEnum.Number,
        accountName:ConversionTypeEnum.String,
        // AccountPhone:ConversionTypeEnum.String,
        accountAddress:ConversionTypeEnum.String,
        // ContactID:ConversionTypeEnum.Number,
        // ContactName:ConversionTypeEnum.String,
        // ContactPhone:ConversionTypeEnum.String,
        // ContactEmail:ConversionTypeEnum.String,
        // ContactAddress:ConversionTypeEnum.String,
        engineerList:ConversionTypeEnum.String,
        // ActivityCategory:ConversionTypeEnum.String,
        // Description: ConversionTypeEnum.String,
        // StartDate: ConversionTypeEnum.String,
        // EndDate: ConversionTypeEnum.String,
        // IsTicket: ConversionTypeEnum.Boolean,
        projectName: ConversionTypeEnum.String,
      };

    super.update(data, conversionOptions);
  }
}
