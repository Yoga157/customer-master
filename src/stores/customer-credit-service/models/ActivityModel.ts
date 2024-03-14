import { BaseModel } from 'sjs-base-model';

export default class ActivityModel extends BaseModel {
  public salesID: number = 0;
  public createUserID: number = 0;
  public notes: string = '';

  constructor(data: Partial<ActivityModel>) {
    super();
    this.update(data);
  }
}
