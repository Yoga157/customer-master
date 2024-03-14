import { createSelector, Selector } from 'reselect';
import ISearchResult from './models/ISearchResult';
import IStore from '../../models/IStore';
import FunnelTopType from 'stores/funnel-top/models/FunnelTopType';
import IOptionsData from './models/IOptionsData';
import PMOSOorOIExist from 'stores/pmo/models/PMOSOorOIExist';
import SearchTopNumberModel from 'stores/funnel-top/models/SearchTopNumberModel';

const _selectFunnelTopTypeOptions = (models: FunnelTopType[]): IOptionsData[] => {
  return models.map(
    (model: FunnelTopType): IOptionsData => ({
      text: model.text1,
      value: model.udcid,
    })
  );
};

export const selectFunnelTopTypeOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.funnelTop.listTopType,
  _selectFunnelTopTypeOptions
);


const _selectSearchTopNumber = (models: SearchTopNumberModel[]): ISearchResult[] => {
  return models.map(
    (model: SearchTopNumberModel): ISearchResult => ({
      title: model.valueData,
      price:  model.textData,
      descriptions: model.textData,
    })
  );
};

export const selectSearchTopNumber: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.funnelTop.searchTopNumber,
  _selectSearchTopNumber
);
