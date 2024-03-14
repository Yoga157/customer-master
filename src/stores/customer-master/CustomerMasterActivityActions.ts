import * as CustomerMasterEffect from "./CustomerMasterActivityEffects";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import CustomerMasterModel from "./models/CustomerMasterModel";
import CustomerMasterRow from "./models/CustomerMasterRow";
import ResultActions from "models/ResultActions";
import IAction from "models/IAction";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | CustomerMasterModel
  | CustomerMasterRow
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
