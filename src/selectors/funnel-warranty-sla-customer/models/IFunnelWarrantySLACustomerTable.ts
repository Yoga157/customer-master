import IFunnelWarrantySLACustomerTableRow from './IFunnelWarrantySLACustomerTableRow';

export default interface IFunnelWarrantySLACustomerTable {
  readonly totalRow: number;
  readonly rows: IFunnelWarrantySLACustomerTableRow[];
}
