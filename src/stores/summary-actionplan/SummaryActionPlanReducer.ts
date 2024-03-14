import ISummaryActionPlanState from './models/ISummaryActionPlanState';
import * as SummaryActionPlanActions from './SummaryActionPlanActions';
import IAction from '../../models/IAction';
import SummaryActionPlanHeaderModel from './models/SummaryActionPlanHeaderModel';
import SummaryActionPlanHistoryModel from './models/SummaryActionPlanHistoryModel';
import SummaryActionPlanSubordinateModel from './models/SummaryActionPlanSubordinateModel';
import SummaryActionPlanModel from './models/SummaryActionPlanModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: ISummaryActionPlanState = {
  history: [],
  subordinate: [],
  firstData: new SummaryActionPlanHeaderModel({}),
  error: false,
  refreshPage: false,
};

const summaryActionPlanReducer: Reducer = baseReducer(initialState, {
  [SummaryActionPlanActions.REQUEST_HISTORY_FINISHED](
    state: ISummaryActionPlanState,
    action: IAction<SummaryActionPlanHistoryModel[]>
  ): ISummaryActionPlanState {
    return {
      ...state,
      history: action.payload!,
      refreshPage: false,
    };
  },
  [SummaryActionPlanActions.REQUEST_SUBORDINATE_FINISHED](
    state: ISummaryActionPlanState,
    action: IAction<SummaryActionPlanSubordinateModel[]>
  ): ISummaryActionPlanState {
    return {
      ...state,
      subordinate: action.payload!,
      refreshPage: false,
    };
  },
  [SummaryActionPlanActions.REQUEST_SUMMARY_ACTIONPLAN_FINISHED](
    state: ISummaryActionPlanState,
    action: IAction<SummaryActionPlanHeaderModel>
  ): ISummaryActionPlanState {
    return {
      ...state,
      firstData: action.payload!,
      refreshPage: false,
    };
  },
  [SummaryActionPlanActions.POST_SUMMARY_ACTIONPLAN_FINISHED](
    state: ISummaryActionPlanState,
    action: IAction<SummaryActionPlanModel>
  ): ISummaryActionPlanState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
});

export default summaryActionPlanReducer;
