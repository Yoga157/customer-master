import ICreditSourceTableRow from './ICreditSourceTableRow';

export default interface ICreditSourceTable {
  readonly totalRow: number;
  readonly rows: ICreditSourceTableRow[];
}
