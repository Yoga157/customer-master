import ActivityTypeModel from './ActivityTypeModel';

export default interface IActivityTypeState {
  readonly data: ActivityTypeModel[];
  readonly dataAll: ActivityTypeModel[];
  readonly error: boolean;
}
