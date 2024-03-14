import IAWSCredentialTableRow from './IAWSCredentialTableRow';

export default interface IAWSCredentialTable {
  readonly totalRows: number;
  readonly rows: IAWSCredentialTableRow[];
}
