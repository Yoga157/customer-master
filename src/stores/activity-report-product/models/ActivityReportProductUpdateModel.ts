import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ActivityReportProductUpdateModel extends BaseModel {
    public activityReportGenID: number = 0;
    public activityReportProductGenID: number = 0;
    public productName: string = '';
    public productNumber: string = '';
    public serialNumber: string = '';
    public salesUnit: string = '';
    public licenseNumber: string = '';
    public quantity: number = 0;
    public createUserID: number = 0;
    public createDate: string = "";
    public modifyUserID: number = 0;
    public modifyDate: string = "";

    constructor(data: Partial<ActivityReportProductUpdateModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<ActivityReportProductUpdateModel>): void {
        const conversionOptions: IConversionOption = {
            activityReportGenID: ConversionTypeEnum.Number,
            activityReportProductGenID: ConversionTypeEnum.Number,
            productName: ConversionTypeEnum.String,
            productNumber: ConversionTypeEnum.String,
            serialNumber: ConversionTypeEnum.String,
            salesUnit: ConversionTypeEnum.String,
            licenseNumber: ConversionTypeEnum.String,
            quantity: ConversionTypeEnum.Number,
            createUserID: ConversionTypeEnum.Number,
            createDate: ConversionTypeEnum.String,
            modifyUserID: ConversionTypeEnum.Number,
            modifyDate: ConversionTypeEnum.String,
        };

        super.update(data, conversionOptions);
    }
}
