import ICreditBillingTableRow from './ICreditBillingTableRow';

export default interface ICreditBillingTable {
  readonly totalRows: number;
  readonly rows: ICreditBillingTableRow[];
}
