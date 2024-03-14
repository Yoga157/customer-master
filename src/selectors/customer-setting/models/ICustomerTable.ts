import ICustomerTableRow from "./ICustomerTableRow";

export default interface ICustomerTable {
  readonly totalRow: number;
  readonly rows: ICustomerTableRow[];
}
