import { BaseModel } from 'sjs-base-model';

export default class ActivityReportViewEditProducts extends BaseModel {
    isAllowAccess: boolean = false;

    constructor(data: Partial<ActivityReportViewEditProducts>) {
        super();
        this.update(data);
    }
};