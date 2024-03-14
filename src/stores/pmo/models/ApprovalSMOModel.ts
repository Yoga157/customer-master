
import { BaseModel } from 'sjs-base-model';

export default class ApprovalSMOModel extends BaseModel {
  isApprove: boolean = false
  remarkApproval: string = ""
  projectId: number = 0;
  modifyDate: string = ""
  approverUserID: number = 0;

  constructor(data: Partial<ApprovalSMOModel>) {
    super();
    this.update(data);
  }
}
