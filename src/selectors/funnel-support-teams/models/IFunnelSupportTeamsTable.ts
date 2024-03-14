import IFunnelSupportTeamsTableRow from './IFunnelSupportTeamsTableRow';

export default interface IFunnelSupportTeamsTable {
  readonly totalRow: number;
  readonly rows: IFunnelSupportTeamsTableRow[];
}
