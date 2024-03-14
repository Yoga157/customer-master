import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';
import { Selector } from 'react-redux';
import IPOCTableRow from './models/IPOCTableRow';
import IPOCTable from './models/IPOCTable';
import POCRequestModel from 'stores/funnel-poc-request/models/POCRequestModel';
import POCEnvelope from 'stores/funnel-poc-request/models/POCEnvelope';

const _selectPOC = (models: POCEnvelope): IPOCTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: POCRequestModel[]): IPOCTableRow[] => {
  return models.map((model: POCRequestModel): IPOCTableRow => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: POCRequestModel): IPOCTableRow => {
  return {
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    pocGenHID: model.pocGenHID === undefined ? 0 : model.pocGenHID,
    pocActualDate: model.pocActualDate === undefined ? null : model.pocActualDate,
    pocExpectedDate: model.pocExpectedDate === undefined ? null : model.pocExpectedDate,
    pocNotes: model.pocNotes === 'undefined' ? '' : model.pocNotes,
    pocPresalesDeptID: model.pocNotes === 'undefined' ? '' : model.pocPresalesDeptID,
    pocStatusID: model.pocStatusID === undefined ? 0 : model.pocStatusID,
    createDate: model.createDate === null ? null : model.createDate,
    modifyDate: model.modifyDate === null ? null : model.modifyDate,
    createUserID: model.createUserID === undefined ? 0 : model.createUserID,
    modifyUserID: model.modifyUserID === undefined ? 0 : model.modifyUserID,
    lastUpdateBy: model.lastUpdateBy === 'undefined' ? '' : model.lastUpdateBy,
    picName: model.picName === 'undefined' ? '' : model.picName,
    pocStatus: model.pocStatus === 'undefined' ? '' : model.pocStatus,
    requestor: model.requestor === 'undefined' ? '' : model.requestor,
  };
};

export const selectPOC: ParametricSelector<IStore, string[], IPOCTable> = createSelector(
  (state: IStore) => state.poc.listData!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectPOC
);

const _selectPOCRequest = (model: POCRequestModel): POCRequestModel => {
  return _mappingViewFunnelCustomerPOObject(model);
};

const _mappingViewFunnelCustomerPOObject = (model: POCRequestModel): POCRequestModel => {
  return new POCRequestModel({
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    pocGenHID: model.pocGenHID.toString() === 'NaN' ? 0 : model.pocGenHID,
    pocActualDate: model.pocActualDate === undefined ? undefined : new Date(model.pocActualDate!),
    pocExpectedDate: model.pocExpectedDate === undefined ? undefined : new Date(model.pocExpectedDate!),
    pocPresalesDeptID: model.pocPresalesDeptID === 'undefined' ? '' : model.pocPresalesDeptID,
    pocPresalesDeptIDArr: model.pocPresalesDeptID.length > 0 ? model.pocPresalesDeptID.split(',') : [],
    pocNotes: model.pocNotes === 'undefined' ? '' : model.pocNotes,
  });
};

export const selectPOCRequest: Selector<IStore, POCRequestModel> = createSelector((state: IStore) => state.poc.firstData!, _selectPOCRequest);
