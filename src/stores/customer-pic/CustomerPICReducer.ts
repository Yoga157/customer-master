import ICustomerPICState from "./models/ICustomerPICState";
import * as CustomerPICActions from './CustomerPICActions';
import IAction from '../../models/IAction';
import CustomerPICModel from './models/CustomerPICModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import ResultActions from 'models/ResultActions';

export const initialState: ICustomerPICState = {
    customerPic: [],
    firstData : new CustomerPICModel({}),
    error:false,
    refreshPage:false,
    resultActions:new ResultActions({})
};

const customerReducer: Reducer = baseReducer(initialState,
  {
    [CustomerPICActions.REQUEST_GET_CUSTOMER_PIC_FINISHED](state: ICustomerPICState, action: IAction<ResultActions>): ICustomerPICState {
        return {
            ...state,
            resultActions: action.payload!
        }
    },
    [CustomerPICActions.REQUEST_CUSTOMER_PIC_FINISHED](state:ICustomerPICState, action:IAction<CustomerPICModel[]>): ICustomerPICState{
      return {
        ...state,
        customerPic:action.payload!,
        refreshPage:false,
        error:action.error!
      }

    },
    [CustomerPICActions.REQUEST_CUSTOMER_PIC_BYID_FINISHED](state:ICustomerPICState, action:IAction<CustomerPICModel>): ICustomerPICState{
      return {
        ...state,
        firstData:action.payload!,
        refreshPage:false,
        error:action.error!
      }

    },

    [CustomerPICActions.REMOVE_FIRSTDATA_CUSTOMER_PIC_FINISHED](state:ICustomerPICState, action:IAction<any>): ICustomerPICState{
      return {
        ...state,
        firstData: action.payload!,
        customerPic: [action.payload!],
        refreshPage:false,
        error:action.error!
      }

    },

    [CustomerPICActions.POST_CUSTOMER_PIC_FINISHED](state:ICustomerPICState,
      action:IAction<ResultActions>):ICustomerPICState{
      return {
        ...state,
        error:action.error!,
        refreshPage:(action.error) ? false : true  ,
        resultActions:action.payload!  
      }
    },

    [CustomerPICActions.PUT_CUSTOMER_PIC_FINISHED](state:ICustomerPICState,
      action:IAction<ResultActions>):ICustomerPICState{
      return {
        ...state,
        error:action.error!,
        refreshPage:(action.error) ? false : true  ,
        resultActions:action.payload!  
      }
    },
  }
);

export default customerReducer;
