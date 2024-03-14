import PreventiveScheduleModel from './PreventiveScheduleModel';

export default interface IPreventiveScheduleState {
  readonly data: PreventiveScheduleModel[];
  readonly error: boolean;
}
