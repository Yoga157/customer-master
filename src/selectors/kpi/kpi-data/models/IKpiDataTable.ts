import IKpiDataTableRow from './IKpiDataTableRow';

export default interface IKpiDataTable {
  readonly totalRow: number;
  readonly rows: IKpiDataTableRow[];
}
