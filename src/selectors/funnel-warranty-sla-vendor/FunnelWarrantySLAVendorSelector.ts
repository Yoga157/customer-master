import FunnelWarrantySLADetailModel from 'stores/funnel-warranty/models/FunnelWarrantySLADetailModel';
import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import IFunnelWarrantySLAVendorTable from './models/IFunnelWarrantySLAVendorTable';
import IFunnelWarrantySLAVendorTableRow from './models/IFunnelWarrantySLAVendorTableRow';
import FunnelWarrantySLADetailEnvelope from 'stores/funnel-warranty/models/FunnelWarrantySLADetailEnvelope';

const _selectFunnelWarrantyVendors = (models: FunnelWarrantySLADetailEnvelope): IFunnelWarrantySLAVendorTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: FunnelWarrantySLADetailModel[]): IFunnelWarrantySLAVendorTableRow[] => {
  return models.map((model: FunnelWarrantySLADetailModel): IFunnelWarrantySLAVendorTableRow => _mappingObjectTableRow(model));
};

export const selectFunnelWarrantyVendors: ParametricSelector<IStore, string[], IFunnelWarrantySLAVendorTable> = createSelector(
  (state: IStore) => state.funnelWarrantySLA.listData!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectFunnelWarrantyVendors
);

const _mappingObjectTableRow = (model: FunnelWarrantySLADetailModel): IFunnelWarrantySLAVendorTableRow => {
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
