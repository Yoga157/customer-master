import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';
import { Selector } from 'react-redux';
import IPOCRecuirementTableRow from './models/IPOCRequirementTableRow';
import IPOCRecuirementTable from './models/IPOCRequirementTabel';
import POCRequirementDashboard from 'stores/funnel-poc-requirement/models/POCRequirementDashboard';
import POCRecuirementEnvelope from 'stores/funnel-poc-requirement/models/POCRequirementEnvelope';

const _selectPOCRequirement = (models: POCRecuirementEnvelope): IPOCRecuirementTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: POCRequirementDashboard[]): IPOCRecuirementTableRow[] => {
  return models.map((model: POCRequirementDashboard): IPOCRecuirementTableRow => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: POCRequirementDashboard): IPOCRecuirementTableRow => {
  return {
    pocGenReqID: model.pocGenReqID.toString() === 'NaN' ? 0 : model.pocGenReqID,
    pocGenHID: model.pocGenHID === undefined ? 0 : model.pocGenHID,
    pocReqType: model.pocReqType.toString() === 'NaN' ? 0 : model.pocReqType,
    requirementType: model.requirementType === 'undefined' ? '' : model.requirementType,
    sourceType: model.sourceType === 'undefined' ? '' : model.sourceType,
    itemQty: model.itemQty.toString() === 'NaN' ? 0 : model.itemQty,
    itemDescription: model.itemDescription === 'undefined' ? '' : model.itemDescription,
    pocReqPICDeptID: model.pocReqPICDeptID === 'undefined' ? '' : model.pocReqPICDeptID,
    pocReqDeptName: model.pocReqDeptName === 'undefined' ? '' : model.pocReqDeptName,
    pocReqPICID: model.pocReqPICID === 'undefined' ? '' : model.pocReqPICID,
    pocReqPICName: model.pocReqPICName === 'undefined' ? '' : model.pocReqPICName,
    pocReqPICAssign: model.pocReqPICAssign === 'undefined' ? '' : model.pocReqPICAssign,
    pocReqRemarks: model.pocReqRemarks === 'undefined' ? '' : model.pocReqRemarks,
    pocReqStatusID: model.pocReqStatusID.toString() === 'NaN' ? 0 : model.pocReqStatusID,
    createBy: model.createBy === 'undefined' ? '' : model.createBy,
    lastModifyBy: model.lastModifyBy === 'undefined' ? '' : model.lastModifyBy,
    createDate: model.createDate === null ? null : model.createDate,
    createUserID: model.createUserID.toString() === 'NaN' ? 0 : model.createUserID,
    modifyDate: model.modifyDate === null ? null : model.modifyDate,
    modifyUserID: model.modifyUserID.toString() === 'NaN' ? 0 : model.modifyUserID,
  };
};

export const selectPOCRequirement: ParametricSelector<IStore, string[], IPOCRecuirementTable> = createSelector(
  (state: IStore) => state.pocRequirement.listData!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectPOCRequirement
);

const _selectPOCRequirementSingle = (model: POCRequirementDashboard): POCRequirementDashboard => {
  return _mappingPOCReqObject(model);
};

const _mappingPOCReqObject = (model: POCRequirementDashboard): POCRequirementDashboard => {
  return new POCRequirementDashboard({
    pocGenReqID: model.pocGenReqID.toString() === 'NaN' ? 0 : model.pocGenReqID,
    pocGenHID: model.pocGenHID === undefined ? 0 : model.pocGenHID,
    pocReqType: model.pocReqType.toString() === 'NaN' ? 0 : model.pocReqType,
    requirementType: model.requirementType === 'undefined' ? '' : model.requirementType,
    sourceType: model.sourceType === 'undefined' ? '' : model.sourceType,
    itemQty: model.itemQty.toString() === 'NaN' ? 0 : model.itemQty,
    itemDescription: model.itemDescription === 'undefined' ? '' : model.itemDescription,
    pocReqPICDeptID: model.pocReqPICDeptID === 'undefined' ? '' : model.pocReqPICDeptID,
    pocReqDeptName: model.pocReqDeptName === 'undefined' ? '' : model.pocReqDeptName,
    pocReqPICID: model.pocReqPICID === 'undefined' ? '' : model.pocReqPICID,
    pocReqPICName: model.pocReqPICName === 'undefined' ? '' : model.pocReqPICName,
    pocReqPICAssign: model.pocReqPICAssign === 'undefined' ? '' : model.pocReqPICAssign,
    pocReqRemarks: model.pocReqRemarks === 'undefined' ? '' : model.pocReqRemarks,
    pocReqStatusID: model.pocReqStatusID.toString() === 'NaN' ? 0 : model.pocReqStatusID,
    createBy: model.createBy === 'undefined' ? '' : model.createBy,
    lastModifyBy: model.lastModifyBy === 'undefined' ? '' : model.lastModifyBy,
    createDate: model.createDate === undefined ? undefined : model.createDate,
    createUserID: model.createUserID.toString() === 'NaN' ? 0 : model.createUserID,
    modifyDate: model.modifyDate === undefined ? undefined : model.modifyDate,
    modifyUserID: model.modifyUserID.toString() === 'NaN' ? 0 : model.modifyUserID,
  });
};

export const selectPOCRequirementSingle: Selector<IStore, POCRequirementDashboard> = createSelector(
  (state: IStore) => state.pocRequirement.firstData!,
  _selectPOCRequirementSingle
);

const _createTotalCompleted = (models: POCRequirementDashboard[]): number => {
  let result: number = 1;
  models.forEach((element) => {
    if (element.pocReqStatusID === 0) {
      result = 0;
    }
  });
  return result;
};

const _selectTotalCompleted = (models: POCRecuirementEnvelope): number => {
  return _createTotalCompleted(models.rows);
};

export const selectTotalPOCCompleted: Selector<IStore, number> = createSelector(
  (state: IStore) => state.pocRequirement.listData,
  _selectTotalCompleted
);
