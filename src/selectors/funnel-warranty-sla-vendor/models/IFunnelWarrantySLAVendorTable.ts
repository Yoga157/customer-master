import IFunnelWarrantySLAVendorTableRow from './IFunnelWarrantySLAVendorTableRow';

export default interface IFunnelWarrantySLAVendorTable {
  readonly totalRow: number;
  readonly rows: IFunnelWarrantySLAVendorTableRow[];
}
