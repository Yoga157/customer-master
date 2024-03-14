import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';
import SoftwareTypeModel from 'stores/software/models/SoftwareTypeModel';

const _selectSubSoftwareType = (models: SoftwareTypeModel[]): IOptionsData[] => {
  return models.map(
    (model: SoftwareTypeModel): IOptionsData => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectSubSoftwareTypeOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.software.subSoftwareType,
  _selectSubSoftwareType
);
