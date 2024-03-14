import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import ISummaryActionPlanItem from './models/ISummaryActionPlanItem';
import ISummaryActionPlanSubordinate from './models/ISummaryActionPlanSubordinate';
import { Selector } from 'react-redux';
import SummaryActionPlanHistoryModel from 'stores/summary-actionplan/models/SummaryActionPlanHistoryModel';
import SummaryActionPlanSubordinateModel from 'stores/summary-actionplan/models/SummaryActionPlanSubordinateModel';

const _selectSummaryActionPlanHistory = (models: SummaryActionPlanHistoryModel[]): ISummaryActionPlanItem[] => {
  return models.map((model: SummaryActionPlanHistoryModel): ISummaryActionPlanItem => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: SummaryActionPlanHistoryModel): ISummaryActionPlanItem => {
  return {
    logDate: model.logDate,
    logUser: model.logUser,
    actionPlan: model.actionPlan,
    forSales: model.forSales,
    reviewMonth: model.reviewMonth,
  };
};

export const selectSummaryActionPlanHistory: ParametricSelector<IStore, string[], ISummaryActionPlanItem[]> = createSelector(
  (state: IStore) => state.summaryActionPlan.history,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectSummaryActionPlanHistory
);

const _selectSummaryActionPlanSubordinate = (models: SummaryActionPlanSubordinateModel[]): ISummaryActionPlanSubordinate[] => {
  return models.map((model: SummaryActionPlanSubordinateModel): ISummaryActionPlanSubordinate => _mappingObjectSubordinateTableRow(model));
};

const _mappingObjectSubordinateTableRow = (model: SummaryActionPlanSubordinateModel): ISummaryActionPlanSubordinate => {
  return {
    empName: model.empName,
    quotaGPM: model.quotaGPM,
    performanceGPM: model.performanceGPM,
    gapGPM: model.gapGPM,
    lastActionPlan: model.lastActionPlan,
  };
};

export const selectSummaryActionPlanSubordinate: ParametricSelector<IStore, string[], ISummaryActionPlanSubordinate[]> = createSelector(
  (state: IStore) => state.summaryActionPlan.subordinate,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectSummaryActionPlanSubordinate
);
