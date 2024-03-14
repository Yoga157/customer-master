import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';
import SubBrandModel from 'stores/brand-sub/models/SubBrandModel';

const _selectSubBrand = (models: SubBrandModel[]): IOptionsData[] => {
  return models.map(
    (model: SubBrandModel): IOptionsData => ({
      text: model.subBrandName,
      value: model.subBrandID,
    })
  );
};

export const selectSubBrandOptions: Selector<IStore, IOptionsData[]> = createSelector((state: IStore) => state.subBrand.data, _selectSubBrand);

const _selectSubBrandByProd = (models: any[]): IOptionsData[] => {
  return models.map(
    (model: any): IOptionsData => ({
      text: model.subBrandName,
      value: model.subBrandID,
    })
  );
};

export const selectSubBrandOptionsByProd: Selector<IStore, IOptionsData[]> = createSelector((state: IStore) => state.subBrand.dataSubBrand, _selectSubBrandByProd);

const _selectSubBrandGroup = (models: SubBrandModel[]): IOptionsData[] => {
  const resultSubBrand = models.map(
    (model: SubBrandModel, index: number): IOptionsData => ({
      text: model.subBrandName,
      value: model.groupID,
      key: index
    })
  );

  return Array.from(new Set(resultSubBrand));
};

export const selectSubBrandGroupOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.subBrand.data,
  _selectSubBrandGroup
);
