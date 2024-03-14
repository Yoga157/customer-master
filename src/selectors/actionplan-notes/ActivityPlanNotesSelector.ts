import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import IActionPlanNotesItem from './models/IActionPlanNotesItem';
import { Selector } from 'react-redux';
import ActionPlanNotesHistoryModel from 'stores/actionplan-notes/models/ActionPlanNotesHistoryModel';
//import FunnelActivityModel from 'stores/funnel-activity/models/FunnelActivityModel';
//import IFunnelActivityItem from './models/IFunnelActivityItem';

const _selectActionPlanHistory = (models: ActionPlanNotesHistoryModel[]): IActionPlanNotesItem[] => {
  return models.map((model: ActionPlanNotesHistoryModel): IActionPlanNotesItem => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: ActionPlanNotesHistoryModel): IActionPlanNotesItem => {
  return {
    logDate: model.logDate,
    logUser: model.logUser,
    comment: model.comment,
  };
};

export const selectActionPlanHistory: ParametricSelector<IStore, string[], IActionPlanNotesItem[]> = createSelector(
  (state: IStore) => state.actionPlan.history,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectActionPlanHistory
);
