import * as CustomerNameEffect from "./CustomerNameActivityEffects";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import CustomerNameModel from "./models/CustomerNameModel";
import ResultActions from "models/ResultActions";
import IAction from "models/IAction";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | CustomerNameModel
  | ResultActions;

export const REQUEST_SEARCH_CUSTOMER_NAME: string = "CustomerNameAction.REQUEST_SEARCH_CUSTOMER_NAME";
export const REQUEST_SEARCH_CUSTOMER_NAME_FINISHED: string = "CustomerNameAction.REQUEST_SEARCH_CUSTOMER_NAME_FINISHED";

export const requestSearchCustomerName = (search: string): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<CustomerNameModel>(
            dispatch,
            REQUEST_SEARCH_CUSTOMER_NAME,
            CustomerNameEffect.requestSearchCustomerName,
            search
        )
    }
}

export const REQUEST_CUSTOMER_BY_ID: string = "CustomerNameAction.REQUEST_CUSTOMER_BY_ID";
export const REQUEST_CUSTOMER_BY_ID_FINISHED: string = "CustomerNameAction.REQUEST_CUSTOMER_BY_ID_FINISHED";

export const requestCustomerById = (customerId: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<CustomerNameModel>(
            dispatch,
            REQUEST_CUSTOMER_BY_ID,
            CustomerNameEffect.requestCustomerById,
            customerId
        )
    }
}

export const CLEAR_RESULT_CUSTOMER_NAME: string = "CustomerNameActions.CLEAR_RESULT_CUSTOMER_NAME";
export const CLEAR_RESULT_CUSTOMER_NAME_FINISHED: string =
  "CustomerNameActions.CLEAR_RESULT_CUSTOMER_NAME_FINISHED";

export const clearResult = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      CLEAR_RESULT_CUSTOMER_NAME,
      CustomerNameEffect.clearResult
    );
  };
};

export const REQUEST_CUSTOMER_CATEGORY: string = "CustomerNameAction.REQUEST_CUSTOMER_CATEGORY";
export const REQUEST_CUSTOMER_CATEGORY_FINISHED: string = "CustomerNameAction.REQUEST_CUSTOMER_CATEGORY_FINISHED";

export const requestCustomerCategory = (): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            REQUEST_CUSTOMER_CATEGORY,
            CustomerNameEffect.requestCustomerCategory,
        )
    }
}