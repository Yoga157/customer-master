import * as WhatsNewEffect from './WhatsNewEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import ResultActions from 'models/ResultActions';

type ActionUnion = undefined | HttpErrorResponseModel | ResultActions;

export const REQUEST_WHATS_NEW_NAVBAR: string = 'WhatsNewActions.REQUEST_WHATS_NEW_NAVBAR';
export const REQUEST_WHATS_NEW_NAVBAR_FINISHED: string = 'WhatsNewActions.REQUEST_WHATS_NEW_NAVBAR_FINISHED';

export const requestWhatsNew = (year: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_WHATS_NEW_NAVBAR, WhatsNewEffect.requestWhatsNew, year);
  };
};
