import * as ServiceOwnerEffect from './ServiceOwnerEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import ServiceOwnerModel from './models/ServiceOwnerModel';

type ActionUnion = undefined | HttpErrorResponseModel | ServiceOwnerModel[];

export const REQUEST_SERVICE_OWNER: string = 'ServiceCatalogCategoryAction.REQUEST_SERVICE_OWNER';
export const REQUEST_SERVICE_OWNER_FINISHED: string = 'ServiceCatalogCategoryAction.REQUEST_SERVICE_OWNER_FINISHED';

export const requestServiceOwner = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceOwnerModel[]>(dispatch, REQUEST_SERVICE_OWNER, ServiceOwnerEffect.requestServiceOwner);
  };
};
