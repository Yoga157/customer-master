import { BaseModel } from 'sjs-base-model';

export default class ActivityReportCategoryModel extends BaseModel {
    public activityReportCategoryGenID: number = 0;
    public activityReportCategoryName: string = '';

    constructor(data: Partial<ActivityReportCategoryModel>) {
        super();
        this.update(data);
    }
};