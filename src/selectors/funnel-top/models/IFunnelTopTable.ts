import IFunnelTopTableRow from './IFunnelTopTableRow';


export default interface IFunnelTopTable {
  readonly totalRow: number;
  readonly rows: IFunnelTopTableRow[];
}
