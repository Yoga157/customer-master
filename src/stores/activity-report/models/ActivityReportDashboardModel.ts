import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ActivityReportDashboardModel extends BaseModel {
    funnelGenId: number = 0;
    activityReportGenID: number = 0;
    ticketId: string = '';
    so: number = 0;
    customerName: string = '';
    contactName: string = '';
    address: string = '';
    startDate?: string = '';
    endDate?: string = '';
    engineerList: string = '';
    status: string = '';
    reviewStatus: boolean = false;
    customerSignStatus: boolean = false;
    department: string = '';
    createDate?: Date = undefined;
    createUserID: number = 0;  
    modifyDate?: Date = undefined;
    modifyUserID: number = 0;
    isDraft: boolean = false;

    constructor(data: Partial<ActivityReportDashboardModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<ActivityReportDashboardModel>): void {
        const conversionOptions: IConversionOption = {
            funnelGenId: ConversionTypeEnum.Number,
            activityReportGenID: ConversionTypeEnum.Number,
            ticketId: ConversionTypeEnum.String,
            so: ConversionTypeEnum.Number,
            customerName: ConversionTypeEnum.String,
            contactName: ConversionTypeEnum.String,
            address: ConversionTypeEnum.String,
            startDate: ConversionTypeEnum.String,
            endDate: ConversionTypeEnum.String,
            engineerList: ConversionTypeEnum.String,
            status: ConversionTypeEnum.String,
            reviewStatus: ConversionTypeEnum.Boolean,
            customerSignStatus: ConversionTypeEnum.Boolean,
            department: ConversionTypeEnum.String,
            createUserID: ConversionTypeEnum.Number,
            modifyUserID: ConversionTypeEnum.Number,
            isDraft: ConversionTypeEnum.Boolean,
        };

        super.update(data, conversionOptions);
    }
};