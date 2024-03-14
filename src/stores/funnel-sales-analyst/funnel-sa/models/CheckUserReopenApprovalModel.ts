import { BaseModel } from 'sjs-base-model';

export default class CheckUserReopenApprovalModel extends BaseModel {
  public readonly isApproval: number = 0;

  constructor(data: Partial<CheckUserReopenApprovalModel>) {
    super();
    this.update(data);
  }
}
