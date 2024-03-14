import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';
import { Selector } from 'react-redux';

import IBoqTable from './models/IBoqTable';
import IBoqTableRow from './models/IBoqTableRow';
import BoqEnvelope from '../../stores/boq/models/BoqEnvelope';
import BoqModel from '../../stores/boq/models/BoqModel';
import IBoqFailedTableRow from './models/IBoqFailedTableRow';

const _selectBoqs = (models: BoqEnvelope): IBoqTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: BoqModel[]): IBoqTableRow[] => {
  return models.map((model: BoqModel): IBoqTableRow => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: BoqModel): IBoqTableRow => {
  return {
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    boqGenID: model.boqGenID.toString() === 'NaN' ? 0 : model.boqGenID,
    productNumber: model.productNumber === undefined ? '' : model.productNumber,
    serialNumber: model.serialNumber === undefined ? '' : model.serialNumber,
    description: model.description === undefined ? '' : model.description,
    qty: model.qty.toString() === 'NaN' ? 0 : model.qty,
    brandID: model.brandID.toString() === 'NaN' ? 0 : model.brandID,
    brandName: model.brandName === undefined ? '' : model.brandName,
    subBrandID: model.subBrandID === undefined ? 0 : model.subBrandID,
    subBrandName: model.subBrandName === undefined ? '' : model.subBrandName,
    warranty: model.warranty === undefined ? 0 : model.warranty,
    warrantyDurationType: model.warrantyDurationType === undefined ? '' : model.warrantyDurationType,
    coverageHour: model.coverageHour === undefined ? '' : model.coverageHour,
    responseTimeType: model.responseTimeType === undefined ? '' : model.responseTimeType,
    responseTimeValue: model.responseTimeValue === undefined ? 0 : model.responseTimeValue,
    resolutionTimeType: model.resolutionTimeType === undefined ? '' : model.resolutionTimeType,
    resolutionTimeValue: model.resolutionTimeValue === undefined ? 0 : model.resolutionTimeValue,
    createUserID: model.createUserID === undefined ? 0 : model.createUserID,
    modifyUserID: model.modifyUserID === undefined ? 0 : model.modifyUserID,
  };
};

export const selectBoqs: ParametricSelector<IStore, string[], IBoqTable> = createSelector(
  (state: IStore) => state.funnelBoq.listData!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectBoqs
);

const _selectBoq = (model: BoqModel): BoqModel => {
  return new BoqModel({
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    boqGenID: model.boqGenID.toString() === 'NaN' ? 0 : model.boqGenID,
    productNumber: model.productNumber.toString() === 'undefined' ? '' : model.productNumber,
    serialNumber: model.serialNumber.toString() === 'undefined' ? '' : model.serialNumber,
    description: model.description.toString() === 'undefined' ? '' : model.description,
    qty: model.qty.toString() === 'NaN' ? 0 : model.qty,
    brandID: model.brandID.toString() === 'NaN' ? 0 : model.brandID,
    brandName: model.brandName === 'undefined' ? '' : model.brandName,
    subBrandID: model.subBrandID.toString() === 'NaN' ? 0 : model.subBrandID,
    subBrandName: model.subBrandName === 'undefined' ? '' : model.subBrandName,
    warranty: model.warranty.toString() === 'NaN' ? 0 : model.warranty,
    coverageHour: model.coverageHour === 'undefined' ? '' : model.coverageHour,
    preventiveSchedule: model.preventiveSchedule === 'undefined' ? '' : model.preventiveSchedule,
    preventiveDate: new Date(model.preventiveDate!),
    resolutionTimeType: model.resolutionTimeType === 'undefined' ? '' : model.resolutionTimeType,
    resolutionTimeValue: model.resolutionTimeValue.toString() === 'NaN' ? 0 : model.resolutionTimeValue,
    responseTimeType: model.responseTimeType === 'undefined' ? '' : model.responseTimeType,
    responseTimeValue: model.responseTimeValue.toString() === 'NaN' ? 0 : model.responseTimeValue,
    warrantyDurationType: model.warrantyDurationType === undefined ? '' : model.warrantyDurationType,
    createUserID: model.createUserID === undefined ? 0 : model.createUserID,
    modifyUserID: model.modifyUserID === undefined ? 0 : model.modifyUserID,
  });
};

export const selectBoq: Selector<IStore, BoqModel> = createSelector((state: IStore) => state.funnelBoq.firstData!, _selectBoq);

const _selectResultBoq = (models: IBoqFailedTableRow[]): IBoqFailedTableRow[] => {
  if (models.length > 0) {
    return models.map((model: IBoqFailedTableRow): IBoqFailedTableRow => _mappingBoqFailedTableRow(model));
  }
  return [];
};

const _mappingBoqFailedTableRow = (model: IBoqFailedTableRow): IBoqFailedTableRow => {
  return {
    productNumber: model.productNumber === undefined ? '' : model.productNumber,
    description: model.description === undefined ? '' : model.description,
    qty: model.qty.toString() === 'NaN' ? 0 : model.qty,
    brandName: model.brandName === undefined ? '' : model.brandName,
    subBrandName: model.subBrandName === undefined ? '' : model.subBrandName,
    warranty: model.warranty === undefined ? 0 : model.warranty,
    warrantyDurationType: model.warrantyDurationType === undefined ? '' : model.warrantyDurationType,
    errorMessage: model.errorMessage,
    messageError: model.errorMessage.join(','),
  };
};

export const selectResultBoq: Selector<IStore, IBoqFailedTableRow[]> = createSelector(
  (state: IStore) => state.funnelBoq.resultActions.resultObj,
  _selectResultBoq
);
