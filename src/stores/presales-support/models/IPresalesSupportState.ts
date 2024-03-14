import PresalesSupportModel from './PresalesSupportModel';

export default interface IPresalesSupportState {
  readonly data: PresalesSupportModel[];
  readonly error: boolean;
}
