import ISoftwareTableRow from './ISoftwareTableRow';

export default interface ISoftwareTable {
  readonly totalRows: number;
  readonly rows: ISoftwareTableRow[];
}
