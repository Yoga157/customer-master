import ServiceCatalogModel from './ServiceCatalogModel';
import { BaseModel } from 'sjs-base-model';

export default class ServiceCatalogEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly data: ServiceCatalogModel[] = [];

  constructor(data: Partial<ServiceCatalogEnvelope>) {
    super();
    this.update(data);
  }
}
