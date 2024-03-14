import ICustomerFunnelTableRow from './ICustomerFunnelTableRow';

export default interface ICustomerFunnelTable {
  readonly totalRow: number;
  readonly rows: ICustomerFunnelTableRow[];
}
