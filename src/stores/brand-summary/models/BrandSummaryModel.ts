import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class BrandSummaryModel extends BaseModel {
    brandName: string = "";
    customerSettingId: number = 0;
    purchase: number = 0;
    years: string = "";
    
    constructor(data: Partial<BrandSummaryModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<BrandSummaryModel>): void {
        const conversionOptions: IConversionOption = {
            brandName: ConversionTypeEnum.String,
            customerSettingId: ConversionTypeEnum.Number,
            purchase: ConversionTypeEnum.Float,
            years: ConversionTypeEnum.String
        }

        super.update(data, conversionOptions);
    }
}