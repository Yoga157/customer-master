import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import ActivityReportProductModel from './ActivityReportProductModel';

export default class ActivityReportProductEnvelope extends BaseModel {
    public readonly totalRows: number = 0;
    public readonly rows: ActivityReportProductModel[] = [];

    constructor(data: Partial<ActivityReportProductEnvelope>) {
        super();
        this.update(data);
    }
}