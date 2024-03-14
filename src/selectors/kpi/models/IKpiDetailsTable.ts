import IKpiDetailsTableRow from '../models/IKpiDetailsTableRow';

export default interface IKpiDetailsTable {
    readonly totalRow: number;
    readonly rows: IKpiDetailsTableRow[];
    readonly totalQ1Point: string;
    readonly totalQ2Point: string;
    readonly totalQ3Point: string;
    readonly totalQ4Point: string;
};