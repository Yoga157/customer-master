import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';
import BrandTypeModel from 'stores/brand-model/models/BrandTypeModel';

const _selectBrandModel = (models: BrandTypeModel[]): IOptionsData[] => {
  return models.map(
    (model: BrandTypeModel): IOptionsData => ({
      text: model.modelName,
      value: model.brandModelGenID,
    })
  );
};

export const selectBrandModelOptions: Selector<IStore, IOptionsData[]> = createSelector((state: IStore) => state.brandModel.data, _selectBrandModel);
