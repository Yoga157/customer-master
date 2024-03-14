 import { BaseModel } from 'sjs-base-model';

export default class TaskDeleteModel extends BaseModel {
  
  public readonly projectId: number = 0;
  public readonly taskId: number = 0;
  public readonly deleteUserID: number = 0;
  public readonly deleteDate: string | Date = '';

  constructor(data: Partial<TaskDeleteModel>) {
    super();

    this.update(data);
  }
}
