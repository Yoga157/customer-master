import ICustomerMasterState from "./models/ICustomerMasterState";
import * as CustomerMasterActions from "./CustomerMasterActivityActions";
import IAction from "../../models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import CustomerMasterModel from "./models/CustomerMasterModel";
import ResultActions from "models/ResultActions";
import CustomerMasterPostModel from "./models/CustomerMasterPostModel";

export const initialState: ICustomerMasterState = {
  data: new CustomerMasterModel({}),
  customerNewByGenId: new ResultActions({}),
  customerMoreDetails: new ResultActions({}),
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
  activePage: 1,
  activeTabs: 1,
  isSuccess: false,
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

  [CustomerMasterActions.SET_SUCCESS_MODAL](
    state: ICustomerMasterState,
    action: IAction<boolean>
  ): ICustomerMasterState {
    return {
      ...state,
      isSuccess: action.payload!,
    };
  },

  [CustomerMasterActions.REQUEST_NEW_CUSTOMER_DETAIL_BY_GEN_ID_FINISHED](
    state: ICustomerMasterState,
    action: IAction<ResultActions>
  ): ICustomerMasterState {
    return {
      ...state,
      customerNewByGenId: action.payload!,
    };
  },

  [CustomerMasterActions.PUT_STATUS_NEW_CUSTOMER_FINISHED](
    state: ICustomerMasterState,
    action: IAction<ResultActions>
  ): ICustomerMasterState {
    return {
      ...state,
      resultActions: action.payload!,
    };
  },

  [CustomerMasterActions.REQUEST_APPROVED_DATA_DETAIL_BY_GEN_ID_FINISHED](
    state: ICustomerMasterState,
    action: IAction<ResultActions>
  ): ICustomerMasterState {
    return {
      ...state,
      customerMoreDetails: action.payload!,
    };
  },

  [CustomerMasterActions.REQUEST_CUSTOMER_MORE_DETAILS_BY_CUST_ID_FINISHED](
    state: ICustomerMasterState,
    action: IAction<ResultActions>
  ): ICustomerMasterState {
    return {
      ...state,
      customerMoreDetails: action.payload!,
    };
  },

  [CustomerMasterActions.POST_PIC_FINISHED](
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

  [CustomerMasterActions.PUT_PIC_FINISHED](
    state: ICustomerMasterState,
    action: IAction<ResultActions>
  ): ICustomerMasterState {
    return {
      ...state,
      resultActions: action.payload!,
    };
  },
});

export default customerMasterReducer;
