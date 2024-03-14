import IAction from 'models/IAction';
import * as ServiceCatalogEffect from './ServiceCatalogEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import ServiceCatalogModel from './models/ServiceCatalogModel';
import ServiceCatalogEnvelope from './models/ServiceCatalogEnvelope';
import {
  ServiceCatalogBrandModel,
  ServiceCatalogHeaderModel,
  ServiceCatalogManHour,
  ServiceCatalogPrice,
  ServiceCatalogProduct,
  ServiceCatalogServices,
} from './models/child-edit';
import ServiceCatalogModelAdd from './models/ServiceCatalogModelAdd';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | ServiceCatalogEnvelope
  | ServiceCatalogModel
  | ServiceCatalogModelAdd
  | ServiceCatalogHeaderModel
  | ServiceCatalogProduct
  | ServiceCatalogManHour
  | ServiceCatalogServices
  | ServiceCatalogPrice
  | boolean
  | ServiceCatalogBrandModel[];

export const REQUEST_SERVICE_CATALOGS: string = 'ServiceCatalogActions.REQUEST_SERVICE_CATALOGS';
export const REQUEST_SERVICE_CATALOGS_FINISHED: string = 'ServiceCatalogActions.REQUEST_SERVICE_CATALOGS_FINISHED';

export const requestServiceCatalog = (userLoginID: number,activeFlag:number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceCatalogEnvelope>(
      dispatch,
      REQUEST_SERVICE_CATALOGS,
      ServiceCatalogEffect.requestServiceCatalog,
      userLoginID,
      activeFlag,
      page,
      pageSize,
    );
  };
};

export const REQUEST_SERVICE_CATALOGS_ALL: string = 'ServiceCatalogActions.REQUEST_SERVICE_CATALOGS_ALL';
export const REQUEST_SERVICE_CATALOGS_ALL_FINISHED: string = 'ServiceCatalogActions.REQUEST_SERVICE_CATALOGS_ALL_FINISHED';

export const requestServiceCatalogAll = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceCatalogEnvelope>(
      dispatch,
      REQUEST_SERVICE_CATALOGS_ALL,
      ServiceCatalogEffect.requestServiceCatalogAll
    );
  };
};

export const REQUEST_SERVICE_CATALOGS_BY_FUNNEL: string = 'ServiceCatalogActions.REQUEST_SERVICE_CATALOGS_BY_FUNNEL';
export const RREQUEST_SERVICE_CATALOGS_BY_FUNNEL_FINISHED: string = 'ServiceCatalogActions.REQUEST_SERVICE_CATALOGS_BY_FUNNEL_FINISHED';

export const requestServiceCatalogByFunnel = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceCatalogEnvelope>(
      dispatch,
      REQUEST_SERVICE_CATALOGS_BY_FUNNEL,
      ServiceCatalogEffect.requestServiceCatalogByFunnel,
      funnelGenID
    );
  };
};

export const REQUEST_SERVICE_CATALOG: string = 'ServiceCatalogActions.REQUEST_SERVICE_CATALOG';
export const REQUEST_SERVICE_CATALOG_FINISHED: string = 'ServiceCatalogActions.REQUEST_SERVICE_CATALOG_FINISHED';

export const requestServiceCatalogById = (svcCatGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceCatalogModel>(
      dispatch,
      REQUEST_SERVICE_CATALOG,
      ServiceCatalogEffect.requestServiceCatalogById,
      svcCatGenID
    );
  };
};

export const REQUEST_SERVICE_CATALOG_BRAND_MODEL: string = 'ServiceCatalogActions.REQUEST_SERVICE_CATALOG_BRAND_MODEL';
export const REQUEST_SERVICE_CATALOG_BRAND_MODEL_FINISHED: string = 'ServiceCatalogActions.REQUEST_SERVICE_CATALOG_BRAND_MODEL_FINISHED';

export const requestServiceCatalogBrandModel = (svcCatGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceCatalogBrandModel[]>(
      dispatch,
      REQUEST_SERVICE_CATALOG_BRAND_MODEL,
      ServiceCatalogEffect.requestServiceCatalogBrandModel,
      svcCatGenID
    );
  };
};

export const POST_SERVICE_CATALOG: string = 'ServiceCatalogActions.REQUEST_POST_SERVICE_CATALOG';
export const POST_SERVICE_CATALOG_FINISHED = 'ServiceCatalogActions.REQUEST_POST_SERVICE_CATALOG_FINISHED';
export const postServiceCatalog = (data: ServiceCatalogModelAdd): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceCatalogModelAdd>(dispatch, POST_SERVICE_CATALOG, ServiceCatalogEffect.postServiceCatalog, data);
  };
};

export const PUT_SERVICE_CATALOG: string = 'ServiceCatalogActions.REQUEST_PUT_SERVICE_CATALOG';
export const PUT_SERVICE_CATALOG_FINISHED = 'ServiceCatalogActions.REQUEST_PUT_SERVICE_CATALOG_FINISHED';
export const putServiceCatalog = (data: ServiceCatalogModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceCatalogModel>(dispatch, PUT_SERVICE_CATALOG, ServiceCatalogEffect.putServiceCatalog, data);
  };
};

