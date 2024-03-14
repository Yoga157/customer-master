import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import ServiceCatalogCategoryModel from '../../stores/service-catalog-category/models/ServiceCatalogCategoryModel';
import IOptionsData from './models/IOptionsData';

const _selectServiceCatalogCategory = (models: ServiceCatalogCategoryModel[]): IOptionsData[] => {
  return models.map(
    (model: ServiceCatalogCategoryModel): IOptionsData => ({
      text: model.textData,
      value: +model.valueData,
    })
  );
};

export const selectServiceCatalogCategory: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.serviceCatalogCategory.data,
  _selectServiceCatalogCategory
);
