import FunnelWarrantySLADetailModel from 'stores/funnel-warranty/models/FunnelWarrantySLADetailModel';
import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import IFunnelWarrantySLACustomerTable from './models/IFunnelWarrantySLACustomerTable';
import IFunnelWarrantySLACustomerTableRow from './models/IFunnelWarrantySLACustomerTableRow';
import FunnelWarrantySLADetailEnvelope from 'stores/funnel-warranty/models/FunnelWarrantySLADetailEnvelope';
import { Selector } from 'react-redux';

const _selectFunnelWarrantyCustomers = (models: FunnelWarrantySLADetailEnvelope): IFunnelWarrantySLACustomerTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: FunnelWarrantySLADetailModel[]): IFunnelWarrantySLACustomerTableRow[] => {
  return models.map((model: FunnelWarrantySLADetailModel): IFunnelWarrantySLACustomerTableRow => _mappingObjectTableRow(model));
};

export const selectFunnelWarrantyCustomers: ParametricSelector<IStore, string[], IFunnelWarrantySLACustomerTable> = createSelector(
  (state: IStore) => state.funnelWarrantySLA.listData!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectFunnelWarrantyCustomers
);

const _mappingObjectTableRow = (model: FunnelWarrantySLADetailModel): IFunnelWarrantySLACustomerTableRow => {
  return {
    warrantySLADetailID: model.warrantySLADetailID,
    warrantySLAGenID: model.warrantySLAGenID,
    productNumber: model.productNumber,
    serviceLocation: model.serviceLocation,
    coverageHour: model.coverageHour,
    responseTime: model.responseTime,
    resolutionTime: model.resolutionTime,
    slaType: model.slaType,
  };
};

const _selectWarrantyCustomer = (model: FunnelWarrantySLADetailModel): FunnelWarrantySLADetailModel => {
  return _mappingObject(model);
};

const _mappingObject = (model: FunnelWarrantySLADetailModel): FunnelWarrantySLADetailModel => {
  return new FunnelWarrantySLADetailModel({
    warrantySLAGenID: model.warrantySLAGenID,
    warrantySLADetailID: model.warrantySLADetailID,
    slaType: model.slaType,
    productNumber: model.productNumber === 'undefined' ? '' : model.productNumber,
    serviceLocation: model.serviceLocation === 'undefined' ? '' : model.serviceLocation,
    coverageHour: model.coverageHour === 'undefined' ? '' : model.coverageHour,
    responseTime: model.responseTime === 'undefined' ? '' : model.responseTime,
    resolutionTime: model.resolutionTime === 'undefined' ? '' : model.resolutionTime,
  });
};

export const selectWarrantySLADetail: Selector<IStore, FunnelWarrantySLADetailModel> = createSelector(
  (state: IStore) => state.funnelWarrantySLA.firstDataSLADetail!,
  _selectWarrantyCustomer
);
