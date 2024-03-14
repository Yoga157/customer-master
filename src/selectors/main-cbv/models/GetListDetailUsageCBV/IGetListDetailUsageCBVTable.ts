import IGetListDetailUsageCBVTableRow from './IGetListDetailUsageCBVTableRow';

export default interface IGetListDetailUsageCBVTable {
  readonly totalRows: number;
  readonly totalCBVAmount: number;
  readonly totalUsedAmount: number;
  readonly totalRemainingAmount: number;
  readonly rows: IGetListDetailUsageCBVTableRow[];
}
