import * as PMOSupportEffects from './PMOSupportEffects';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import { ReduxDispatch } from 'models/ReduxProps';
import IStore from 'models/IStore';
import PMOSupportModel from './models/PMOSupportModel';

type ActionUnion = undefined | HttpErrorResponseModel | PMOSupportModel[];

export const REQUEST_PMO: string = 'PMOSupportActions.REQUEST_PMO';
export const REQUEST_PMO_FINISHED: string = 'PMOSupportActions.REQUEST_PMO_FINISHED';

export const requestPMO = (salesID: number, customerID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOSupportModel[]>(dispatch, REQUEST_PMO, PMOSupportEffects.requestPMO, salesID, customerID);
  };
};
