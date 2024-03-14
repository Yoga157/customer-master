import IUsageDetailTableRow from './IUsageDetailTableRow';

export default interface IUsageDetailTable {
  readonly totalRow: number;
  readonly rows: IUsageDetailTableRow[];
}
