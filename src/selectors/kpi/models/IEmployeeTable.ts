import IEmployeeListsTableRow from './IEmployeeTableRow';

export default interface IEmployeeTable {
    readonly totalRow: number;
    readonly rows: IEmployeeListsTableRow[];
};