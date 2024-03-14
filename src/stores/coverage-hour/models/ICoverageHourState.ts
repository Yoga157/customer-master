import CoverageHourModel from './CoverageHourModel';

export default interface ICoverageHourState {
  readonly data: CoverageHourModel[];
  readonly error: boolean;
}
