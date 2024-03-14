import CustomerTransferModels from './CustomerTransferEnvelope';
import { CustomerTransferModel, HistoryModel, dataFunnelModel, dataFunnelCustomerModel } from './CustomerTransferModel';

export interface ICustomerTransferState {
  readonly data: CustomerTransferModels;
  readonly firstData: CustomerTransferModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
}

export interface IHistoryState {
  readonly historyTransfers: HistoryModel[];
}

export interface IDataFunnelState {
  readonly dataFunnel: dataFunnelModel[];
}

export interface IDataFunnelCustomerState {
  readonly dataFunnelCustomer: dataFunnelCustomerModel[];
}

export interface IValueState {
  readonly fromSales: number;
  readonly toSales: number;
  readonly createdUser: number;
}
