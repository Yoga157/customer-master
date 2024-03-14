import IUsageDashboardDetailRow from './IUsageDashboardTableRow';

export default interface IUsageDashboardDetailTable {
  readonly totalRows: number;
  readonly rows: IUsageDashboardDetailRow[];
}
