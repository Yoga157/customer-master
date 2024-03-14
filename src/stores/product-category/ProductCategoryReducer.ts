import * as ProductCategoryAction from './ProductCategoryAction';
import IAction from '../../models/IAction';
import ProductCategoryModel from './models/ProductCategoryModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import IProductCategoryState from './models/IProductCategoryState';

export const initialState: IProductCategoryState = {
  data: [],
  error: false,
};

const productCategoryReducer: Reducer = baseReducer(initialState, {
  [ProductCategoryAction.REQUEST_PRODUCT_CATEGORY_FINISHED](
    state: IProductCategoryState,
    action: IAction<ProductCategoryModel[]>
  ): IProductCategoryState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default productCategoryReducer;
