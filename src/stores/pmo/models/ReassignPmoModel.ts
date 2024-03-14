import { BaseModel } from 'sjs-base-model';

export default class ReassignPmoModel extends BaseModel {
  projectId: number = 0;
  pmoId: number = 0;
  modifyUserID: number = 0;
  modifyDate: string = "";

  constructor(data: Partial<ReassignPmoModel>) {
    super();
    this.update(data);
  }
}
