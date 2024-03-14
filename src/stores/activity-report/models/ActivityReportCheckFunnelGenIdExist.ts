import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ActivityReportCheckFunnelGenIdExist extends BaseModel {
    public funnelGenId: number = 0;
    public isExist: boolean = false;
    
    constructor(data: Partial<ActivityReportCheckFunnelGenIdExist>) {
        super();
        this.update(data);
    }

    public update(data: Partial<ActivityReportCheckFunnelGenIdExist>): void {
        const conversionOptions: IConversionOption = {
            funnelGenId: ConversionTypeEnum.Number,
            isExist: ConversionTypeEnum.Boolean
        };

        super.update(data, conversionOptions);
    }
};