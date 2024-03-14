import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';
import CompetitorProductModel from 'stores/competitor-product/models/CompetitorProductModel';

const _selectCompetitorProduct = (models: CompetitorProductModel[]): IOptionsData[] => {
  return models.map(
    (model: CompetitorProductModel): IOptionsData => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectCompetitorProductOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.competitorProduct.data,
  _selectCompetitorProduct
);

const _selectCompetitorService = (models: CompetitorProductModel[]): IOptionsData[] => {
  return models.map(
    (model: CompetitorProductModel): IOptionsData => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectCompetitorServiceOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.competitorProduct.dataService,
  _selectCompetitorService
);
