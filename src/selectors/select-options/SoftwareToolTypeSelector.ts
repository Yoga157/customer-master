import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';
import SoftwareTypeModel from 'stores/software/models/SoftwareTypeModel';

const _selectSoftwareToolType = (models: SoftwareTypeModel[]): IOptionsData[] => {
  return models.map(
    (model: SoftwareTypeModel): IOptionsData => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectSoftwareToolTypeOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.software.softwareToolType,
  _selectSoftwareToolType
);
