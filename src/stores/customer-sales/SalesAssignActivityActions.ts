import * as SalesAssignEffect from "./SalesAssignActivityEffects";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import SalesAssignModel from "./models/SalesAssignModel";
import SalesAssignRow from "./models/SalesAssignRow";
import ResultActions from "models/ResultActions";
import IStore from "../../models/IStore";
import SalesNameMode from "./models/SalesNameModel";
import SalesAssignPostModel from "./models/SalesAssignPostModel";
import SalesAssignHistoryModel from "./models/SalesAssignHistoryModel";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | SalesAssignModel
  | SalesAssignRow
  | SalesNameMode
  | ResultActions;

// Claim Account
export const POST_CLAIM_ACCOUNT: string = "SalesActions.POST_CLAIM_ACCOUNT";
export const POST_CLAIM_ACCOUNT_FISNISHED: string =
  "SalesActions.POST_CLAIM_ACCOUNT_FISNISHED";

export const postClaimAccount = (data: SalesAssignPostModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      POST_CLAIM_ACCOUNT,
      SalesAssignEffect.postClaimAccount,
      data
    );
  };
};

// Request Share Account
export const POST_REQUEST_ACCOUNT: string = "SalesActions.POST_CLAIM_ACCOUNT";
export const POST_REQUEST_ACCOUNT_FISNISHED: string =
  "SalesActions.POST_CLAIM_ACCOUNT_FISNISHED";

export const postaRequestAccount = (data: SalesAssignPostModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      POST_REQUEST_ACCOUNT,
      SalesAssignEffect.postaRequestAccount,
      data
    );
  };
};

//Get sales by Name
export const REQUEST_SALES_BY_NAME: string = "SalesAction.EQUEST_SALES_BY_NAME";
export const REQUEST_SALES_BY_NAME_FINISHED: string =
  "SalesAction.EQUEST_SALES_BY_NAME_FINISHED";

export const requestSalesByName = (search: string): any => {
  return async (
    dispatch: ReduxDispatch<ActionUnion>,
    getState: () => IStore
  ): Promise<void> => {
    await ActionUtility.createThunkEffect<SalesNameMode>(
      dispatch,
      REQUEST_SALES_BY_NAME,
      SalesAssignEffect.requestSalesByName,
      search
    );
  };
};

//Get List Sales for Dropdown
export const REQUEST_SALES_LIST: string = "SalesAction.REQUEST_SALES_LIST";
export const REQUEST_SALES_LIST_FINISHED: string =
  "SalesAction.REQUEST_SALES_LIST_FINISHED";

export const requestSalesDropdown = (): any => {
  return async (
    dispatch: ReduxDispatch<ActionUnion>,
    getState: () => IStore
  ): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_SALES_LIST,
      SalesAssignEffect.requestSalesDropdown
    );
  };
};

// Assign sales
export const POST_ASSIGN_SALES: string = "SalesActions.POST_CUSTOMERS_SALES";
export const POST_ASSIGN_SALES_FISNISHED: string =
  "SalesActions.POST_CUSTOMERS_SALES_FISNISHED";

export const postAssignedSales = (data: SalesAssignPostModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      POST_ASSIGN_SALES,
      SalesAssignEffect.postAssignedSales,
      data
    );
  };
};

export const CLEAR_RESULT_SALES: string = "SalesActions.CLEAR_RESULT_SALES";
export const CLEAR_RESULT_SALES_FINISHED: string =
  "SalesActions.CLEAR_RESULT_SALES_FINISHED";

export const clearResult = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      CLEAR_RESULT_SALES,
      SalesAssignEffect.clearResult
    );
  };
};

export const REQUEST_SALES_HISTORY: string =
  "SalesAction.REQUEST_SALES_HISTORY";
export const REQUEST_SALES_HISTORY_FINISHED: string =
  "SalesAction.REQUEST_SALES_HISTORY_FINISHED";

export const requestSalesHistory = (customerId: number): any => {
  return async (
    dispatch: ReduxDispatch<ActionUnion>,
    getState: () => IStore
  ): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_SALES_HISTORY,
      SalesAssignEffect.requestSalesHistory,
      customerId
    );
  };
};

export const DEL_SALES_ASSIGN: string =
  "InvoicingConditionActions.DEL_SALES_ASSIGN";
export const DEL_SALES_ASSIGN_FINISHED: string =
  "InvoicingConditionActions.DEL_SALES_ASSIGN_FINISHED";

export const deleteSalesAssign = (id: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      DEL_SALES_ASSIGN,
      SalesAssignEffect.deleteSalesAssign,
      id
    );
  };
};

export const REMOVE_SUBMIT_RESULT_SEARCH: string =
  "SalesActions.REMOVE_SUBMIT_RESULT_SEARCH";
export const REMOVE_SUBMIT_RESULT_SEARCH_FINISHED =
  "SalesActions.REMOVE_SUBMIT_RESULT_SEARCH_FINISHED";

export const removeResultSearch = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REMOVE_SUBMIT_RESULT_SEARCH,
      SalesAssignEffect.removeResultSearch
    );
  };
};

export const REQUEST_ACCOUNT_OWNER: string =
  "SalesAction.REQUEST_ACCOUNT_OWNER";
export const REQUEST_ACCOUNT_OWNER_FINISHED: string =
  "SalesAction.REQUEST_ACCOUNT_OWNER_FINISHED";

export const requestAccountOwner = (customerId: number): any => {
  return async (
    dispatch: ReduxDispatch<ActionUnion>,
    getState: () => IStore
  ): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_ACCOUNT_OWNER,
      SalesAssignEffect.requestAccountOwner,
      customerId
    );
  };
};
