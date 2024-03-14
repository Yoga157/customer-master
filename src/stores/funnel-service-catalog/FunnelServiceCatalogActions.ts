import * as FunnelServiceCatalogEffects from './FunnelServiceCatalogEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import FunnelServiceCatalogModel from './models/FunnelServiceCatalogModel';
import FunnelServiceCatalogEnvelope from './models/FunnelServiceCatalogEnvelope';
import DiscountServiceModel from './models/DiscountServiceModel';

type ActionUnion = undefined | HttpErrorResponseModel | boolean | FunnelServiceCatalogModel | FunnelServiceCatalogEnvelope | DiscountServiceModel;

export const REQUEST_FUNNEL_SERVICE_CATALOG: string = 'FunnelServiceCatalogActions.REQUEST_FUNNEL_SERVICE_CATALOG';
export const REQUEST_FUNNEL_SERVICE_CATALOG_FINISHED: string = 'FunnelServiceCatalogActions.REQUEST_FUNNEL_SERVICE_CATALOG_FINISHED';

export const requestFunnelServiceCatalog = (funnelGenID: number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelServiceCatalogEnvelope>(
      dispatch,
      REQUEST_FUNNEL_SERVICE_CATALOG,
      FunnelServiceCatalogEffects.requestFunnelServiceCatalog,
      funnelGenID,
      page,
      pageSize
    );
  };
};

export const REQUEST_POST_FUNNEL_SERVICE_CATALOG: string = 'FunnelServiceCatalogActions.REQUEST_POST_FUNNEL_SERVICE_CATALOG';
export const REQUEST_POST_FUNNEL_SERVICE_CATALOG_FINISHED: string = 'FunnelServiceCatalogActions.REQUEST_POST_FUNNEL_SERVICE_CATALOG_FINISHED';

export const postFunnelServiceCatalog = (data: FunnelServiceCatalogModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelServiceCatalogModel>(
      dispatch,
      REQUEST_POST_FUNNEL_SERVICE_CATALOG,
      FunnelServiceCatalogEffects.postFunnelServiceCatalog,
      data
    );
  };
};

export const REQUEST_DEL_FUNNEL_SERVICE_CATALOG: string = 'FunnelServiceCatalogActions.REQUEST_DEL_FUNNEL_SERVICE_CATALOG';
export const REQUEST_DEL_FUNNEL_SERVICE_CATALOG_FINISHED: string = 'FunnelServiceCatalogActions.REQUEST_DEL_FUNNEL_SERVICE_CATALOG_FINISHED';

export const delFunnelServiceCatalog = (funnelSvcCatGenID: number, userLogin: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelServiceCatalogModel>(
      dispatch,
      REQUEST_DEL_FUNNEL_SERVICE_CATALOG,
      FunnelServiceCatalogEffects.delFunnelServiceCatalog,
      funnelSvcCatGenID,
      userLogin
    );
  };
};

export const REQUEST_POST_FUNNEL_SERVICE_CATALOG_ID: string = 'FunnelServiceCatalogActions.REQUEST_POST_FUNNEL_SERVICE_CATALOG_ID';
export const REQUEST_POST_FUNNEL_SERVICE_CATALOG_ID_FINISHED: string = 'FunnelServiceCatalogActions.REQUEST_POST_FUNNEL_SERVICE_CATALOG_ID_FINISHED';

export const postFunnelServiceCatalogIDLocal = (data: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<boolean>(
      dispatch,
      REQUEST_POST_FUNNEL_SERVICE_CATALOG_ID,
      FunnelServiceCatalogEffects.postFunnelServiceCatalogIDLocal,
      data
    );
  };
};

export const REQUEST_DELETE_FUNNEL_SERVICE_CATALOG_ID: string = 'FunnelServiceCatalogActions.REQUEST_DELETE_FUNNEL_SERVICE_CATALOG_ID';
export const REQUEST_DELETE_FUNNEL_SERVICE_CATALOG_ID_FINISHED: string =
  'FunnelServiceCatalogActions.REQUEST_DELETE_FUNNEL_SERVICE_CATALOG_ID_FINISHED';

export const deleteFunnelServiceCatalogIDLocal = (data: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<boolean>(
      dispatch,
      REQUEST_DELETE_FUNNEL_SERVICE_CATALOG_ID,
      FunnelServiceCatalogEffects.deleteFunnelServiceCatalogIDLocal,
      data
    );
  };
};

export const REQUEST_POST_DISCOUNT_SERVICE: string = 'FunnelServiceCatalogActions.REQUEST_POST_DISCOUNT_SERVICE';
export const REQUEST_POST_DISCOUNT_SERVICE_FINISHED: string = 'FunnelServiceCatalogActions.REQUEST_POST_DISCOUNT_SERVICE_FINISHED';

export const postRequestDiscount = (data: DiscountServiceModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<DiscountServiceModel>(
      dispatch,
      REQUEST_POST_DISCOUNT_SERVICE,
      FunnelServiceCatalogEffects.postRequestDiscount,
      data
    );
  };
};

export const REQUEST_FUNNEL_SERVICE_CATALOG_FIRST: string = 'FunnelServiceCatalogActions.REQUEST_FUNNEL_SERVICE_CATALOG_FIRST';
export const REQUEST_FUNNEL_SERVICE_CATALOG_FIRST_FINISHED: string = 'FunnelServiceCatalogActions.REQUEST_FUNNEL_SERVICE_CATALOG_FIRST_FINISHED';

export const requestFunnelServiceCatalogFirst = (funnrlSvcCatGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelServiceCatalogModel>(
      dispatch,
      REQUEST_FUNNEL_SERVICE_CATALOG_FIRST,
      FunnelServiceCatalogEffects.requestFunnelServiceCatalogFirst,
      funnrlSvcCatGenID
    );
  };
};

export const REQUEST_PUT_FUNNEL_SERVICE_CATALOG: string = 'FunnelServiceCatalogActions.REQUEST_PUT_FUNNEL_SERVICE_CATALOG';
export const REQUEST_PUT_FUNNEL_SERVICE_CATALOG_FINISHED: string = 'FunnelServiceCatalogActions.REQUEST_PUT_FUNNEL_SERVICE_CATALOG_FINISHED';

export const putFunnelServiceCatalog = (data: FunnelServiceCatalogModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelServiceCatalogModel>(
      dispatch,
      REQUEST_PUT_FUNNEL_SERVICE_CATALOG,
      FunnelServiceCatalogEffects.putFunnelServiceCatalog,
      data
    );
  };
};
