import * as BondIssuerEffect from './BondIssuerEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import BondIssuerModel from './models/BondIssuerModel';

type ActionUnion = undefined | HttpErrorResponseModel | BondIssuerModel[];

export const REQUEST_BOND_ISSUER: string = 'BondIssuerAction.REQUEST_BOND_ISSUER';
export const REQUEST_BOND_ISSUER_FINISHED: string = 'BondIssuerAction.REQUEST_BOND_ISSUER_FINISHED';

export const requestBondIssuer = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BondIssuerModel[]>(dispatch, REQUEST_BOND_ISSUER, BondIssuerEffect.requestBondIssuer);
  };
};
