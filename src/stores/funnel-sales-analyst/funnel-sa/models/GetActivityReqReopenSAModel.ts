import { BaseModel } from 'sjs-base-model';

export default class GetActivityReqReopenSAModel extends BaseModel {
  public readonly funnelActivityID: number = 0;
  public readonly funnelGenID: number = 0;
  public readonly assignedTo: string = '';
  public readonly activityTypeID: number = 0;
  public readonly activityTitle: string = '';
  public readonly activityStartTime: string = '';
  public readonly activityEndTime: string = '';
  public readonly activityText1: string = '';
  public readonly activityText2: string = '';
  public readonly activityText3: string = '';
  public readonly activityText4: string = '';
  public readonly activityText5: string = '';
  public readonly activityStatusID: number = 0;
  public readonly docNumber: string = '';
  public readonly createDate: string = '';
  public readonly createUserID: number = 0;
  public readonly modifyDate: string = '';
  public readonly modifyUserID: number = 0;

  constructor(data: Partial<GetActivityReqReopenSAModel>) {
    super();

    this.update(data);
  }
}
