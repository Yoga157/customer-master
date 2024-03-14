import ISoftwareToolTableRow from './ISoftwareToolTableRow';

export default interface ISoftwareTable {
  readonly totalRows: number;
  readonly rows: ISoftwareToolTableRow[];
}
