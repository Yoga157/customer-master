import InsuranceModel from './InsuranceModel';

export default interface IInsuranceState {
  readonly data: InsuranceModel[];
  readonly error: boolean;
}
