import { BaseModel } from 'sjs-base-model';
import ProductServiceModel from './ProductServiceModel';

export default class ProductServiceEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: ProductServiceModel[] = [];
  public readonly totalItemProduct:number = 0 ;
  public readonly totalItemService:number = 0 ;

  constructor(data: Partial<ProductServiceEnvelope>) {
    super();
    this.update(data);
  }
}