export const PUT_SERVICE_CATALOG_HEADER: string = 'ServiceCatalogActions.REQUEST_PUT_SERVICE_CATALOG_HEADER';
export const PUT_SERVICE_CATALOG_HEADER_FINISHED = 'ServiceCatalogActions.REQUEST_PUT_SERVICE_CATALOG_HEADER_FINISHED';
export const putServiceCatalogHeader = (data: ServiceCatalogHeaderModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceCatalogHeaderModel>(
      dispatch,
      PUT_SERVICE_CATALOG_HEADER,
      ServiceCatalogEffect.putServiceCatalogHeader,
      data
    );
  };
};

export const PUT_SERVICE_CATALOG_PRODUCT: string = 'ServiceCatalogActions.REQUEST_PUT_SERVICE_CATALOG_PRODUCT';
export const PUT_SERVICE_CATALOG_PRODUCT_FINISHED = 'ServiceCatalogActions.REQUEST_PUT_SERVICE_CATALOG_HEADER_FINISHED';
export const putServiceCatalogProduct = (data: ServiceCatalogProduct): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceCatalogProduct>(
      dispatch,
      PUT_SERVICE_CATALOG_PRODUCT,
      ServiceCatalogEffect.putServiceCatalogProduct,
      data
    );
  };
};

export const PUT_SERVICE_CATALOG_MAN_HOUR: string = 'ServiceCatalogActions.REQUEST_PUT_SERVICE_CATALOG_MAN_HOUR';
export const PUT_SERVICE_CATALOG_MAN_HOUR_FINISHED = 'ServiceCatalogActions.REQUEST_PUT_SERVICE_CATALOG_MAN_HOUR_FINISHED';
export const putServiceCatalogManHour = (data: ServiceCatalogManHour): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceCatalogManHour>(
      dispatch,
      PUT_SERVICE_CATALOG_MAN_HOUR,
      ServiceCatalogEffect.putServiceCatalogManHour,
      data
    );
  };
};

export const PUT_SERVICE_CATALOG_SERVICES: string = 'ServiceCatalogActions.REQUEST_PUT_SERVICE_CATALOG_SERVICES';
export const PUT_SERVICE_CATALOG_SERVICES_FINISHED = 'ServiceCatalogActions.REQUEST_PUT_SERVICE_CATALOG_SERVICES_FINISHED';
export const putServiceCatalogServices = (data: ServiceCatalogServices): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceCatalogServices>(
      dispatch,
      PUT_SERVICE_CATALOG_SERVICES,
      ServiceCatalogEffect.putServiceCatalogServices,
      data
    );
  };
};

export const PUT_SERVICE_CATALOG_PRICE: string = 'ServiceCatalogActions.REQUEST_PUT_SERVICE_CATALOG_PRICE';
export const PUT_SERVICE_CATALOG_PRICE_FINISHED = 'ServiceCatalogActions.REQUEST_PUT_SERVICE_CATALOG_PRICE_FINISHED';
export const putServiceCatalogPrice = (data: ServiceCatalogPrice): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceCatalogPrice>(
      dispatch,
      PUT_SERVICE_CATALOG_PRICE,
      ServiceCatalogEffect.putServiceCatalogPrice,
      data
    );
  };
};

export const REQUEST_SERVICE_CATALOG_SEARCH: string = 'ServiceCatalogActions.REQUEST_SERVICE_CATALOG_SEARCH';
export const REQUEST_SERVICE_CATALOG_SEARCH_FINISHED: string = 'ServiceCatalogActions.REQUEST_SERVICE_CATALOG_SEARCH_FINISHED';

export const requestServiceCatalogSearch = (userLoginID: number, text: string, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceCatalogEnvelope>(
      dispatch,
      REQUEST_SERVICE_CATALOG_SEARCH,
      ServiceCatalogEffect.requestServiceCatalogSearch,
      userLoginID,
      text,
      page,
      pageSize
    );
  };
};

export const REQUEST_DELETE_SERVICE_CATALOG: string = 'ServiceCatalogActions.REQUEST_DELETE_SERVICE_CATALOG';
export const REQUEST_DELETE_SERVICE_CATALOG_FINISHED: string = 'ServiceCatalogActions.REQUEST_DELETE_SERVICE_CATALOG_FINISHED';

export const delServiceCatalog = (svcCatGenID: number, userLogin: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceCatalogModel>(
      dispatch,
      REQUEST_DELETE_SERVICE_CATALOG,
      ServiceCatalogEffect.delServiceCatalog,
      svcCatGenID,
      userLogin
    );
  };
};

export const FLAG_AKTIVE: string = 'ServiceCatalogActions.FLAG_AKTIVE';
export const flagActive = (status: boolean): IAction<boolean> => {
  return ActionUtility.createAction(FLAG_AKTIVE, status);
};
