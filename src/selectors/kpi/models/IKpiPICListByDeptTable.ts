import IKpiPICLListByDeptTableRow from '../models/IKpiPICListByDeptTableRow';

export default interface IKpiPICListByDeptTable {
    readonly totalRow: number;
    readonly rows: IKpiPICLListByDeptTableRow[];
}