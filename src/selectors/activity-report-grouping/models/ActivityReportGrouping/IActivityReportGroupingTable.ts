import IActivityReportGroupingTableRow from './IActivityReportGroupingTableRow';

export default interface IActivityReportGroupingTable {
    readonly totalRows: number;
    readonly rows: IActivityReportGroupingTableRow[];
    readonly sorting: string;
    readonly column: string;
    readonly filter: any;
    readonly search: any;
}