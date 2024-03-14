import DashboardSecurityModel from 'stores/users/models/DashboardSecurityModel';
import HirarkiModel from 'stores/users/models/HirarkiModel';

export default interface IServiceCatalogTableRow {
  readonly status: string;
  readonly token: string;
  readonly userName: string;
  readonly fullName: string;
  readonly employeeID: number;
  readonly employeeKey: number;
  readonly email: string;
  readonly message: string;
  readonly role: string;
  readonly permission: string;
  readonly hirarki: HirarkiModel[] | undefined;
  readonly direktoratID: string;
  readonly direktoratName: string;
  readonly dashboardSecurity: DashboardSecurityModel[] | undefined;
}
