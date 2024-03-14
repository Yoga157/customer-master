import IBrandModelTableRow from './IBrandModelTableRow';

export default interface IBrandModelTable {
  readonly totalRow: number;
  readonly rows: IBrandModelTableRow[];
}
