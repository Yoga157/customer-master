import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class RowData extends BaseModel {
    public kpiConditionID: number = 0;
    public description: string = "";
    public point: string = "";
    public createDate: string = "";
    public createUserID: number = 0;
    public modifyUserID: number = 0;
    public modifyDate: string = "";

    constructor(data: Partial<RowData>) {
        super();

        this.update(data);
    }

    public update(data: Partial<RowData>): void {
        const conversionOptions: IConversionOption = {
            kpiConditionID: ConversionTypeEnum.Number,
            description: ConversionTypeEnum.String,
            point: ConversionTypeEnum.String,
            createDate: ConversionTypeEnum.String,
            createUserID: ConversionTypeEnum.Number,
            modifyUserID: ConversionTypeEnum.Number,
            modifyDate: ConversionTypeEnum.String,
        };

        super.update(data, conversionOptions);
    };
};