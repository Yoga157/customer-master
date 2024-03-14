//import * as PresalesSupportEffect from './PresalesSupportEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import PresalesSupportModel from './models/PresalesSupportModel';
import * as PresalesSupportEffect from './PresalesSupportEffect';

type ActionUnion = undefined | HttpErrorResponseModel | PresalesSupportModel[];

export const REQUEST_PRESALES: string = 'PresalesSupportAction.REQUEST_PRESALES';
export const REQUEST_PRESALES_FINISHED: string = 'PresalesSupportAction.REQUEST_PRESALES_FINISHED';

export const requestPresales = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<PresalesSupportModel[]>(dispatch, REQUEST_PRESALES, PresalesSupportEffect.requestPresales);
  };
};
