import { BaseModel } from 'sjs-base-model';
import ActivityReportsGroupingModel from './ActivityReportsGroupingModel';

export default class ActivityReportGroupingDetailModel extends BaseModel {
  public readonly activityReportGroupGenId: number = 0;
  public readonly uid: string = '';
  public readonly so: number = 0;
  public readonly customerName: string = '';
  public readonly contactName: string = '';
  public readonly phone: string = '';
  public readonly superiorReview: string = '';
  public readonly createDate: string = '';
  public readonly createUserID: number = 0;
  public readonly createUserName: string = '';
  public readonly activityReports: ActivityReportsGroupingModel[];

  constructor(data: Partial<ActivityReportGroupingDetailModel>) {
    super();
    this.update(data);
  }
}
