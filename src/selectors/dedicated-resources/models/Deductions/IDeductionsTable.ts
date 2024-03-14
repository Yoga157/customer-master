import IDeductionsTableRow from './IDeductionsTableRow';

export default interface IDeductionsTable {
  readonly totalRows: number;
  readonly totalDeductions: number;
  readonly rows: IDeductionsTableRow[];
}
