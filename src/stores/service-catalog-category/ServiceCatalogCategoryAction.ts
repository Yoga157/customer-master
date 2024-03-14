import * as ServiceCatalogCategoryEffect from './ServiceCatalogCategoryEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import ServiceCatalogCategoryModel from './models/ServiceCatalogCategoryModel';

type ActionUnion = undefined | HttpErrorResponseModel | ServiceCatalogCategoryModel[];

export const REQUEST_SERVICE_CATALOG_CATEGORY: string = 'ServiceCatalogCategoryAction.REQUEST_SERVICE_CATALOG_CATEGORY';
export const REQUEST_SERVICE_CATALOG_CATEGORY_FINISHED: string = 'ServiceCatalogCategoryAction.REQUEST_SERVICE_CATALOG_CATEGORY_FINISHED';

export const requestServiceCatalogCategory = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceCatalogCategoryModel[]>(
      dispatch,
      REQUEST_SERVICE_CATALOG_CATEGORY,
      ServiceCatalogCategoryEffect.requestServiceCatalogCategory
    );
  };
};
