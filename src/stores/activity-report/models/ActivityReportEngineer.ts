import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class ActivityReportEngineer extends BaseModel {
    public readonly activityReportEngineerGenID: string = '';
    public readonly activityReportEngineerName: string = '';

    constructor(data: Partial<ActivityReportEngineer>) {
        super();
        this.update(data);
    }

    public update(data: Partial<ActivityReportEngineer>): void {
        const conversionOptions: IConversionOption = {
            activityReportEngineerGenID: ConversionTypeEnum.String,
            activityReportEngineerName: ConversionTypeEnum.String,
        };

        super.update(data, conversionOptions);
    }
};