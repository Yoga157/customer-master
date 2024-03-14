import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class RowData extends BaseModel {
    public activityReportGenID: number = 0;
    public activityReportProductGenID: number = 0;
    public productName: string = '';
    public productNumber: string = '';
    public serialNumber: string = '';
    public licenseNumber: string = '';
    public quantity: number = 0;
    public salesUnit: string = '';
    public createUserID: number = 0;
    public modifyUserID: number = 0;
    public createDate: string = '';
    public modifyDate: string = '';
    public isUpdate: number | undefined  = 0;
    public isDelete: number | undefined  = 0;
    public isAdd: number | undefined  = 0;

    constructor(data: Partial<RowData>) {
        super();
        this.update(data);
    }

    public update(data: Partial<RowData>): void {
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
            modifyUserID: ConversionTypeEnum.Number,
            createDate: ConversionTypeEnum.String,
            modifyDate: ConversionTypeEnum.String,
            isUpdate: ConversionTypeEnum.Number,
            isDelete: ConversionTypeEnum.Number,
            isAdd: ConversionTypeEnum.Number,
        }; 

        super.update(data, conversionOptions);
    }
};