import * as FunnelStatusEffects from './FunnelStatusEffects';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import { ReduxDispatch } from 'models/ReduxProps';
import IStore from 'models/IStore';
import FunnelStatusModel from './models/FunnelStatusModel';
import FunnelStatusUdcModel from './models/FunnelStatusUdcModel';

type ActionUnion = undefined | HttpErrorResponseModel | FunnelStatusModel[] | FunnelStatusUdcModel;

export const REQUEST_FUNNEL_STATUS: string = 'FunnelStatusActions.REQUEST_FUNNEL_STATUS';
export const REQUEST_FUNNEL_STATUS_FINISHED: string = 'FunnelStatusActions.REQUEST_FUNNEL_STATUS_FINISHED';

export const requestFunnelStatus = (type: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelStatusModel[]>(dispatch, REQUEST_FUNNEL_STATUS, FunnelStatusEffects.requestFunnelStatus, type);
  };
};

export const REQUEST_FUNNEL_STATUS_BY_ID: string = 'FunnelStatusActions.REQUEST_FUNNEL_STATUS_BY_ID';
export const REQUEST_FUNNEL_STATUS_BY_ID_FINISHED: string = 'FunnelStatusActions.REQUEST_FUNNEL_STATUS_BY_ID_FINISHED';

export const requestFunnelStatusById = (id: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelStatusUdcModel>(
      dispatch,
      REQUEST_FUNNEL_STATUS_BY_ID,
      FunnelStatusEffects.requestFunnelStatusById,
      id
    );
  };
};
