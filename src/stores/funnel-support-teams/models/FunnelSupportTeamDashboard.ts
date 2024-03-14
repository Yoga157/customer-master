import { BaseModel } from 'sjs-base-model';

export default class FunnelSupportTeamDashboard extends BaseModel {
  public readonly funnelSupportID: number = 0;
  public readonly funnelGenID: number = 0;
  public readonly employeeID: number = 0;
  public readonly employeeName: string = '';
  public readonly supportRoleID: number = 0;
  public readonly supportRole: string = '';
  public readonly needAssignFlag: number = 0;
  public readonly assignedByID: number = 0;
  public readonly assignedBy: string = '';
  public readonly assignDate?: Date = undefined;
  public readonly notes: string = '';
  public readonly flagDelete: number = 0;

  constructor(data: Partial<FunnelSupportTeamDashboard>) {
    super();

    this.update(data);
  }
}
