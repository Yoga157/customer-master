import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import CoverageHourModel from 'stores/coverage-hour/models/CoverageHourModel';
import IOptionsDataString from './models/IOptionsDataString';

const _selectCoveragerHour = (models: CoverageHourModel[]): IOptionsDataString[] => {
  return models.map(
    (model: CoverageHourModel): IOptionsDataString => ({
      text: model.name,
      value: model.name,
    })
  );
};

export const selectCoverageHourOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.coverageHour.data,
  _selectCoveragerHour
);
