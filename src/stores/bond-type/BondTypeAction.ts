import * as BondTypeEffect from './BondTypeEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import BondTypeModel from './models/BondTypeModel';

type ActionUnion = undefined | HttpErrorResponseModel | BondTypeModel[];

export const REQUEST_BOND_TYPE: string = 'BondTypeAction.REQUEST_BOND_TYPE';
export const REQUEST_BOND_TYPE_FINISHED: string = 'BondTypeAction.REQUEST_BOND_TYPE_FINISHED';

export const requestBondType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BondTypeModel[]>(dispatch, REQUEST_BOND_TYPE, BondTypeEffect.requestBondType);
  };
};
