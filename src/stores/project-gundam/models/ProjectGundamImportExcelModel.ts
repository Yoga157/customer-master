import { BaseModel } from 'sjs-base-model';

export default class ProjectGundamImportModel extends BaseModel {
  
  ProjectId: number = 0;
  FunnelGenId: number = 0;
  File: any;
  ModifyDate: string | Date = "";
  ModifyUserID:  number = 0;

  constructor(data: Partial<ProjectGundamImportModel>) {
    super();

    this.update(data);
  }
}
