import IActivityReportCategoryState from './models/IActivityReportCategoryState';
import * as ActivityReportCategoryActions from './ActivityReportCategoryActions';
import IAction from 'models/IAction';
import ActivityReportCategoryModel from './models/ActivityReportCategoryModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import ResultActions from 'models/ResultActions';

export const initialState: IActivityReportCategoryState = {
    activityReportCategory: [],
    firstData: new ActivityReportCategoryModel({}),
    refreshPage: false,
    error: false,
    resultActions: new ResultActions({})
};

const ActivityReportCategoryReducer: Reducer = baseReducer(initialState, {
    [ActivityReportCategoryActions.REQUEST_ACTIVITY_REPORT_CATEGORY_FINISHED](
        state: IActivityReportCategoryState, 
        action: IAction<ActivityReportCategoryModel[]>
    ): IActivityReportCategoryState {
        return {
            ...state,
            activityReportCategory: action.payload!,
            refreshPage: false,
            error: action.error!
        };
    },
    [ActivityReportCategoryActions.REQUEST_POST_ACTIVITY_REPORT_CATEGORY_FINISHED](
        state: IActivityReportCategoryState,
        action: IAction<ResultActions>
    ) : IActivityReportCategoryState {
        return {
            ...state,
            error: action.error!,
            refreshPage: (action.error) ? false : true,
            resultActions: action.payload!
        };
    },
    [ActivityReportCategoryActions.REQUEST_POST_ACTIVITY_REPORT_CATEGORY_CHECK_AND_ADD_FINISHED](
        state: IActivityReportCategoryState,
        action: IAction<ResultActions>
    ) : IActivityReportCategoryState {
        return {
            ...state,
            error: action.error!,
            refreshPage: (action.error) ? false : true,
            resultActions: action.payload!
        };
    },
});

export default ActivityReportCategoryReducer;