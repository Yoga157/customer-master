import { BaseModel } from 'sjs-base-model';

export default class ActivityReportViewEditTotalCustomerExperience extends BaseModel {
    activityReportGenID: number = 0;
    totalCustomerExperience: string = '';
    createDate?: Date = undefined;
    createUserID: number = 0;  
    modifyDate?: Date = undefined;
    modifyUserID: number = 0;
    isAllowAccess: boolean = false;
    
    constructor(data: Partial<ActivityReportViewEditTotalCustomerExperience>) {
        super();
        this.update(data);
    }
};