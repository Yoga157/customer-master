import IActivityReportResultTableRow from './IActivityReportResultTableRow';

export default interface IActivityReportResultTable {
    readonly totalRows: number;
    readonly rows: IActivityReportResultTableRow[];
    readonly sorting: string;
    readonly column: string;
}