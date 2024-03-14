import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import ProductCategoryModel from './models/ProductCategoryModel';
import * as ProductCategoryEffect from './ProductCategoryEffect';

type ActionUnion = undefined | HttpErrorResponseModel | ProductCategoryModel[];

export const REQUEST_PRODUCT_CATEGORY: string = 'ServiceCatalogCategoryAction.REQUEST_PRODUCT_CATEGORY';
export const REQUEST_PRODUCT_CATEGORY_FINISHED: string = 'ServiceCatalogCategoryAction.REQUEST_PRODUCT_CATEGORY_FINISHED';

export const requestProductCategory = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductCategoryModel[]>(dispatch, REQUEST_PRODUCT_CATEGORY, ProductCategoryEffect.requestProductCategory);
  };
};
