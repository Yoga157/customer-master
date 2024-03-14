import { BaseModel } from 'sjs-base-model';

export default class ProjectGundamTaskListModel extends BaseModel {
  public readonly taskId: number = 0;
  public readonly projectId: number = 0;
  public readonly type: string = '';
  public readonly taskDescription: string = '';
  public readonly taskResource: string = '';
  public readonly taskDuration: string = '';
  public readonly taskProgress: string = '';
  public readonly estStartDate: string | Date = '';
  public readonly estEndDate: string | Date = '';
  public readonly actualStartDate: string | Date = '';
  public readonly actualEndDate: string | Date = '';
  public readonly taskStatus: string = '';
  public readonly remark: string = '';
  public readonly subType: string = '';
  public readonly isMilestone: boolean = false;
  public readonly createDate: string | Date = '';
  public readonly createUserID: number = 0;

  public readonly modifyDate: string | Date = '';
  public readonly modifyUserID: number = 0;

  constructor(data: Partial<ProjectGundamTaskListModel>) {
    super();

    this.update(data);
  }
}
