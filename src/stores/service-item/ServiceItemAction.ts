import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import * as ServiceEffect from './ServiceItemEffect';
import ServiceItemModel from './models/ServiceItemModel';

type ActionUnion = undefined | HttpErrorResponseModel | ServiceItemModel[];

export const REQUEST_SERVICE_ITEM: string = 'ServiceItemAction.REQUEST_SERVICE_ITEM';
export const REQUEST_SERVICE_ITEM_FINISHED: string = 'ServiceItemAction.REQUEST_SERVICE_ITEM_FINISHED';

export const requestServiceItem = (deptID: string, funnelGenID: number, itemID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceItemModel[]>(
      dispatch,
      REQUEST_SERVICE_ITEM,
      ServiceEffect.requestServiceItem,
      deptID,
      funnelGenID,
      itemID
    );
  };
};
