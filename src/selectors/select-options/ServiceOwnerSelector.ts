import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import ServiceCatalogCategoryModel from '../../stores/service-catalog-category/models/ServiceCatalogCategoryModel';
import IOptionsData from './models/IOptionsData';

const _selectServiceOnwer = (models: ServiceCatalogCategoryModel[]): any[] => {

  return models.map(
    (model: ServiceCatalogCategoryModel): any => ({
      udcid: model.udcid,
      text: model.textData,
      value: `${model.valueData}.${model.udcid}`,
    })
  );
};

export const selectServiceOwnerOptions: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.serviceOwner.data,
  _selectServiceOnwer
);
