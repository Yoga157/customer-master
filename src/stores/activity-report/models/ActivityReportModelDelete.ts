import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class ActivityReportModelDelete extends BaseModel{
    activityReportGenID: number = 0;
    modifyDate?: Date = undefined;
    modifyUserID: number = 0;

    constructor(data: Partial<ActivityReportModelDelete>) {
        super();
        this.update(data);
    }

    public update(data: Partial<ActivityReportModelDelete>): void {
        const conversionOptions: IConversionOption = {
            activityReportGenID: ConversionTypeEnum.Number,
            modifyUserID: ConversionTypeEnum.Number,
        };

        super.update(data, conversionOptions);
    }
};