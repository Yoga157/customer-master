import IActivityReportTableRow from './IActivityReportTableRow';

export default interface IListActivityReport {
    readonly totalRow: number;
    readonly rows: IActivityReportTableRow[];
}