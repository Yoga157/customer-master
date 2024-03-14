import { BaseModel } from 'sjs-base-model';

export default class MeetingRequestModel extends BaseModel {
  public activityID: number = 0;
  public funnelGenID: number = 0;
  public sendTo: string = '';
  public carbonCopy: string = '';
  public subject: string = '';
  public startDate: string = '';
  public endDate: string = '';
  public venue: string = '';
  public message: string = '';
  public createUserID: number = 0;

  constructor(data: Partial<MeetingRequestModel>) {
    super();
    this.update(data);
  }
}
