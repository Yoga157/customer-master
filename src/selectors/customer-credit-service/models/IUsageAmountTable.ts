import IUsageAmountTableRow from './IUsageAmountTableRow';

export default interface IUsageAmountTable {
  readonly totalRow: number;
  readonly rows: IUsageAmountTableRow[];
}
