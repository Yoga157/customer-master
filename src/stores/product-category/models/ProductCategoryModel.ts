import { BaseModel } from 'sjs-base-model';

export default class ProductCategoryModel extends BaseModel {
  public readonly valueData: number = 0;
  public readonly textData: string = '';

  constructor(data: Partial<ProductCategoryModel>) {
    super();

    this.update(data);
  }
}
