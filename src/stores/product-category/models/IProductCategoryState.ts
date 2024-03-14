import ProductCategoryModeil from './ProductCategoryModel';

export default interface IProductCategoryState {
  readonly data: ProductCategoryModeil[];
  readonly error: boolean;
}
