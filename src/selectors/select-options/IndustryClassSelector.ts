import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';
import IndustryClassModel from 'stores/industry-class/models/IndustryClassModel';

const _selectIndustry = (models: IndustryClassModel[]): IOptionsData[] => {
  return models.map(
    (model: IndustryClassModel): IOptionsData => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectIndustryOptions: Selector<IStore, IOptionsData[]> = createSelector((state: IStore) => state.industryClass.data, _selectIndustry);
