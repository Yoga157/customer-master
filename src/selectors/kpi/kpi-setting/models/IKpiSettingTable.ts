import IKpiSettingTableRow from "./IKpiSettingTableRow";

export default interface IKpiSettingTable {
    readonly totalRow:number;
    readonly rows: IKpiSettingTableRow[];
};