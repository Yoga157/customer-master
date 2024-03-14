import ICustomerState from './models/ICustomerState';
import * as CustomerActions from './CustomerActions';
import IAction from '../../models/IAction';
import CustomerModel from './models/CustomerModel';
import CustomerExistingModel from './models/CustomerExistingModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import CustomerFunnel from './models/CustomerFunnel';
import ResultActions from 'models/ResultActions';

export const initialState: ICustomerState = {
  customer: [],
  customerOption: [],
  customerFunnel: [],
  customerWithFlag: [],
  customerTypeC:[],
  customerIDCNotNull:[],
  customerSingle: new CustomerModel({}),
  error:false,
  refreshPage:false,
  resultActions: new ResultActions({}),
  customerExisting:new CustomerExistingModel({}),
  customerExistingFunnel:new CustomerExistingModel({}),
};

const customerReducer: Reducer = baseReducer(initialState,
  {
    [CustomerActions.REQUEST_CUSTOMER_FUNNEL_FINISHED](state:ICustomerState, action:IAction<CustomerFunnel[]>): ICustomerState{
      return {
        ...state,
        customerFunnel:action.payload!,
        refreshPage:false,
      }

    },

    [CustomerActions.REQUEST_CUSTOMERS_FINISHED](state:ICustomerState, action:IAction<CustomerModel[]>): ICustomerState{
      return {
        ...state,
        customer:action.payload!,
        refreshPage:false,
      }

    },

    [CustomerActions.REQUEST_CUSTOMERS_BY_NAME_FINISHED](state:ICustomerState, action:IAction<CustomerModel[]>): ICustomerState{
      return {
        ...state,
        customer:action.payload!,
        refreshPage:false
      }

    },

    [CustomerActions.REQUEST_CUSTOMERS_BY_NAME_BLACKLIST_FINISHED](state:ICustomerState, action:IAction<CustomerModel[]>): ICustomerState{
      return {
        ...state,
        customerWithFlag:action.payload!,
        refreshPage:false
      }

    },

    [CustomerActions.REQUEST_CUSTOMERS_TYPE_C_FINISHED](state:ICustomerState, action:IAction<CustomerModel[]>): ICustomerState{
      return {
        ...state,
        customerTypeC:action.payload!,
        refreshPage:false
      }

    },

    [CustomerActions.REQUEST_CUSTOMER_IDC_NOTNULL_FINISHED](state:ICustomerState, action:IAction<CustomerModel[]>): ICustomerState{
      return {
        ...state,
        customerIDCNotNull:action.payload!,
        refreshPage:false
      }

    },

    [CustomerActions.REQUEST_CUSTOMER_BY_ID_FINISHED](state:ICustomerState, action:IAction<CustomerModel>): ICustomerState{
      return {
        ...state,
        customerSingle:action.payload!,
      }
    },
    [CustomerActions.REQUEST_CUSTOMER_EXISTING_FINISHED](state:ICustomerState, action:IAction<CustomerExistingModel>): ICustomerState{
      return {
        ...state,
        customerExisting:action.payload!,
      }
    },
    [CustomerActions.REQUEST_CUSTOMER_EXISTING_FUNNEL_FINISHED](state:ICustomerState, action:IAction<CustomerExistingModel>): ICustomerState{
      return {
        ...state,
        customerExistingFunnel:action.payload!,
      }
    },
    [CustomerActions.PUT_CUSTOMER_FINISHED](state:ICustomerState,
      action:IAction<CustomerModel>):ICustomerState{
      return {
        ...state,
        error:action.error!,
        refreshPage:(action.error) ? false : true    
      }
    },

    [CustomerActions.PUT_CUSTOMER_NPWP_FINISHED](state:ICustomerState,
      action:IAction<CustomerModel>):ICustomerState{
      return {
        ...state,
        error:action.error!,
        refreshPage:(action.error) ? false : true    
      }
    },

    [CustomerActions.POST_CUSTOMER_FINISHED](state:ICustomerState,
      action:IAction<ResultActions>):ICustomerState{
      return {
        ...state,
        error:action.error!,
        refreshPage:(action.error) ? false : true ,
        resultActions:action.payload!  
      }
    },

    [CustomerActions.POST_FILE_FINISHED](state:ICustomerState,
      action:IAction<ResultActions>):ICustomerState{
      return {
        ...state,
        error:action.error!,
        refreshPage:(action.error) ? false : true ,
        resultActions:action.payload!  
      }
    },
  }
);

export default customerReducer;
