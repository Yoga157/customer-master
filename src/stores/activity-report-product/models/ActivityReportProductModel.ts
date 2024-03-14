import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ActivityReportProductModel extends BaseModel {
    public activityReportGenID: number = 0;
    public activityReportProductGenID: number = 0;
    public productName: string = '';
    public productNumber: string = '';
    public serialNumber: string = '';
    public licenseNumber: string = '';
    public quantity: number = 0;
    public salesUnit: string = '';
    public createUserID: number = 0;
    public createDate: string = "";
    public modifyUserID: number = 0;
    public modifyDate: string = "";
    // public createDate?: Date = undefined;
    // public createUserID: number = 0;  
    // public modifyDate?: Date = undefined;
    // public modifyUserID: number = 0;

    constructor(data: Partial<ActivityReportProductModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<ActivityReportProductModel>): void {
        const conversionOptions: IConversionOption = {
            activityReportGenID: ConversionTypeEnum.Number,
            activityReportProductGenID: ConversionTypeEnum.Number,
            productName: ConversionTypeEnum.String,
            productNumber: ConversionTypeEnum.String,
            serialNumber: ConversionTypeEnum.String,
            licenseNumber: ConversionTypeEnum.String,
            quantity: ConversionTypeEnum.Number,
            salesUnit: ConversionTypeEnum.String,
            createUserID: ConversionTypeEnum.Number,
            createDate: ConversionTypeEnum.String,
            modifyUserID: ConversionTypeEnum.Number,
            modifyDate: ConversionTypeEnum.String
        };

        super.update(data, conversionOptions);
    }
}
