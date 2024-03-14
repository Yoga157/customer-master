import IKpiDetailsDataTableRow from '../models/IKpiDetailsDataTableRow';

export default interface IKpiDetailsTable {
    readonly totalRow: number;
    readonly rows: IKpiDetailsDataTableRow[];
};