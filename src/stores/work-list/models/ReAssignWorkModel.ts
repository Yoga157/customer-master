import { BaseModel } from 'sjs-base-model';

export default class ReAssignWorkModel extends BaseModel {
  workId: number = 0;
  uid: string = "";
  primaryResources: string = "";
  remark: string = "";
  modifyDate: string = "";
  modifyUserID: number = 0;

  constructor(data: Partial<ReAssignWorkModel>) {
    super();
    this.update(data);
  }
}
