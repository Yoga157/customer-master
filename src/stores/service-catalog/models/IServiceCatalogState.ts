import { ServiceCatalogBrandModel } from './child-edit';
import ServiceCatalogModels from './ServiceCatalogEnvelope';
import ServiceCatalogModel from './ServiceCatalogModel';

export default interface IServiceCatalogState {
  readonly data: ServiceCatalogModels;
  readonly firstData: ServiceCatalogModel;
  readonly serviceCatalogBrandModel: ServiceCatalogBrandModel[];
  readonly error: boolean;
  readonly refreshPage: boolean;
  readonly isActive: boolean;
  readonly meta: any;
}
