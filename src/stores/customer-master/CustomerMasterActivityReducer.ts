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
});

export default customerMasterReducer;
