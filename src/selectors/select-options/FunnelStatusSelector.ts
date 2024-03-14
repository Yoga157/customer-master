import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';
import FunnelStatusModel from 'stores/funnel-status/models/FunnelStatusModel';

const _selectFunnelStatus = (models: FunnelStatusModel[]): IOptionsData[] => {
  return models.map(
    (model: FunnelStatusModel): IOptionsData => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectFunnelStatusOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.funnelStatus.data,
  _selectFunnelStatus
);
