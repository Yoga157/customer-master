import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class ActivityReportCustomer extends BaseModel {
    public readonly activityReportCustomerGenID: string = '';
    public readonly activityReportCustomerName: string = '';

    constructor(data: Partial<ActivityReportCustomer>) {
        super();
        this.update(data);
    }

    public update(data: Partial<ActivityReportCustomer>): void {
        const conversionOptions: IConversionOption = {
            activityReportCustomerGenID: ConversionTypeEnum.String,
            activityReportCustomerName: ConversionTypeEnum.String,
        };

        super.update(data, conversionOptions);
    }
};