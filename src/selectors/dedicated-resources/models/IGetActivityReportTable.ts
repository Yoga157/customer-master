import IGetActivityReportTableRow from './IGetActivityReportTableRow';

export default interface IGetActivityReportTable {
  readonly totalRows: number;
  readonly rows: IGetActivityReportTableRow[];
  readonly column: any;
  readonly sorting: any;
}
