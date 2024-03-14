import { ICustomerTransferState, IHistoryState, IDataFunnelState, IDataFunnelCustomerState, IValueState } from './models/ICustomerTransferState';
import * as CustomerTransferActions from './CustomerTransferActions';
import IAction from '../../models/IAction';
import { CustomerTransferModel, HistoryModel, dataFunnelModel, dataFunnelCustomerModel } from './models/CustomerTransferModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import CustomerTransferEnvelope from './models/CustomerTransferEnvelope';
import ResultActions from 'models/ResultActions';

export const initialState: ICustomerTransferState = {
  data: new CustomerTransferEnvelope({}),
  firstData: new CustomerTransferModel({}),
  error: false,
  refreshPage: false,
};

export const initialFunnelState: IDataFunnelState = {
  dataFunnel: [],
};

export const initialFunnelCustomerState: IDataFunnelCustomerState = {
  dataFunnelCustomer: [],
};

export const initialHistoryState: IHistoryState = {
  historyTransfers: [],
};

export const initialValueState: IValueState = {
  fromSales: 0,
  toSales: 0,
  createdUser: 7477,
};

export const customerTransferReducer: Reducer = baseReducer(initialState, {
  [CustomerTransferActions.REQUEST_CUSTOMER_TRANSFER_FINISHED](
    state: ICustomerTransferState,
    action: IAction<CustomerTransferEnvelope>
  ): ICustomerTransferState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [CustomerTransferActions.POST_CUSTOMERTRANSFER_FINISHED](state: ICustomerTransferState, action: IAction<ResultActions>): ICustomerTransferState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
});

export const historyReducer: Reducer = baseReducer(initialHistoryState, {
  [CustomerTransferActions.REQUEST_HISTORY_FINISHED](state: IHistoryState, action: IAction<HistoryModel[]>): IHistoryState {
    return {
      ...state,
      historyTransfers: action.payload!,
    };
  },
});
export const dataFunnelReducer: Reducer = baseReducer(initialFunnelState, {
  [CustomerTransferActions.REQUEST_FUNNEL](state: IDataFunnelState, action: IAction<dataFunnelModel[]>): IDataFunnelState {
    return {
      ...state,
      dataFunnel: action.payload!,
    };
  },
});
export const dataFunnelCustomerReducer: Reducer = baseReducer(initialFunnelCustomerState, {
  [CustomerTransferActions.REQUEST_FUNNEL_CUSTOMER](
    state: IDataFunnelCustomerState,
    action: IAction<dataFunnelCustomerModel[]>
  ): IDataFunnelCustomerState {
    return {
      ...state,
      dataFunnelCustomer: action.payload!,
    };
  },
});
export const dataValueReducer: Reducer = baseReducer(initialValueState, {
  [CustomerTransferActions.REQUEST_VALUE](state: IValueState, action: IAction<IValueState>): IValueState {
    return {
      ...state,
      fromSales: action.payload!.fromSales,
      toSales: action.payload!.toSales,
      createdUser: action.payload!.createdUser,
    };
  },
});
