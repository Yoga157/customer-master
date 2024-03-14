import IAWSBillingTableRow from './IAWSBillingTableRow';

export default interface IAWSBillingTable {
  readonly totalRows: number;
  readonly rows: IAWSBillingTableRow[];
}
