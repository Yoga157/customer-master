import { BaseModel } from 'sjs-base-model';
import ActivityReportDashboardModel from './ActivityReportDashboardModel';

export default class ActivityReportDashboardEnvelope extends BaseModel {
    public readonly totalRows: number = 0;
    public readonly rows: ActivityReportDashboardModel[] = [];
    public readonly column: string = '';
    public readonly sorting: string = '';
    public readonly filter: any = null;
    public readonly search: any = null;
    
    constructor(data: Partial<ActivityReportDashboardEnvelope>) {
        super();
        this.update(data);
    }
};