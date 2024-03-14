import BankModel from './BankModel';

export default interface IBankState {
  readonly data: BankModel[];
  readonly error: boolean;
}
