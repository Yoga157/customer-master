import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ActivityReportModel extends BaseModel {
    funnelGenId: number = 0;
    activityReportGenID: number = 0;
    ticketId: string = '';
    so: number = 0;
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
    superiorID: number = 0;
    superiorName: string = '';
    reviewDate?: Date = undefined;
    reviewNotes: string = '';
    reviewStatus: boolean = false;
    customerSignStatus: boolean = false;
    customerSignName: string = '';
    customerSignDate?: Date = undefined;
    customerSignImage: string = '';
    createDate?: Date = undefined;
    createUserID: number = 0;  
    modifyDate?: Date = undefined;
    modifyUserID: number = 0;
    projectName: string = '';
    department: string = '';
    isDraft: boolean = false;
    
    constructor(data: Partial<ActivityReportModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<ActivityReportModel>): void {
        const conversionOptions: IConversionOption = {
            funnelGenId: ConversionTypeEnum.Number,
            activityReportGenID: ConversionTypeEnum.Number,
            ticketId: ConversionTypeEnum.String,
            so: ConversionTypeEnum.Number,
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
            superiorID: ConversionTypeEnum.Number,
            superiorName: ConversionTypeEnum.String,
            reviewNotes: ConversionTypeEnum.String,
            customerSignName: ConversionTypeEnum.String,
            customerSignImage: ConversionTypeEnum.String,
            createUserID: ConversionTypeEnum.Number,
            modifyUserID: ConversionTypeEnum.Number,
            startDate: ConversionTypeEnum.String,
            endDate: ConversionTypeEnum.String,
            departureDate: ConversionTypeEnum.String,
            arrivalDate: ConversionTypeEnum.String,
            reviewStatus: ConversionTypeEnum.Boolean,
            customerSignStatus: ConversionTypeEnum.Boolean,
            projectName: ConversionTypeEnum.String,
            department: ConversionTypeEnum.String,
            isDraft: ConversionTypeEnum.Boolean,
        };

        super.update(data, conversionOptions);
    }
};