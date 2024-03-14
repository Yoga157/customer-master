import { BaseModel } from 'sjs-base-model';

export default class ActivityCategoryModel extends BaseModel {
  
  public readonly activityReportCategoryGenID: string = '';
  public readonly activityReportCategoryName: string = '';

  constructor(data: Partial<ActivityCategoryModel>) {
    super();

    this.update(data);
  }
}
