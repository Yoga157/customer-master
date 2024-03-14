import * as ResponseResolutionEffects from './ResponseResolutionEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import ResponseResolutionModel from './models/ResponseResolutionModel';

type ActionUnion = undefined | HttpErrorResponseModel | ResponseResolutionModel[];

export const REQUEST_RESPONSE_RESOLUTION: string = 'ResponseResolutionAction.REQUEST_RESPONSE_RESOLUTION';
export const REQUEST_RESPONSE_RESOLUTION_FINISHED: string = 'ResponseResolutionAction.REQUEST_RESPONSE_RESOLUTION_FINISHED';

export const requestResponseResolution = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ResponseResolutionModel[]>(
      dispatch,
      REQUEST_RESPONSE_RESOLUTION,
      ResponseResolutionEffects.requestResponseResolution
    );
  };
};
