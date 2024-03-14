import FunnelWarrantySupportModel from 'stores/funnel-warranty/models/FunnelWarrantySupportModel';
import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import { Selector } from 'react-redux';

const _selectWarrantySupport = (model: FunnelWarrantySupportModel): FunnelWarrantySupportModel => {
  return _mappingObject(model);
};

const _mappingObject = (model: FunnelWarrantySupportModel): FunnelWarrantySupportModel => {
  return new FunnelWarrantySupportModel({
    warrantySupportID: model.warrantySupportID,
    funnelGenID: model.funnelGenID,
    preventivePolicy: model.preventivePolicy === 'undefined' ? '' : model.preventivePolicy,
    correctivePolicy: model.correctivePolicy === 'undefined' ? '' : model.correctivePolicy,
    serviceLocation: model.serviceLocation,
    startDateWarranty: model.startDateWarranty == undefined ? undefined : new Date(model.startDateWarranty!),
    createDate: new Date(model.createDate!),
  });
};

export const selectWarrantySupport: Selector<IStore, FunnelWarrantySupportModel> = createSelector(
  (state: IStore) => state.funnelWarrantySLA.firstDataSupport!,
  _selectWarrantySupport
);
