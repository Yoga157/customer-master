import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class KpiConditionNameModel extends BaseModel {
    public id: number = 0;
    public name: string = "";
    public conditionTypeID: number = 0;
    public createUserID: number = 0;

    constructor(data: Partial<KpiConditionNameModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<KpiConditionNameModel>): void {
        const conversionOptions: IConversionOption = {
            id: ConversionTypeEnum.Number,
            name: ConversionTypeEnum.String,
            conditionTypeID: ConversionTypeEnum.Number,
            createUserID: ConversionTypeEnum.Number,
        };

        super.update(data, conversionOptions);
    }
};