import { BaseModel } from 'sjs-base-model';
import DashboardSecurityModel from './DashboardSecurityModel';
import HirarkiModel from './HirarkiModel';

export default class UserResultModel extends BaseModel {
  public readonly status: string = '';
  public readonly token: string = '';
  public readonly userName: string = '';
  public readonly fullName: string = '';
  public readonly employeeID: number = 0;
  public readonly email: string = '';
  public readonly role: string = '';
  public readonly message: string = '';
  public readonly employeeKey: number = 0;
  public readonly permission: string = '';
  public readonly hirarki: HirarkiModel[] | undefined;
  public readonly direktoratID: string = '';
  public readonly direktoratName: string = '';
  public readonly dashboardSecurity: DashboardSecurityModel[] | undefined;
  constructor(data: Partial<UserResultModel>) {
    super();

    this.update(data);
  }
}
