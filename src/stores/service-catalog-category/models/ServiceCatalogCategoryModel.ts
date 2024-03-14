import { BaseModel } from 'sjs-base-model';

export default class ServiceCatalogCategoryModel extends BaseModel {
  public readonly udcid: number = 0;
  public readonly valueData: string = '';
  public readonly textData: string = '';

  constructor(data: Partial<ServiceCatalogCategoryModel>) {
    super();

    this.update(data);
  }
}
