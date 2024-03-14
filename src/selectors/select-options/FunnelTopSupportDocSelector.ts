import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import FunnelTopSupportDoc from 'stores/funnel-top/models/FunnelTopSupportDoc';
import IOptionsData from './models/IOptionsDataString';

const _selectFunnelTopSupportDocOptions = (models: FunnelTopSupportDoc[]): IOptionsData[] => {
  return models.map(
    (model: FunnelTopSupportDoc): IOptionsData => ({
      text: model.text1,
      value: model.text1,
    })
  );
};

export const selectFunnelTopSupportDocOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.funnelTop.listSupportingDoc,
  _selectFunnelTopSupportDocOptions
);
