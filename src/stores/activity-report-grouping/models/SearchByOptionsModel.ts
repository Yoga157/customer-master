import { BaseModel } from 'sjs-base-model';

export default class SearchByOptionsModel extends BaseModel {
    public userLoginId: number = 0;
    public activityReportGenID: number = 0;
    public ticketId: string = '';
    public funnelGenId: number = 0;
    public so: number = 0;
    public startDate: string = '';
    public endDate: string = '';
    public column: string = '';
    public sorting: string = '';
    public pageSize: number = 0;
    public page: number = 0;
  
    constructor(data: Partial<SearchByOptionsModel>) {
      super();
      this.update(data);
    }
}
