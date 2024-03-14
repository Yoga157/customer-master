import IKpiDataDashboardDeptTableRow from './IKpiDataDashboardDeptTableRow';

export default interface IKpiDataDashboardDeptTable {
  readonly totalRow: number;
  readonly rows: IKpiDataDashboardDeptTableRow[];
}
