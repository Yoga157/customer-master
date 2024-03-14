import BondTypeModel from './BondTypeModel';

export default interface IBondTypeState {
  readonly data: BondTypeModel[];
  readonly error: boolean;
}
