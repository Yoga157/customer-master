import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ActivityReportModelAdd extends BaseModel {
    activityReportGenID: number = 0;
    ticketId: string = '';
    so: number = 0;
    funnelGenId: number = 0;
    customerName: string = '';
    phone: string = '';
    contactName: string = '';
    address: string = '';
    activityCategory: string = '';
    startDate?: string = '';
    endDate?: string = '';
    departureDate?: string = '';
    arrivalDate?: string = '';
    engineerList: string = '';
    status: string = '';
    notes: string = '';
    description: string = '';
    symptom: string = '';
    actionTaken: string = '';
    totalCustomerExperience: string = '';
    createDate?: Date = undefined;
    createUserID: number = 0;  
    modifyDate?: Date = undefined;
    modifyUserID: number = 0;
    projectName: string = '';
        
    constructor(data: Partial<ActivityReportModelAdd>) {
        super();
        this.update(data);
    }

    public update(data: Partial<ActivityReportModelAdd>): void {
        const conversionOptions: IConversionOption = {
            activityReportGenID: ConversionTypeEnum.Number,
            ticketId: ConversionTypeEnum.String,
            so: ConversionTypeEnum.Number,
            funnelGenId: ConversionTypeEnum.Number,
            customerName: ConversionTypeEnum.String,
            phone: ConversionTypeEnum.String,
            contactName: ConversionTypeEnum.String,
            address: ConversionTypeEnum.String,
            activityCategory: ConversionTypeEnum.String,
            engineerList: ConversionTypeEnum.String,
            status: ConversionTypeEnum.String,
            notes: ConversionTypeEnum.String,
            description: ConversionTypeEnum.String,
            symptom: ConversionTypeEnum.String,
            actionTaken: ConversionTypeEnum.String,
            totalCustomerExperience: ConversionTypeEnum.String,
            createUserID: ConversionTypeEnum.Number,
            modifyUserID: ConversionTypeEnum.Number,
            startDate: ConversionTypeEnum.String,
            endDate: ConversionTypeEnum.String,
            departureDate: ConversionTypeEnum.String,
            arrivalDate: ConversionTypeEnum.String,
            projectName: ConversionTypeEnum.String,
        };

        super.update(data, conversionOptions);
    }
};