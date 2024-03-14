import * as LanguageEffect from './LanguageEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import LanguageModel from './models/LanguageModel';

type ActionUnion = undefined | HttpErrorResponseModel | LanguageModel[];

export const REQUEST_LANGUAGE: string = 'LanguageAction.REQUEST_LANGUAGE';
export const REQUEST_LANGUAGE_FINISHED: string = 'LanguageAction.REQUEST_LANGUAGE_FINISHED';

export const requestLanguage = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<LanguageModel[]>(dispatch, REQUEST_LANGUAGE, LanguageEffect.requestLanguage);
  };
};
