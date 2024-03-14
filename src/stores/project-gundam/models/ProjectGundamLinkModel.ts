import { BaseModel } from 'sjs-base-model';

export default class ProjectGundamLinkModel extends BaseModel {
  
  public readonly projectId: number = 0;
  public readonly sourceTaskId: number = 0;
  public readonly targetTaskId: number = 0;
  public readonly type: number = 0;
  public readonly lag: number = 0;
  public readonly createDate: string | Date = '';
  public readonly createUserID: number = 0;

  public readonly linkId: number = 0;
  public readonly modifyDate: string | Date = '';
  public readonly modifyUserID: number = 0;

  constructor(data: Partial<ProjectGundamLinkModel>) {
    super();

    this.update(data);
  }
}
