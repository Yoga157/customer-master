import { BaseModel } from 'sjs-base-model';

export default class ActivityReportFilter extends BaseModel {
    activityReportGenID: string = '';
    reviewStatus: string = '';
    draftStatus: string = '';
    customerSignStatus: string = '';
    customer: string = '';
    engineer: string = '';
    page: number = 0;
    pageSize: number = 0;
    column: string = '';
    sorting: string = '';
    userLogin: string = '';
    userLoginId: number = 0;
    
    constructor(data: Partial<ActivityReportFilter>) {
        super();
        this.update(data);
    }
};