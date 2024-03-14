import IActivityReportProductTableRow from "./IActivityReportProductTableRow";

export default interface IActivityReportProductTable {
    readonly totalRow: number;
    readonly rows: IActivityReportProductTableRow[];
};