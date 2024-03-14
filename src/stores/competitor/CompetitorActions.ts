import * as CompetitorEffects from './CompetitorEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import CompetitorModel from './models/CompetitorModel';

type ActionUnion = undefined | HttpErrorResponseModel | CompetitorModel[];

export const REQUEST_COMPETITOR: string = 'BankAction.REQUEST_COMPETITOR';
export const REQUEST_COMPETITOR_FINISHED: string = 'BankAction.REQUEST_COMPETITOR_FINISHED';

export const requestCompetitor = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CompetitorModel[]>(dispatch, REQUEST_COMPETITOR, CompetitorEffects.requestCompetitor);
  };
};
