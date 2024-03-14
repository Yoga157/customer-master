import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class KpiConditionRequestModel extends BaseModel {
    public kpiConditionID: number = 0;
    public description: string = "";
    public point: string = "";
    public createUserID: number = 0;
    public modifyUserID: number = 0;

    constructor(data: Partial<KpiConditionRequestModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<KpiConditionRequestModel>): void {
        const conversionOptions: IConversionOption = {
            kpiConditionID: ConversionTypeEnum.Number,
            description: ConversionTypeEnum.String,
            point: ConversionTypeEnum.String,
            createUserID: ConversionTypeEnum.Number,
            modifyUserID: ConversionTypeEnum.Number
        };

        super.update(data, conversionOptions);
    };
};