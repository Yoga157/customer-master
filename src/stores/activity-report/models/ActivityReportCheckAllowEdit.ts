import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ActivityReportCheckAllowEdit extends BaseModel {
    public activityReportGenID: number = 0;
    public isAllowEdit: boolean = false;

    constructor(data: Partial<ActivityReportCheckAllowEdit>) {
        super();
        this.update(data);
    }

    public update(data: Partial<ActivityReportCheckAllowEdit>): void {
        const conversionOptions: IConversionOption = {
            activityReportGenID: ConversionTypeEnum.Number,
            isAllowEdit: ConversionTypeEnum.Boolean
        };

        super.update(data, conversionOptions);
    }
};