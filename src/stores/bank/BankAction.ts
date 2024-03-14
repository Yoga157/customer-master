import * as BankEffect from './BankEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import BankModel from './models/BankModel';

type ActionUnion = undefined | HttpErrorResponseModel | BankModel[];

export const REQUEST_BANK: string = 'BankAction.REQUEST_BANK';
export const REQUEST_BANK_FINISHED: string = 'BankAction.REQUEST_BANK_FINISHED';

export const requestBank = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BankModel[]>(dispatch, REQUEST_BANK, BankEffect.requestBank);
  };
};
