import { createSelector, Selector } from 'reselect';
import IStore from 'models/IStore';
import IOptionsData from './models/IOptionsData';
import ServiceCatalogEnvelope from 'stores/service-catalog/models/ServiceCatalogEnvelope';
import ServiceCatalogModel from 'stores/service-catalog/models/ServiceCatalogModel';
import { ServiceCatalogBrandModel } from 'stores/service-catalog/models/child-edit';
import FunnelServiceCatalogEnvelope from 'stores/funnel-service-catalog/models/FunnelServiceCatalogEnvelope';

const _selectServiceCatalogReff = (models: ServiceCatalogEnvelope): IOptionsData[] => {
  return models.data.map(
    (model: ServiceCatalogModel): IOptionsData => ({
      text: model.svcCatReffID + '-' + model.svcName,
      value: model.svcCatGenID,
    })
  );
};

export const selectServiceCatalogReffOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.serviceCatalog.data,
  _selectServiceCatalogReff
);

const _selectServiceCatalogBrandModel = (
  models: ServiceCatalogBrandModel[],
  funnelServiceCatalogEnv: FunnelServiceCatalogEnvelope
): IOptionsData[] => {
  return models
    .filter((c) => funnelServiceCatalogEnv.rows.filter((b) => b.brandModelGenID !== c.brandModelGenID))
    .map(
      (model: ServiceCatalogBrandModel): IOptionsData => ({
        text: model.modelName,
        value: model.brandModelGenID,
      })
    );
};

export const selectServiceCatalogBrandModel: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.serviceCatalog.serviceCatalogBrandModel,
  (state: IStore) => state.funnelServiceCatalog.listData,
  _selectServiceCatalogBrandModel
);
