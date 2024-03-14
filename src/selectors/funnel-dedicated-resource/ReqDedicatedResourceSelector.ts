import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';
import { Selector } from 'react-redux';
import IReqDedicatedResourceTable from './models/IReqDedicatedResourceTable';
import ReqDedicatedResourceEnvelope from '../../stores/funnel-dedicated-resource/models/ReqDedicatedResourceEnvelope';
import ReqDedicatedResourceModel from '../../stores/funnel-dedicated-resource/models/ReqDedicatedResourceModel';
import IReqDedicatedResourceTableRow from './models/IReqDedicatedResourceTableRow';

const _selectReqDedicatedResources = (models: ReqDedicatedResourceEnvelope): IReqDedicatedResourceTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: ReqDedicatedResourceModel[]): IReqDedicatedResourceTableRow[] => {
  return models.map((model: ReqDedicatedResourceModel): IReqDedicatedResourceTableRow => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: ReqDedicatedResourceModel): IReqDedicatedResourceTableRow => {
  return {
    funnelGenID: model.funnelGenID.toString() === 'undefined' ? 0 : model.funnelGenID,
    reqResourceGenID: model.reqResourceGenID.toString() === 'undefined' ? 0 : model.reqResourceGenID,
    engineerDeptID: model.engineerDeptID === undefined ? '' : model.engineerDeptID,
    engineerDeptName: model.engineerDeptName === undefined ? '' : model.engineerDeptName,
    requirementDescription: model.requirementDescription === undefined ? '' : model.requirementDescription,
    projectBudget: model.projectBudget.toString() === 'undefined' ? 0 : model.projectBudget,
    paymentType: model.paymentType === 'undefined' ? '' : model.paymentType,
    createUserID: model.createUserID.toString() === 'NaN' ? 0 : model.createUserID,
    createName: model.createName.toString() === 'NaN' ? '' : model.createName,
    lastModifyBy: model.lastModifyBy === 'undefined' ? '' : model.lastModifyBy,
    status: model.status.toString() === 'undefined' ? '' : model.status,
    createDate: model.createDate === null ? null : model.createDate,
    modifyDate: model.modifyDate === null ? null : model.modifyDate,
    modifyUserID: model.modifyUserID === undefined ? 0 : model.modifyUserID,
    numOfResource: model.numOfResource === undefined ? 0 : model.numOfResource,
  };
};

export const selectReqDedicatedResources: ParametricSelector<IStore, string[], IReqDedicatedResourceTable> = createSelector(
  (state: IStore) => state.reqDedicatedResource.listData!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectReqDedicatedResources
);

const _selectReqDedicatedResource = (model: ReqDedicatedResourceModel): ReqDedicatedResourceModel => {
  return new ReqDedicatedResourceModel({
    funnelGenID: model.funnelGenID.toString() === 'undefined' ? 0 : model.funnelGenID,
    reqResourceGenID: model.reqResourceGenID.toString() === 'undefined' ? 0 : model.reqResourceGenID,
    engineerDeptID: model.engineerDeptID === undefined ? '' : model.engineerDeptID,
    engineerDeptName: model.engineerDeptName === undefined ? '' : model.engineerDeptName,
    requirementDescription: model.requirementDescription === undefined ? '' : model.requirementDescription,
    projectBudget: model.projectBudget.toString() === 'undefined' ? 0 : model.projectBudget,
    paymentType: model.paymentType === 'undefined' ? '' : model.paymentType,
    createUserID: model.createUserID.toString() === 'NaN' ? 0 : model.createUserID,
    createName: model.createName.toString() === 'undefined' ? '' : model.createName,
    lastModifyBy: model.lastModifyBy === 'undefined' ? '' : model.lastModifyBy,
    status: model.status.toString() === 'undefined' ? '' : model.status,
    createDate: model.createDate === undefined ? undefined : model.createDate,
    modifyDate: model.modifyDate === undefined ? undefined : model.modifyDate,
    modifyUserID: model.modifyUserID === undefined ? 0 : model.modifyUserID,
    numOfResource: model.numOfResource === undefined ? 0 : model.numOfResource,
  });
};

export const selectReqDedicatedResource: Selector<IStore, ReqDedicatedResourceModel> = createSelector(
  (state: IStore) => state.reqDedicatedResource.data!,
  _selectReqDedicatedResource
);
