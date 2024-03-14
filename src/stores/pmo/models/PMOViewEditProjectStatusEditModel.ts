
import { BaseModel } from 'sjs-base-model';

export default class PMOViewEditProjectStatusEditModel extends BaseModel {
  modifyUserID: number = 0;
  projectStatusId: number = 0;
  remark: string  = "";
  modifyDate: string | Date = "";
  projectId: number = 0;

  constructor(data: Partial<PMOViewEditProjectStatusEditModel>) {
    super();
    this.update(data);
  }
}
