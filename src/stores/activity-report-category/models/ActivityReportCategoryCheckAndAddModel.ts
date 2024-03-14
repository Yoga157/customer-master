import { BaseModel } from 'sjs-base-model';

export default class ActivityReportCategoryCheckAndAddModel extends BaseModel {
    public activityCategories: string = '';

    constructor(data: Partial<ActivityReportCategoryCheckAndAddModel>) {
        super();
        this.update(data);
    }
};