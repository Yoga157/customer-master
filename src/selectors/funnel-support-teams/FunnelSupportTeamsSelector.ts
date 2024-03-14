import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';
import { Selector } from 'react-redux';
import SupportTeamEnvelope from 'stores/funnel-support-teams/models/FunnelSupportTeamEnvelope';
import IFunnelSupportTeamsTable from './models/IFunnelSupportTeamsTable';
import SupportTeamDashboard from 'stores/funnel-support-teams/models/FunnelSupportTeamDashboard';
import IFunnelSupportTeamsTableRow from './models/IFunnelSupportTeamsTableRow';
import FunnelSupportTeamModel from 'stores/funnel-support-teams/models/FunnelSupportTeamModel';

const _selectSupportTeams = (models: SupportTeamEnvelope): IFunnelSupportTeamsTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: SupportTeamDashboard[]): IFunnelSupportTeamsTableRow[] => {
  return models.map((model: SupportTeamDashboard): IFunnelSupportTeamsTableRow => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: SupportTeamDashboard): IFunnelSupportTeamsTableRow => {
  return {
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    funnelSupportID: model.funnelSupportID.toString() === 'NaN' ? 0 : model.funnelSupportID,
    employeeID: model.employeeID === undefined ? 0 : model.employeeID,
    employeeName: model.employeeName === undefined ? '' : model.employeeName,
    supportRoleID: model.supportRoleID === undefined ? 0 : model.supportRoleID,
    supportRole: model.supportRole === undefined ? '' : model.supportRole,
    assignedByID: model.assignedByID === undefined ? 0 : model.assignedByID,
    assignDate: model.assignDate === undefined ? undefined : model.assignDate,
    notes: model.notes === undefined ? '' : model.notes,
    assignedBy: model.assignedBy === undefined ? '' : model.assignedBy,
    flagDelete: model.flagDelete,
  };
};

export const selectSupportTeams: ParametricSelector<IStore, string[], IFunnelSupportTeamsTable> = createSelector(
  (state: IStore) => state.funnelSupportTeams.listData!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectSupportTeams
);

const _selectSupportTeam = (model: FunnelSupportTeamModel): FunnelSupportTeamModel => {
  return new FunnelSupportTeamModel({
    assignedByID: model.assignedByID,
    assignDate: model.assignDate,
    createDate: model.createDate,
    createUserID: model.createUserID,
    employeeID: model.employeeID,
    funnelGenID: model.funnelGenID,
    funnelSupportID: model.funnelSupportID,
    modifyDate: model.modifyDate,
    modifyUserID: model.modifyUserID,
    needAssignFlag: model.needAssignFlag,
    notes: model.notes,
    supportRoleID: model.supportRoleID,
  });
};

export const selectSupportTeam: Selector<IStore, FunnelSupportTeamModel> = createSelector(
  (state: IStore) => state.funnelSupportTeams.data!,

  _selectSupportTeam
);
