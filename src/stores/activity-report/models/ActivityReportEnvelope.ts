import { BaseModel } from 'sjs-base-model';
import ActivityReportModel from './ActivityReportModel';

export default class ActivityReportEnvelope extends BaseModel {
    public readonly totalRows: number = 0;
    public readonly rows: ActivityReportModel[] = [];
    public readonly column: string = '';
    public readonly sorting: string = '';
    public readonly filter: any = null;
    public readonly search: any = null;
    
    constructor(data: Partial<ActivityReportEnvelope>) {
        super();
        this.update(data);
    }
};