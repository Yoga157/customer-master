import * as CustomerTransferEffect from './CustomerTransferEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import { CustomerTransferModel, HistoryModel, InsertModel } from './models/CustomerTransferModel';
import { IDataFunnelState, IDataFunnelCustomerState, IValueState } from 'stores/customer-transfer/models/ICustomerTransferState';
import IAction from '../../models/IAction';
import CustomerTransferEnvelope from './models/CustomerTransferEnvelope';

type ActionUnion = undefined | HttpErrorResponseModel | CustomerTransferModel | HistoryModel | InsertModel | CustomerTransferEnvelope;

export const REQUEST_CUSTOMER_TRANSFER: string = 'CustomerTransferActions.REQUEST_CUSTOMER_TRANSFER';
export const REQUEST_CUSTOMER_TRANSFER_FINISHED: string = 'CustomerTransferActions.REQUEST_CUSTOMER_TRANSFER_FINISHED';

export const REQUEST_HISTORY: string = 'CustomerTransferActions.REQUEST_HISTORY';
export const REQUEST_HISTORY_FINISHED: string = 'CustomerTransferActions.REQUEST_HISTORY_FINISHED';

export const REQUEST_FUNNEL: string = 'CustomerTransferActions.REQUEST_FUNNEL';

export const REQUEST_FUNNEL_CUSTOMER: string = 'CustomerTransferActions.REQUEST_FUNNEL_CUSTOMER';

export const REQUEST_VALUE: string = 'CustomerTransferActions.REQUEST_VALUE';

export const REQUEST_SERVICE_CATALOGS: string = 'ServiceCatalogActions.REQUEST_SERVICE_CATALOGS';
export const REQUEST_SERVICE_CATALOGS_FINISHED: string = 'ServiceCatalogActions.REQUEST_SERVICE_CATALOGS_FINISHED';

export const requestCustomerTransfer = (fromSales: number, page: number, pageSize: number, role: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerTransferEnvelope>(
      dispatch,
      REQUEST_CUSTOMER_TRANSFER,
      CustomerTransferEffect.requestCustomerTransfer,
      fromSales,
      page,
      pageSize,
      role
    );
  };
};

export const requestHistory = (id: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<HistoryModel>(dispatch, REQUEST_HISTORY, CustomerTransferEffect.requestHistory, id);
  };
};

export const dataFunnel = (models: any): IAction<IDataFunnelState> => {
  return ActionUtility.createAction(REQUEST_FUNNEL, models);
};

export const dataFunnelCustomer = (models: any): IAction<IDataFunnelCustomerState> => {
  return ActionUtility.createAction(REQUEST_FUNNEL_CUSTOMER, models);
};

export const valueState = (fromSales: number, toSales: number): IAction<IValueState> => {
  return ActionUtility.createAction(REQUEST_VALUE, {
    fromSales: fromSales,
    toSales: toSales,
    createdUser: 7477,
  });
};

export const POST_CUSTOMERTRANSFER: string = 'CustomerTransferActions.POST_CUSTOMERTRANSFER';
export const POST_CUSTOMERTRANSFER_FINISHED = 'CustomerTransferActions.POST_CUSTOMERTRANSFER_FINISHED';
export const postCustomerTransfer = (data: InsertModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    try {
      await ActionUtility.createThunkEffect<InsertModel>(dispatch, POST_CUSTOMERTRANSFER, CustomerTransferEffect.postCustomerTransfer, data);
    } catch (error) {
      console.log('Error', error);
    }
  };
};
