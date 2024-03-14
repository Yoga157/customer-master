import ServiceCatalogCategoryModel from './ServiceCatalogCategoryModel';

export default interface IServiceCatalogCategoryState {
  readonly data: ServiceCatalogCategoryModel[];
  readonly error: boolean;
}
