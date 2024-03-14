import { BaseModel } from 'sjs-base-model';

export default class ReviewActivity extends BaseModel {
    funnelActivityID: number = 0;
    funnelGenID: number = 0;
    activityTypeID: number = 0;
    reviewCategory: String = "";
    reviewActivity: String = "";
    dueDate: any = null;
    createDate: any = null;
    createUserID: number = 0;
    createUser: String = "";
    roleID: number = 0;
    roleName: String = "";
    activityStatusID: number = 0;

  constructor(data: Partial<ReviewActivity>) {
    super();
    this.update(data);
  }

}
