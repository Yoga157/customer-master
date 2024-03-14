import * as CustomerActions from './CustomerActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import CustomerToFunnelModel from './models/CustomerToFunnelModel';
import CustomerToFunnelEnvelope from './models/CustomerToFunnelEnvelope';
import ICustomerToFunnelState from './models/ICustomerToFunnelState';

export const initialState: ICustomerToFunnelState = {
  listData: new CustomerToFunnelEnvelope({}) ,
  firstData: new CustomerToFunnelModel({}),
  error:false,
  refreshPage:false
};

const customerToFunnelReducer: Reducer = baseReducer(initialState,
  {
    [CustomerActions.REQUEST_CUSTOMER_FUNNEL_LOCAL_FINISHED](state:ICustomerToFunnelState, action:IAction<CustomerToFunnelEnvelope>): ICustomerToFunnelState{
      return {
        ...state,
        listData:action.payload!,
        error:false,
        refreshPage:false
      }

    },
  }
);

export default customerToFunnelReducer;
