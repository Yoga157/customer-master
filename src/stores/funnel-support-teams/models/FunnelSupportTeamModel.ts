import { BaseModel } from 'sjs-base-model';

export default class FunnelSupportTeamModel extends BaseModel {
  public funnelSupportID: number = 0;
  public funnelGenID: number = 0;
  public employeeID: number = 0;
  public supportRoleID: number = 0;
  public needAssignFlag: number = 0;
  public assignedByID: number = 0;
  public assignDate?: Date = undefined;
  public notes: string = '';
  public createDate?: Date = undefined;
  public createUserID: number = 0;
  public modifyDate?: Date = undefined;
  public modifyUserID: number = 0;

  constructor(data: Partial<FunnelSupportTeamModel>) {
    super();

    this.update(data);
  }
}
