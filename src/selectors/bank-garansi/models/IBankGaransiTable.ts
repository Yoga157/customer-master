import IBankGaransiTableRow from './IBankGaransiTableRow';

export default interface IBankGaransiTable {
  readonly totalRow:number;
  readonly rows: IBankGaransiTableRow[];
}
