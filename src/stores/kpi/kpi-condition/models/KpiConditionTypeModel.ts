import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class KpiConditionTypeModel extends BaseModel {
    public readonly valueData: number = 0;
    public readonly textData: string = "";

    constructor(data: Partial<KpiConditionTypeModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<KpiConditionTypeModel>): void {
        const conversionOptions: IConversionOption = {
            valueData: ConversionTypeEnum.Number,
            textData: ConversionTypeEnum.String,
        };

        super.update(data, conversionOptions);
    }
};