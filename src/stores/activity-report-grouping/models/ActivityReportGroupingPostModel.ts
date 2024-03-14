import { BaseModel } from 'sjs-base-model';

export default class ActivityReportGroupingPostModel extends BaseModel {
    public activityReportGenIdRelated: any;
    public createDate: Date = undefined;
    public createUserID: number = 0;
  
    constructor(data: Partial<ActivityReportGroupingPostModel>) {
      super();
      this.update(data);
    }
}
