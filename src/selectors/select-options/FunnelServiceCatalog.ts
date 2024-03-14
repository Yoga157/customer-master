import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';
import FunnelServiceCatalogDashboard from 'stores/funnel-service-catalog/models/FunnelServiceCatalogDashboard';

const _selectServiceReff = (models: FunnelServiceCatalogDashboard[]): IOptionsData[] => {
  return models.map(
    (model: FunnelServiceCatalogDashboard): IOptionsData => ({
      text: model.svcCatReffID,
      value: model.svcCatGenID,
    })
  );
};

export const selectFunnelServiceReffOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.funnelServiceCatalog.listData.rows!,
  _selectServiceReff
);
