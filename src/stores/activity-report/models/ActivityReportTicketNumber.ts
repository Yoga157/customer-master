import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class ActivityReportTicketNumber extends BaseModel {
    public readonly ticketOrTaskNumber: string = '';
    public readonly accountID: number = 0;
    public readonly accountName: string = '';
    public readonly accountPhone: string = '';
    public readonly accountAddress: string = '';
    public readonly contactID: number = 0;
    public readonly contactName: string = '';
    public readonly contactPhone: string = '';
    public readonly contactEmail: string = '';
    public readonly contactAddress: string = '';
    public readonly engineerList: string = '';
    public readonly activityCategory: string = '';
    public readonly activityCategoryArr: string[] = [];
    public readonly description: string = '';
    public readonly startDate: string = '';
    public readonly dStartDate?: Date = undefined;
    public readonly endDate: string = '';
    public readonly dEndDate?: Date = undefined;
    public readonly isTicket: boolean = false;
    public readonly projectName: string = '';

    constructor(data: Partial<ActivityReportTicketNumber>) {
      super();
      this.update(data);
    }

    public update(data: Partial<ActivityReportTicketNumber>): void {
      const conversionOptions: IConversionOption = {
        ticketOrTaskNumber:ConversionTypeEnum.String,
        accountID:ConversionTypeEnum.Number,
        accountName:ConversionTypeEnum.String,
        accountPhone:ConversionTypeEnum.String,
        accountAddress:ConversionTypeEnum.String,
        contactID:ConversionTypeEnum.Number,
        contactName:ConversionTypeEnum.String,
        contactPhone:ConversionTypeEnum.String,
        contactEmail:ConversionTypeEnum.String,
        contactAddress:ConversionTypeEnum.String,
        engineerList:ConversionTypeEnum.String,
        activityCategory:ConversionTypeEnum.String,
        description: ConversionTypeEnum.String,
        startDate: ConversionTypeEnum.String,
        endDate: ConversionTypeEnum.String,
        isTicket: ConversionTypeEnum.Boolean,
        projectName: ConversionTypeEnum.String,
      };

    super.update(data, conversionOptions);
  }
}
