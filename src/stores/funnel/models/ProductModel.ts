import { BaseModel } from 'sjs-base-model';

export default class ProductModel extends BaseModel {
  id: number = 0;
  type: string = '';
  brand: string = '';
  brandName: string = '';
  subBrand: string = '';
  description: string = '';
  orderingPrice: number = 0;
  sellingPrice: number = 0;

  constructor(data: Partial<ProductModel>) {
    super();
    this.update(data);
  }
}
