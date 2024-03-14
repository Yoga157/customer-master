import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class ServiceSummaryModel extends BaseModel {
    serviceName: string = "";
    customerSettingId: number = 0;
    purchase: number = 0;
    years: string = "";
    
    constructor(data: Partial<ServiceSummaryModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<ServiceSummaryModel>): void {
        const conversionOptions: IConversionOption = {
            serviceName: ConversionTypeEnum.String,
            customerSettingId: ConversionTypeEnum.Number,
            purchase: ConversionTypeEnum.Float,
            years: ConversionTypeEnum.String
        }

        super.update(data, conversionOptions);
    }
}