import * as InsuranceEffect from './InsuranceEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import InsuranceModel from './models/InsuranceModel';

type ActionUnion = undefined | HttpErrorResponseModel | InsuranceModel[];

export const REQUEST_INSURANCE: string = 'InsuranceAction.REQUEST_Insurance';
export const REQUEST_INSURANCE_FINISHED: string = 'InsuranceAction.REQUEST_Insurance_FINISHED';

export const requestInsurance = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<InsuranceModel[]>(dispatch, REQUEST_INSURANCE, InsuranceEffect.requestInsurance);
  };
};
