import { BaseModel } from 'sjs-base-model';

export default class ActivityReportViewEditSuperiorReview extends BaseModel {
    activityReportGenID: number = 0;
    superiorID: number = 0;
    superiorName: string = '';
    reviewDate?: Date = undefined;
    reviewNotes: string = '';
    reviewStatus: boolean = false;
    isAllowReview: boolean = false;
    createDate?: Date = undefined;
    createUserID: number = 0;  
    modifyDate?: Date = undefined;
    modifyUserID: number = 0;
    isAllowAccess: boolean = false;
    department: string = '';

    constructor(data: Partial<ActivityReportViewEditSuperiorReview>) {
        super();
        this.update(data);
    }
};