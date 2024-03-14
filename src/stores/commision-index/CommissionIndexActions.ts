import * as CommissionIndexEffects from './CommissionIndexEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import CommissionIndexModel from './models/CommissionIndexModel';

type ActionUnion = undefined | HttpErrorResponseModel | CommissionIndexModel[];

export const REQUEST_COMMISION_INDEX: string = 'CommissionIndexActions.REQUEST_COMMISION_INDEX';
export const REQUEST_COMMISION_INDEX_FINISHED: string = 'CommissionIndexActions.REQUEST_COMMISION_INDEX_FINISHED';

export const requestCommissionIndex = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CommissionIndexModel[]>(dispatch, REQUEST_COMMISION_INDEX, CommissionIndexEffects.requestCommissionIndex);
  };
};
