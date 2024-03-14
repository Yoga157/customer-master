import IServiceCatalogCategoryState from './models/IServiceCatalogCategoryState';
import * as ServiceCatalogCategoryActions from './ServiceCatalogCategoryAction';
import IAction from '../../models/IAction';
import ServiceCatalogCategoryModel from './models/ServiceCatalogCategoryModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IServiceCatalogCategoryState = {
  data: [],
  error: false,
};

const serviceCatalogCategoryReducer: Reducer = baseReducer(initialState, {
  [ServiceCatalogCategoryActions.REQUEST_SERVICE_CATALOG_CATEGORY_FINISHED](
    state: IServiceCatalogCategoryState,
    action: IAction<ServiceCatalogCategoryModel[]>
  ): IServiceCatalogCategoryState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default serviceCatalogCategoryReducer;
