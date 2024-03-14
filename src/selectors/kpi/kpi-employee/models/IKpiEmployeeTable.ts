import IKpiEmployeeTableRow from "./IKpiEmployeeTableRow";

export default interface IKpiEmployeeTable {
    readonly totalRow:number;
    readonly rows: IKpiEmployeeTableRow[];
};
  