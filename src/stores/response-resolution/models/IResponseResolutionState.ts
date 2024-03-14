import ResponseResolutionModel from './ResponseResolutionModel';

export default interface IResponseResolutionState {
  readonly data: ResponseResolutionModel[];
  readonly error: boolean;
}
