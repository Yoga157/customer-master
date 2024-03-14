import IFunnelWarrantySLATableRow from './IFunnelWarrantySLATableRow';

export default interface IFunnelWarrantySLATable {
  readonly totalRow: number;
  readonly rows: IFunnelWarrantySLATableRow[];
}
