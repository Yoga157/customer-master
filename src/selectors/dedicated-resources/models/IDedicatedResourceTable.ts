import IDedicatedResourceTableRow from './IDedicatedResourceTableRow';

export default interface IDedicatedResourceTable {
  readonly totalRows: number;
  readonly rows: IDedicatedResourceTableRow[];
}
