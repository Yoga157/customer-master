import IEmployeeFreelanceTableRow from "./IEmployeeFreelanceTableRow";

export default interface IEmployeeFreelanceTable {
    readonly totalRow: number;
    readonly rows: IEmployeeFreelanceTableRow[];
}