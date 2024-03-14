import FunnelWarrantySLAModel from 'stores/funnel-warranty/models/FunnelWarrantySLAModel';
import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import IFunnelWarrantySLATable from './models/IFunnelWarrantySLATable';
import IFunnelWarrantySLATableRow from './models/IFunnelWarrantySLATableRow';
import FunnelWarrantySLAEnvelope from 'stores/funnel-warranty/models/FunnelWarrantySLAEnvelope';
import { Selector } from 'react-redux';

const _selectFunnelWarrantySLAs = (models: FunnelWarrantySLAEnvelope): IFunnelWarrantySLATable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: FunnelWarrantySLAModel[]): IFunnelWarrantySLATableRow[] => {
  return models.map((model: FunnelWarrantySLAModel): IFunnelWarrantySLATableRow => _mappingObjectTableRow(model));
};

export const selectFunnelWarrantySLAs: ParametricSelector<IStore, string[], IFunnelWarrantySLATable> = createSelector(
  (state: IStore) => state.funnelWarrantySLA.listDataSLA!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectFunnelWarrantySLAs
);

const _mappingObjectTableRow = (model: FunnelWarrantySLAModel): IFunnelWarrantySLATableRow => {
  return {
    warrantySLAGenID: model.warrantySLAGenID,
    warrantySupportID: model.warrantySupportID,
    problemClassID: model.problemClassID,
    brandID: model.brandID,
    subBrandID: model.subBrandID,
    startWarrantyCust: model.startWarrantyCust,
    customerWarranty: model.customerWarranty,
    startWarrantyVendor: model.startWarrantyVendor,
    vendorWarranty: model.vendorWarranty,
    createUserID: model.createUserID,
  };
};

const _selectWarrantySLA = (model: FunnelWarrantySLAModel): FunnelWarrantySLAModel => {
  return _mappingObject(model);
};

const _mappingObject = (model: FunnelWarrantySLAModel): FunnelWarrantySLAModel => {
  return new FunnelWarrantySLAModel({
    warrantySLAGenID: model.warrantySLAGenID,
    warrantySupportID: model.warrantySupportID,
    problemClassID: model.problemClassID,
    subBrandID: model.subBrandID,
    brandID: model.brandID,
    customerWarranty: model.customerWarranty,
    vendorWarranty: model.vendorWarranty,
    createUserID: model.createUserID,
    pCustomer: model.customerWarranty === 'undefined' ? '0' : model.customerWarranty.substr(0, 1),
    lCustomer: model.customerWarranty === 'undefined' ? '0' : model.customerWarranty.substr(2, 1),
    oCustomer: model.customerWarranty === 'undefined' ? '0' : model.customerWarranty.substr(4, 1),
    pVendor: model.vendorWarranty === 'undefined' ? '0' : model.vendorWarranty.substr(0, 1),
    lVendor: model.vendorWarranty === 'undefined' ? '0' : model.vendorWarranty.substr(2, 1),
    oVendor: model.vendorWarranty === 'undefined' ? '0' : model.vendorWarranty.substr(4, 1),
    /* preventivePolicy:(model.preventivePolicy === 'undefined' ? '' : model.preventivePolicy ),
        correctivePolicy:(model.correctivePolicy === 'undefined' ? '' : model.correctivePolicy ),
        serviceLocation:model.serviceLocation,
        startDateWarranty:(model.startDateWarranty === undefined ? undefined : new Date(model.startDateWarranty!)), */
    startWarrantyCust: model.startWarrantyCust === undefined ? undefined : new Date(model.startWarrantyCust!),
    startWarrantyVendor: model.startWarrantyVendor === undefined ? undefined : new Date(model.startWarrantyVendor!),
  });
};

export const selectWarrantySLA: Selector<IStore, FunnelWarrantySLAModel> = createSelector(
  (state: IStore) => state.funnelWarrantySLA.firstDataSLA!,
  _selectWarrantySLA
);
