import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';
import { Selector } from 'react-redux';

interface IOptionsData {
  readonly value: number;
  readonly text: string;
}

const _selectFunnelOpportunity = (models: any): any => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: any[]): any[] => {
  return models.map((model: any): any => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: any): any => {
  return {
    funnelOpportunityID: model.funnelOpportunityID.toString() === 'undefined' ? 0 : model.funnelOpportunityID,
    salesName: model.salesName === '' ? '' : model.salesName,
    funnelID: model.funnelID === null ? '' : model.funnelID,
    eventName: model.eventName === '' ? '' : model.eventName,
    customerName: model.customerName === '' ? '' : model.customerName,
    createUserID: model.createUserID === null ? null : model.createUserID,
    status: model.status === '' ? '' : model.status,
    createDate: model.createDate === null ? null : model.createDate,
    brand: model.brand === null ? null : model.brand,
    eventDate: model.eventDate === '' ? null : model.eventDate,
    direktorat: model.direktorat === '' ? null : model.direktorat,
    agingDays: model.agingDays === '' ? null : model.agingDays,
  };
};

export const selectFunnelOpportunity: Selector<IStore, any> = createSelector(
  (state: IStore) => state.funnelOpportunity.data!,
  _selectFunnelOpportunity
);

const _selectCustomerName = (models: any[]): any[] => {
  return models.map((model: any): any => ({
    title: model.customerName,
    description: model.customerGenID,
  }));
};

export const selectCustomerName: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.funnelOpportunity.listCustomer,
  _selectCustomerName
);

const _selectSalesName = (models: any[]): any[] => {
  return models.map((model: any): any => ({
    text: model.textData,
    value: model.valueData,
  }));
};

export const selectSalesName: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.funnelOpportunity.employee,
  _selectSalesName
);

const _selectDirektorat = (models: any[]): any[] => {
  return models.map((model: any): any => ({
    text: model.textData,
    value: model.valueData,
  }));
};

export const selectDirektorat: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.funnelOpportunity.listDirektorat,
  _selectDirektorat
);

const _mappingOppFailedTableRow = (model: any) => {
  return {
    brand: model.brand,
    customerName: model.customerName,
    eventName: model.eventName,
    notes: model.notes,
    errorMessage: model.errorMessage,
    messageError: model.errorMessage.join(','),
  };
};
const _selectResultOpp = (models: any[]): any[] => {
  if (models.length > 0) {
    return models.map((model: any): any => _mappingOppFailedTableRow(model));
  }
  return [];
};
export const selectResultOpp: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.funnelOpportunity.resultActions.resultObj,
  _selectResultOpp
);
