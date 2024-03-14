import * as CompetitorProductEffects from './CompetitorProductEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import CompetitorProductModel from './models/CompetitorProductModel';

type ActionUnion = undefined | HttpErrorResponseModel | CompetitorProductModel[];

export const REQUEST_COMPETITOR_PRODUCT: string = 'CompetitorProductAction.REQUEST_COMPETITOR_PRODUCT';
export const REQUEST_COMPETITOR_PRODUCT_FINISHED: string = 'CompetitorProductAction.REQUEST_COMPETITOR_PRODUCT_FINISHED';

export const requestCompetitorProduct = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CompetitorProductModel[]>(
      dispatch,
      REQUEST_COMPETITOR_PRODUCT,
      CompetitorProductEffects.requestCompetitorProduct
    );
  };
};

export const REQUEST_COMPETITOR_SERVICE: string = 'CompetitorProductAction.REQUEST_COMPETITOR_SERVICE';
export const REQUEST_COMPETITOR_SERVICE_FINISHED: string = 'CompetitorProductAction.REQUEST_COMPETITOR_SERVICE_FINISHED';

export const requestCompetitorService = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CompetitorProductModel[]>(
      dispatch,
      REQUEST_COMPETITOR_SERVICE,
      CompetitorProductEffects.requestCompetitorService
    );
  };
};
