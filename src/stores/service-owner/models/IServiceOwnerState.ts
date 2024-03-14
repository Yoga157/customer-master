import ServiceOwnerModel from './ServiceOwnerModel';

export default interface IServiceCatalogCategoryState {
  readonly data: ServiceOwnerModel[];
  readonly error: boolean;
}
