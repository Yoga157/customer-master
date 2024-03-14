import PMOSupportModel from './PMOSupportModel';

export default interface IPMOSupportState {
  readonly data: PMOSupportModel;
  readonly error: boolean;
}
