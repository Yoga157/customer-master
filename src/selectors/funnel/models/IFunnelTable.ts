import IFunnelTableRow from './IFunnelTableRow';

export default interface IFunnelTable {
  readonly totalRow: number;
  readonly rows: IFunnelTableRow[];
  readonly totalSellingPriceSum: number;
  readonly gpmAmountSum: number;
  readonly totalSellingItem: number;
  readonly totalOrderingItem: number;
}
