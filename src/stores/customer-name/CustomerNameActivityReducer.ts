import ICustomerNameState from "./models/ICustomerNameState";
import * as CustomerNameAction from "./CustomerNameActivityActions"
import IAction from "../../models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import CustomerNameModel from "./models/CustomerNameModel";
import ResultActions from "models/ResultActions";

export const initialState: ICustomerNameState = {
    data: [],
    customerById: new CustomerNameModel({}),
    resultActions: new ResultActions({})
};

const CustomerNameReducer: Reducer = baseReducer(initialState, {
    [CustomerNameAction.REQUEST_SEARCH_CUSTOMER_NAME_FINISHED](state: ICustomerNameState, action: IAction<CustomerNameModel[]>): ICustomerNameState {
        return {
            ...state,
            data: action.payload!
        }
    },

    [CustomerNameAction.REQUEST_CUSTOMER_BY_ID_FINISHED](state: ICustomerNameState, action: IAction<CustomerNameModel>): ICustomerNameState {
      return {
          ...state,
          customerById: action.payload[0]!
      }
    },

    [CustomerNameAction.CLEAR_RESULT_CUSTOMER_NAME](
        state: ICustomerNameState,
        action: IAction<any>
      ): ICustomerNameState {
        return {
          ...state,
          resultActions: action.payload!
        };
      },
    
    [CustomerNameAction.REQUEST_CUSTOMER_CATEGORY_FINISHED](state: ICustomerNameState, action: IAction<ResultActions>): ICustomerNameState {
      return {
          ...state,
          resultActions: action.payload!
      }
    },

      
})

export default CustomerNameReducer