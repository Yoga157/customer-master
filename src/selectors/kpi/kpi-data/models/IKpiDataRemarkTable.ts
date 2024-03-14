import IKpiDataRemarkTableRow from './IKpiDataRemarkTableRow';

export default interface IKpiDataRemarkTable {
  readonly totalRow: number;
  readonly rows: IKpiDataRemarkTableRow[];
}
