import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import ActivityTypeModel from 'stores/activity-type/models/ActivityTypeModel';
import IOptionsData from './models/IOptionsData';

const _selectActivityTypeOptions = (models: ActivityTypeModel[]): IOptionsData[] => {
  return models.map(
    (model: ActivityTypeModel): IOptionsData => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectActivityTypeOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.activityType.dataAll,
  _selectActivityTypeOptions
);

const _selectActivityTypeOptionsExludeSyst = (models: ActivityTypeModel[]): IOptionsData[] => {
  return models
    .filter((c) => c.textData !== 'System Activity')
    .map(
      (model: ActivityTypeModel): IOptionsData => ({
        text: model.textData,
        value: model.valueData,
      })
    );
};

export const selectActivityTypeOptionsExludeSyst: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.activityType.data,
  _selectActivityTypeOptionsExludeSyst
);
