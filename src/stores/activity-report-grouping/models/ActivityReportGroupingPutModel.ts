import { BaseModel } from 'sjs-base-model';

export default class ActivityReportGroupingPutModel extends BaseModel {
    public activityReportGroupGenId: number = 0;
    public activityReportGenIdRelated: any;
    public modifyDate: Date = undefined;
    public modifyUserID: number = 0;
  
    constructor(data: Partial<ActivityReportGroupingPutModel>) {
      super();
      this.update(data);
    }
}
