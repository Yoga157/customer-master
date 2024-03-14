import * as CoverageHourEffect from './CoverageHourEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import CoverageHourModel from './models/CoverageHourModel';

type ActionUnion = undefined | HttpErrorResponseModel | CoverageHourModel[];

export const REQUEST_COVERAGE_HOUR: string = 'CoverageHourAction.REQUEST_COVERAGE_HOUR';
export const REQUEST_COVERAGE_HOUR_FINISHED: string = 'CoverageHourAction.REQUEST_COVERAGE_HOUR_FINISHED';

export const requestCoverageHour = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CoverageHourModel[]>(dispatch, REQUEST_COVERAGE_HOUR, CoverageHourEffect.requestCoverageHour);
  };
};
