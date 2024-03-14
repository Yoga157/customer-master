import ICustomerState from "./models/ICustomerState";
import * as CustomerActions from "./CustomerActivityActions";
import IAction from "../../models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import CustomerSettingModel from "./models/CustomerSettingModel";
import ResultActions from "models/ResultActions";
import CustomerSettingById from "./models/CustomerSettingById";
import CustomerData from "./models/CustomerData";
import CustomerSettingPostModel from "./models/CustomerSettingPostModel";

export const initialState: ICustomerState = {
  data: new CustomerSettingModel({}),
  dataNoName: new CustomerSettingModel({}),
  dataNamed: new CustomerSettingModel({}),
  dataShareable: new CustomerSettingModel({}),
  dataAll: new CustomerSettingModel({}),
  CustomerSettingPostModel: new CustomerSettingPostModel({}),
  dataByCustomerId: new CustomerSettingById({}),
  customerDataById: new ResultActions({}),
  searchCustomerByName: new ResultActions({}),
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
  activePage: 1,
};

const customerSettingReducer: Reducer = baseReducer(initialState, {
  [CustomerActions.REQUEST_NO_NAME_ACCOUNTS_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingModel>
  ): ICustomerState {
    return {
      ...state,
      dataNoName: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.REQUEST_NAMED_ACCOUNTS_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingModel>
  ): ICustomerState {
    return {
      ...state,
      dataNamed: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.REQUEST_SHAREABLE_ACCOUNTS_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingModel>
  ): ICustomerState {
    return {
      ...state,
      dataShareable: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.REQUEST_ALL_ACCOUNTS_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingModel>
  ): ICustomerState {
    return {
      ...state,
      dataAll: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.REQUEST_CUSTOMERS_SETTING_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingModel>
  ): ICustomerState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.REQUEST_NO_NAME_SEARCH_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingModel>
  ): ICustomerState {
    return {
      ...state,
      dataNoName: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.REQUEST_NAMED_SEARCH_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingModel>
  ): ICustomerState {
    return {
      ...state,
      dataNamed: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.REQUEST_SHAREABLE_SEARCH_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingModel>
  ): ICustomerState {
    return {
      ...state,
      dataShareable: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.REQUEST_ALL_SEARCH_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingModel>
  ): ICustomerState {
    return {
      ...state,
      dataAll: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.REQUEST_CUSTOMERS_SETTING_SEARCH_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingModel>
  ): ICustomerState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.POST_CLAIM_ACCOUNT_FINISHED](
    state: ICustomerState,
    action: IAction<ResultActions>
  ): any {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [CustomerActions.POST_REQUEST_ACCOUNT_FINISHED](
    state: ICustomerState,
    action: IAction<ResultActions>
  ): any {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [CustomerActions.SET_PAGE](
    state: ICustomerState,
    action: IAction<number>
  ): ICustomerState {
    return {
      ...state,
      activePage: action.payload!,
    };
  },

  [CustomerActions.DEL_CUSTOMERS_SETTING_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingModel>
  ): ICustomerState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [CustomerActions.REQUEST_CUSTOMER_SETTING_BY_CUSTOMER_ID_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingById>
  ): ICustomerState {
    return {
      ...state,
      dataByCustomerId: action.payload!,
    };
  },

  [CustomerActions.REQUEST_CUSTOMER_SETTING_BY_ID_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingById>
  ): ICustomerState {
    return {
      ...state,
      dataByCustomerId: action.payload!,
    };
  },

  [CustomerActions.REQUEST_RESET_FILTER](
    state: ICustomerState,
    action: IAction<boolean>
  ): ICustomerState {
    return initialState;
  },

  [CustomerActions.POST_CUSTOMER_SETTING_FINISHED](
    state: ICustomerState,
    action: IAction<ResultActions>
  ): ICustomerState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.PUT_CUSTOMER_SETTING_FINISHED](
    state: ICustomerState,
    action: IAction<ResultActions>
  ): any {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  //RELEASE ACCOUNTS
  [CustomerActions.PUT_RELEASES_ACCOUNTS_FINISHED](
    state: ICustomerState,
    action: IAction<ResultActions>
  ): any {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  //APPROVE SHARABALE ACCOUNTS
  [CustomerActions.PUT_APPROVE_CUSTOMER_SETTING_FINISHED](
    state: ICustomerState,
    action: IAction<ResultActions>
  ): any {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [CustomerActions.CLEAR_CUSTOMER_SETTING_FINISHED](
    state: ICustomerState,
    action: IAction<any>
  ): ICustomerState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.POST_CLAIM_ACCOUNT_FINISHED](
    state: ICustomerState,
    action: IAction<ResultActions>
  ): ICustomerState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.PUT_RELEASE_ACCOUNT_FINISHED](
    state: ICustomerState,
    action: IAction<ResultActions>
  ): ICustomerState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.PUT_ACCEPT_REQUEST_SHAREABLE_FINISHED](
    state: ICustomerState,
    action: IAction<ResultActions>
  ): ICustomerState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.REQUEST_CUSTOMER_DATA_BY_CUSTOMER_ID_FINISHED](
    state: ICustomerState,
    action: IAction<ResultActions>
  ): ICustomerState {
    return {
      ...state,
      customerDataById: action.payload!,
    };
  },

  [CustomerActions.REQUEST_CUSTOMER_DATA_BY_NAME_FINISHED](
    state: ICustomerState,
    action: IAction<ResultActions>
  ): ICustomerState {
    return {
      ...state,
      searchCustomerByName: action.payload!,
    };
  },

  [CustomerActions.PUT_CUSTOMER_SETTING_CATEGORY_PMO_FINISHED](
    state: ICustomerState,
    action: IAction<ResultActions>
  ): any {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },
});

export default customerSettingReducer;
