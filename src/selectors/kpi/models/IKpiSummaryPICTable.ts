import IKpiSummaryPICTableRow from './IKpiSummaryPICTableRow';

export default interface IKpiSummaryPICTable {
    readonly totalRow: number;
    readonly rows: IKpiSummaryPICTableRow[];
};