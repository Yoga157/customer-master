import { CustomerTransferModel, HistoryModel } from 'stores/customer-transfer/models/CustomerTransferModel';
import { createSelector, Selector, ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';
import { ICustomerTransferTable, IHistoryTable } from './models/ICustomerTransferTable';
import { ICustomerTransferTableRow, IHistoryTableRow } from './models/ICustomerTransferTableRow';
import CustomerTransferEnvelope from 'stores/customer-transfer/models/CustomerTransferEnvelope';

const _selectCustomerTransfers = (models: CustomerTransferEnvelope): ICustomerTransferTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.funnels),
  };
};
const _selectHistory = (models: HistoryModel[]): IHistoryTable => {
  return {
    //totalRow: 100,
    rows: _createHistoryTableRows(models),
  };
};
const _createHistoryTableRows = (models: HistoryModel[]): IHistoryTableRow[] => {
  return models.map(
    (model: HistoryModel): IHistoryTableRow => ({
      id: model.id,
      funnelID: model.funnelID,
      customerName: model.customerName,
      fromSales: model.fromSales,
      toSales: model.toSales,
      createDate: model.createDate,
      creatorUserID: model.creatorUserID,
    })
  );
};

const _selectCustomerTransfer = (model: CustomerTransferModel): CustomerTransferModel => {
  return _mappingObject(model);
};

const _mappingObject = (model: CustomerTransferModel): CustomerTransferModel => {
  return new CustomerTransferModel({
    id: model.id.toString() === 'undefined' ? 0 : model.id,
    funnelGenID: model.funnelGenID.toString() === 'undefined' ? 0 : model.funnelGenID,
    customerName: model.customerName,
    customerGenID: model.customerGenID,
    projectName: model.projectName,
    totalSellingPrice: model.totalSellingPrice,
    gpmAmount: model.gpmAmount,
    dealCloseDate: model.dealCloseDate,
    funnelStatus: model.funnelStatus,
  });
};

const _createTableRows = (models: CustomerTransferModel[]): ICustomerTransferTableRow[] => {
  return models.map((model: CustomerTransferModel): ICustomerTransferTableRow => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: CustomerTransferModel): ICustomerTransferTableRow => {
  return {
    id: model.id,
    funnelGenID: model.funnelGenID,
    customerGenID: model.customerGenID,
    customerName: model.customerName,
    projectName: model.projectName,
    totalSellingPrice: model.totalSellingPrice,
    gpmAmount: model.gpmAmount,
    dealCloseDate: model.dealCloseDate,
    funnelStatus: model.funnelStatus,
  };
};

export const selectCustomerTransfer: Selector<IStore, CustomerTransferModel> = createSelector(
  (state: IStore) => state.customerTransfer.firstData!,
  _selectCustomerTransfer
);
export const selectCustomerTransfers: ParametricSelector<IStore, string[], ICustomerTransferTable> = createSelector(
  (state: IStore) => state.customerTransfer.data!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectCustomerTransfers
);
export const selectHistory: Selector<IStore, IHistoryTable> = createSelector(
  (state: IStore) => state.historyTransfer.historyTransfers,
  _selectHistory
);
