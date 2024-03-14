import { BaseModel } from 'sjs-base-model';

export default class DashboardSecurityModel extends BaseModel {
  public readonly dashboardSecurity: string[] = [];
  constructor(data: Partial<DashboardSecurityModel>) {
    super();

    this.update(data);
  }
}
