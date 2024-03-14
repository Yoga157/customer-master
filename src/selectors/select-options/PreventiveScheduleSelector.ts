import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import PreventiveScheduleModel from 'stores/preventive-schedule/models/PreventiveScheduleModel';
import IOptionsDataString from './models/IOptionsDataString';

const _selectPreventiveScheduleOptions = (models: PreventiveScheduleModel[]): IOptionsDataString[] => {
  return models.map(
    (model: PreventiveScheduleModel): IOptionsDataString => ({
      text: model.text1,
      value: model.text1,
    })
  );
};

export const selectPreventiveScheduleOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.preventiveSchedule.data,
  _selectPreventiveScheduleOptions
);
