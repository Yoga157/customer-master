import BondIssuerModel from './BondIssuerModel';

export default interface IBankState {
  readonly data: BondIssuerModel[];
  readonly error: boolean;
}
