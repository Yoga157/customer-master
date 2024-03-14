import * as IndustryClassEffect from './IndustryClassEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import IndustryClassModel from './models/IndustryClassModel';

type ActionUnion = undefined | HttpErrorResponseModel | IndustryClassModel[];

export const REQUEST_INDUSTRY: string = 'IndustryClassAction.REQUEST_INDUSTRY';
export const REQUEST_INDUSTRY_FINISHED: string = 'IndustryClassAction.REQUEST_INDUSTRY_FINISHED';

export const requestIndustry = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<IndustryClassModel[]>(dispatch, REQUEST_INDUSTRY, IndustryClassEffect.requestIndustry);
  };
};
