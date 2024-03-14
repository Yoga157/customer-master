import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';
import FunnelServiceCatalogEnvelope from 'stores/funnel-service-catalog/models/FunnelServiceCatalogEnvelope';
import { Selector } from 'react-redux';

import IFunnelServiceCatalogTable from './models/IFunnelServiceCatalogTable';
import IFunnelServiceCatalogTableRow from './models/IFunnelServiceCatalogTableRow';

import FunnelServiceCatalogDashboard from 'stores/funnel-service-catalog/models/FunnelServiceCatalogDashboard';
import FunnelServiceCatalogModel from 'stores/funnel-service-catalog/models/FunnelServiceCatalogModel';
const _selectFunnelServiceCatalog = (models: FunnelServiceCatalogEnvelope): IFunnelServiceCatalogTable => {
  return {
    totalRow: models.totalRows,
    totalPrice: models.totalPrice,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: FunnelServiceCatalogDashboard[]): IFunnelServiceCatalogTableRow[] => {
  return models.map((model: FunnelServiceCatalogDashboard): IFunnelServiceCatalogTableRow => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: FunnelServiceCatalogDashboard): IFunnelServiceCatalogTableRow => {
  return {
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    funnelSvcCatGenID: model.funnelSvcCatGenID.toString() === 'NaN' ? 0 : model.funnelSvcCatGenID,
    svcCatGenID: model.svcCatGenID.toString() === 'NaN' ? 0 : model.svcCatGenID,
    svcCatReffID: model.svcCatReffID === 'undefined' ? '' : model.svcCatReffID,
    category: model.category === 'undefined' ? '' : model.category,
    serviceName: model.serviceName === 'undefined' ? '' : model.serviceName,
    brandModelName: model.brandModelName === 'undefined' ? '' : model.brandModelName,
    pic: model.pic === 'undefined' ? '' : model.pic,
    qty: model.qty === undefined ? 0 : model.qty,
    unitPrice: model.unitPrice === undefined ? 0 : model.unitPrice,
    totalPrice: model.totalPrice === undefined ? 0 : model.totalPrice,
    discountStatus: model.discountStatus === 'undefined' ? '' : model.discountStatus,
    discountAmount: model.discountAmount === undefined ? 0 : model.discountAmount,
    discountPctg: model.discountPctg === undefined ? 0 : model.discountPctg,
    owner: model.owner === 'undefined' ? '' : model.owner,
  };
};

export const selectFunnelServiceCatalog: ParametricSelector<IStore, string[], IFunnelServiceCatalogTable> = createSelector(
  (state: IStore) => state.funnelServiceCatalog.listData,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectFunnelServiceCatalog
);

const _createTotalPriceFunnelSC = (models: FunnelServiceCatalogDashboard[]): number => {
  let result: number = 0;
  models.forEach((element) => {
    result = result + element.totalPrice;
  });
  return result;
};

const _selectTotalPriceFunnelSC = (models: FunnelServiceCatalogEnvelope): number => {
  return _createTotalPriceFunnelSC(models.rows);
};

export const selectTotalPriceFunnelSC: Selector<IStore, number> = createSelector(
  (state: IStore) => state.funnelServiceCatalog.listData,
  _selectTotalPriceFunnelSC
);

const _selectFunnelServiceCatalogFirst = (model: FunnelServiceCatalogModel): FunnelServiceCatalogModel => {
  return new FunnelServiceCatalogModel({
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    funnelSvcCatGenID: model.funnelSvcCatGenID.toString() === 'NaN' ? 0 : model.funnelSvcCatGenID,
    svcCatGenID: model.svcCatGenID.toString() === 'NaN' ? 0 : model.svcCatGenID,
    //svcCatReffID:(model.svcCatReffID === 'undefined' ? '' : model.svcCatReffID ),
    //category:(model.category === 'undefined' ? '' : model.category ),
    //serviceName:(model.serviceName === 'undefined' ? '' : model.serviceName ),
    //brandModelName:(model.brandModelName === 'undefined' ? '' : model.brandModelName ),
    //pic:(model.pic === 'undefined' ? '' : model.pic ),
    brandModelGenID: model.brandModelGenID.toString() === 'NaN' ? 0 : model.brandModelGenID,
    qty: model.qty.toString() === 'NaN' ? 0 : model.qty,
    unitPrice: model.unitPrice === undefined ? 0 : model.unitPrice,
    totalPrice: model.totalPrice === undefined ? 0 : model.totalPrice,
    //discountStatus:(model.discountStatus === 'undefined' ? '' : model.discountStatus ),
    discountAmount: model.discountAmount === undefined ? 0 : model.discountAmount,
    discountPctg: model.discountPctg === undefined ? 0 : model.discountPctg,
    notes: model.notes === 'undefined' ? '' : model.notes,
  });
};

export const selectFunnelServiceCatalogFirst: Selector<IStore, FunnelServiceCatalogModel> = createSelector(
  (state: IStore) => state.funnelServiceCatalog.firstData,
  _selectFunnelServiceCatalogFirst
);

const _createTotalFunnelSC = (models: FunnelServiceCatalogDashboard[]): number => {
  let result: number = 0;
  models.forEach((element) => {
    result = result + 1;
  });
  return result;
};

const _selectTotalFunnelSC = (models: FunnelServiceCatalogEnvelope): number => {
  return _createTotalFunnelSC(models.rows);
};

export const selectTotalFunnelSC: Selector<IStore, number> = createSelector(
  (state: IStore) => state.funnelServiceCatalog.listData,
  _selectTotalFunnelSC
);
