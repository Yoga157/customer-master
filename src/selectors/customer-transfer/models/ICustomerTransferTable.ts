import { ICustomerTransferTableRow, IHistoryTableRow } from './ICustomerTransferTableRow';

export interface ICustomerTransferTable {
  readonly totalRow: number;
  readonly rows: ICustomerTransferTableRow[];
}

export interface IHistoryTable {
  //readonly totalRow:number;
  readonly rows: IHistoryTableRow[];
}
