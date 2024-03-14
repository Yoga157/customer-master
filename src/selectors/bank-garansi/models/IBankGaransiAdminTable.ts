import IBankGaransiAdminTableRow from './IBankGaransiAdminTableRow';

export default interface IBankGaransiAdminTable {
  readonly totalRow: number;
  readonly rows: IBankGaransiAdminTableRow[];
}
