import { BaseModel } from 'sjs-base-model';

export default class ActivityReportGroupingFilter extends BaseModel {
    public customerSignStatusList: string = "";
    public customerNameList: string = "";
    public contactNameList:  string = "";
    public startDate:  string = "";
    public endDate:  string = "";
    public column:  string = "";
    public sorting:  string = "";
    public page:  number = 0;
    public pageSize:  number = 0;
    public userLoginId:  number = 0;
    
  
    constructor(data: Partial<ActivityReportGroupingFilter>) {
      super();
      this.update(data);
    }
}
