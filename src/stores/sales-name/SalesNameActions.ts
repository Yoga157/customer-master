import { ReduxDispatch } from '../../models/ReduxProps';
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from '../../utilities/ActionUtility';
import SalesNameModel from './models/SalesNameModel';
import * as SalesNameEffect from './SalesNameEffects';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | SalesNameModel;

export const REQUEST_SEARCH_SALES_NAME: string = 'SalesNameActions.REQUEST_SEARCH_SALES_NAME';
export const REQUEST_SEARCH_SALES_NAME_FINISHED: string = 'SalesNameActions.REQUEST_SEARCH_SALES_NAME_FINISHED';

export const requestSearchSalesName = (search: string): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<SalesNameModel>(
        dispatch,
        REQUEST_SEARCH_SALES_NAME,
        SalesNameEffect.requestSearchSalesName,
        search
      );
    };
  };