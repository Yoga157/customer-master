import CommissionIndexModel from './CommissionIndexModel';

export default interface ICommissionIndexState {
  readonly commissionIndex: CommissionIndexModel[];
  readonly error: boolean;
  readonly refreshPage: boolean;
}
