import { BaseModel } from 'sjs-base-model';

export default class ActivityReportViewEditNotes extends BaseModel {
    activityReportGenID: number = 0;
    description: string = '';
    symptom: string = '';
    actionTaken: string = '';
    isAllowEdit: boolean = false;
    createDate?: Date = undefined;
    createUserID: number = 0;  
    modifyDate?: Date = undefined;
    modifyUserID: number = 0;
    isAllowAccess: boolean = false;

    constructor(data: Partial<ActivityReportViewEditNotes>) {
        super();
        this.update(data);
    }
};