import * as PresalesViewEffect from './PresalesViewEffect';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import { ReduxDispatch } from 'models/ReduxProps';
import PresalesViewResult from './models/PresalesViewResult';

type ActionUnion = undefined | HttpErrorResponseModel | PresalesViewResult[];

export const REQUEST_PRESALES_VIEW: string = 'PresalesView.REQUEST_PRESALES_VIEW';
export const REQUEST_PRESALES_VIEW_FINISHED: string = 'PresalesView.REQUEST_PRESALES_VIEW_FINISHED';

export const getPresalesView = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PresalesViewResult[]>(dispatch, REQUEST_PRESALES_VIEW, PresalesViewEffect.getPresalesView);
  };
};
