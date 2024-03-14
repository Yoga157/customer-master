import * as SummaryActionPlanEffects from './SummaryActionPlanEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import SummaryActionPlanModel from './models/SummaryActionPlanModel';
import SummaryActionPlanHeaderModel from './models/SummaryActionPlanHeaderModel';
import SummaryActionPlanHistoryModel from './models/SummaryActionPlanHistoryModel';
import SummaryActionPlanSubordinateModel from './models/SummaryActionPlanSubordinateModel';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | SummaryActionPlanHeaderModel
  | SummaryActionPlanHistoryModel
  | SummaryActionPlanModel
  | SummaryActionPlanSubordinateModel;

export const REQUEST_SUMMARY_ACTIONPLAN: string = 'SummaryActionPlanActions.REQUEST_SUMMARY_ACTIONPLAN';
export const REQUEST_SUMMARY_ACTIONPLAN_FINISHED: string = 'SummaryActionPlanActions.REQUEST_SUMMARY_ACTIONPLAN_FINISHED';

export const requestSummaryActionPlanById = (accName: string, month: string, year: number, user: number, direktoratname: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<SummaryActionPlanHeaderModel>(
      dispatch,
      REQUEST_SUMMARY_ACTIONPLAN,
      SummaryActionPlanEffects.requestSummaryActionPlanById,
      accName,
      month,
      year,
      user,
      direktoratname
    );
  };
};

export const REQUEST_HISTORY: string = 'SummaryActionPlanActions.REQUEST_HISTORY';
export const REQUEST_HISTORY_FINISHED: string = 'SummaryActionPlanActions.REQUEST_HISTORY_FINISHED';

export const requestHistory = (year: number, userLoginID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SummaryActionPlanHistoryModel>(
      dispatch,
      REQUEST_HISTORY,
      SummaryActionPlanEffects.requestHistory,
      year,
      userLoginID
    );
  };
};

export const REQUEST_SUBORDINATE: string = 'SummaryActionPlanActions.REQUEST_SUBORDINATE';
export const REQUEST_SUBORDINATE_FINISHED: string = 'SummaryActionPlanActions.REQUEST_SUBORDINATE_FINISHED';

export const requestSubordinate = (month: string, year: number, userLoginID: number, direktoratname: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SummaryActionPlanSubordinateModel>(
      dispatch,
      REQUEST_SUBORDINATE,
      SummaryActionPlanEffects.requestSubOrdinate,
      month,
      year,
      userLoginID,
      direktoratname
    );
  };
};

export const POST_SUMMARY_ACTIONPLAN: string = 'SummaryActionPlanActions.REQUEST_POST_SUMMARY_ACTIONPLAN';
export const POST_SUMMARY_ACTIONPLAN_FINISHED = 'SummaryActionPlanActions.REQUEST_POST_SUMMARY_ACTIONPLAN_FINISHED';
export const postActionSummaryPlan = (data: SummaryActionPlanModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<SummaryActionPlanModel>(
      dispatch,
      POST_SUMMARY_ACTIONPLAN,
      SummaryActionPlanEffects.postSummaryActionPlan,
      data
    );
  };
};
