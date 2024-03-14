import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ActivityReportCheckSOExist extends BaseModel {
    public soNumber: number = 0;
    public isExist: boolean = false;
    
    constructor(data: Partial<ActivityReportCheckSOExist>) {
        super();
        this.update(data);
    }

    public update(data: Partial<ActivityReportCheckSOExist>): void {
        const conversionOptions: IConversionOption = {
            soNumber: ConversionTypeEnum.Number,
            isExist: ConversionTypeEnum.Boolean
        };

        super.update(data, conversionOptions);
    }
};