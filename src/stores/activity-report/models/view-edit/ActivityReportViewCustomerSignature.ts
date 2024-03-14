import { BaseModel } from 'sjs-base-model';

export default class ActivityReportViewCustomerSignature extends BaseModel {
    activityReportGenID: number = 0;
    customerSignName: string = '';
    dCustomerSignDate?: Date = undefined;
    customerSignDate: string = '';
    customerSignImage: string = '';
    createDate?: Date = undefined;
    createUserID: number = 0;  
    modifyDate?: Date = undefined;
    modifyUserID: number = 0;
    isAllowAccess: boolean = false;

    constructor(data: Partial<ActivityReportViewCustomerSignature>) {
        super();
        this.update(data);
    }
};