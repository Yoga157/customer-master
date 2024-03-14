import * as LetterTypeEffect from './LetterTypeEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import LetterTypeModel from './models/LetterTypeModel';

type ActionUnion = undefined | HttpErrorResponseModel | LetterTypeModel[];

export const REQUEST_LETTER_TYPE: string = 'LetterTypeAction.REQUEST_LETTER_TYPE';
export const REQUEST_LETTER_TYPE_FINISHED: string = 'LetterTypeAction.REQUEST_LETTER_TYPE_FINISHED';

export const requestLetterType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<LetterTypeModel[]>(dispatch, REQUEST_LETTER_TYPE, LetterTypeEffect.requestLetterType);
  };
};
