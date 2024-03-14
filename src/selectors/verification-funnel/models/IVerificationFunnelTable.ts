import IVerificationFunnelTableRow from './IVerificationFunnelTableRow';

export default interface IVerificationFunnelTable {
  readonly totalRow: number;
  readonly rows: IVerificationFunnelTableRow[];
  readonly status: string;
}
