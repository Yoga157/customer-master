import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import FunnelTopItem from 'stores/funnel-top/models/FunnelTopItem';
import IOptionsData from './models/IOptionsData';

const _selectFunnelTopItemOptions = (models: FunnelTopItem[]): IOptionsData[] => {
  return models.map(
    (model: FunnelTopItem): IOptionsData => ({
      text: model.text1,
      value: model.udcid,
    })
  );
};

export const selectFunnelTopItemOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.funnelTop.listTopItem,
  _selectFunnelTopItemOptions
);
