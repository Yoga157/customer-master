import IDedicatedResourceTableRow from './IDedicatedResourceTableRow';
import IGetHistoryContractTableRow from './IGetHistoryContractTableRow';

export default interface IGetHistoryContractTable {
  readonly totalRows: number;
  readonly employeeID: number;
  readonly employeeName: string;
  readonly rows: IGetHistoryContractTableRow[];
  readonly column: string;
  readonly sorting: string;
}
