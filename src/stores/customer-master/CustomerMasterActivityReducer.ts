import ICustomerMasterState from "./models/ICustomerMasterState";
import * as CustomerMasterActions from "./CustomerMasterActivityActions";
import IAction from "../../models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import CustomerMasterModel from "./models/CustomerMasterModel";
import ResultActions from "models/ResultActions";

export const initialState: ICustomerMasterState = {
  data: new CustomerMasterModel({}),
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
  activePage: 1,
  activeTabs: 0,
};

const customerMasterReducer: Reducer = baseReducer(initialState, {
  [CustomerMasterActions.REQUEST_CUSTOMERS_MASTER_SEARCH_FINISHED](
    state: ICustomerMasterState,
    action: IAction<CustomerMasterModel>
  ): ICustomerMasterState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerMasterActions.CLEAR_RESULT_CM](
    state: ICustomerMasterState,
    action: IAction<CustomerMasterModel>
  ): ICustomerMasterState {
    return {
      ...state,
      data: new CustomerMasterModel({}),
      error: false,
      refreshPage: false,
    };
  },

  [CustomerMasterActions.POST_REQUEST_NEW_CUSTOMERS_FINISHED](
    state: ICustomerMasterState,
    action: IAction<ResultActions>
  ): any {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [CustomerMasterActions.SET_PAGE](
    state: ICustomerMasterState,
    action: IAction<number>
  ): ICustomerMasterState {
    return {
      ...state,
      activePage: action.payload!,
    };
  },

  [CustomerMasterActions.SET_TABS](
    state: ICustomerMasterState,
    action: IAction<number>
  ): ICustomerMasterState {
    return {
      ...state,
      activeTabs: action.payload!,
    };
  },
});

export default customerMasterReducer;
