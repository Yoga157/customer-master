import * as CustomerMasterEffect from "./CustomerMasterActivityEffects";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import CustomerMasterModel from "./models/CustomerMasterModel";
import CustomerMasterRow from "./models/CustomerMasterRow";
import CustomerMasterPostModel from "./models/CustomerMasterPostModel";
import ResultActions from "models/ResultActions";
import IAction from "models/IAction";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | CustomerMasterModel
  | CustomerMasterRow
  | CustomerMasterPostModel
  | boolean
  | ResultActions;

export const REQUEST_CUSTOMERS_MASTER_SEARCH: string =
  "CustomerMasterActions.REQUEST_CUSTOMERS_MASTER_SEARCH";
export const REQUEST_CUSTOMERS_MASTER_SEARCH_FINISHED: string =
  "CustomerMasterActions.REQUEST_CUSTOMERS_MASTER_SEARCH_FINISHED";

export const requestSearchCustomerMaster = (
  page: number,
  pageSize: number,
  column: string,
  sorting?: string,
  titleCustomer?: string,
  customerName?: string,
  picName?: string
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerMasterModel>(
      dispatch,
      REQUEST_CUSTOMERS_MASTER_SEARCH,
      CustomerMasterEffect.requestSearchCustomerMaster,
      page,
      pageSize,
      column,
      sorting,
      titleCustomer,
      customerName,
      picName
    );
  };
};

export const SET_PAGE: string = "CustomerMasterActions.SET_PAGE";
export const setActivePage = (activePage: number): IAction<number> => {
  return ActionUtility.createAction(SET_PAGE, activePage);
};

export const SET_TABS: string = "CustomerMasterActions.SET_TABS";
export const setActiveTabs = (activeTabs: number): IAction<number> => {
  return ActionUtility.createAction(SET_TABS, activeTabs);
};

export const SET_SUCCESS_MODAL: string =
  "CustomerMasterActions.SET_SUCCESS_MODAL";
export const setSuccessModal = (isSuccess: boolean): IAction<boolean> => {
  return ActionUtility.createAction(SET_SUCCESS_MODAL, isSuccess);
};

export const CLEAR_RESULT_CM: string = "CustomerMasterActions.CLEAR_RESULT_CM";
export const clearResult = (): IAction<CustomerMasterModel> => {
  return ActionUtility.createAction(CLEAR_RESULT_CM);
};

export const POST_REQUEST_NEW_CUSTOMERS: string =
  "CustomerMasterActions.POST_REQUEST_NEW_CUSTOMERS";
export const POST_REQUEST_NEW_CUSTOMERS_FINISHED: string =
  "CustomerMasterActions.POST_REQUEST_NEW_CUSTOMERS_FINISHED";

export const postNewCustomerMaster = (data: CustomerMasterPostModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      POST_REQUEST_NEW_CUSTOMERS,
      CustomerMasterEffect.postNewCustomerMaster,
      data
    );
  };
};

export const REQUEST_NEW_CUSTOMER_DETAIL_BY_GEN_ID: string =
  "CustomerMasterActions.REQUEST_NEW_CUSTOMER_DETAIL_BY_GEN_ID";
export const REQUEST_NEW_CUSTOMER_DETAIL_BY_GEN_ID_FINISHED: string =
  "CustomerMasterActions.REQUEST_NEW_CUSTOMER_DETAIL_BY_GEN_ID_FINISHED";

export const requestNewCustomerDetailByGenId = (genId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_NEW_CUSTOMER_DETAIL_BY_GEN_ID,
      CustomerMasterEffect.requestNewCustomerDetailByGenId,
      genId
    );
  };
};
