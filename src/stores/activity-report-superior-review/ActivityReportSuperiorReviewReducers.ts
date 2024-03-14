import ResultActions from "models/ResultActions";
import * as ActivityReportSuperiorReviewActions from './ActivityReportSuperiorReviewActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import IActivityReportSuperiorReviewState from './models/IActivityReportSuperiorReviewState';
import { ActivityReportViewEditSuperiorReview } from 'stores/activity-report/models/view-edit';

export const initialState: IActivityReportSuperiorReviewState = {
    error: false,
    refreshPage: false,
    resultActions: new ResultActions({}),
    data: new ActivityReportViewEditSuperiorReview({}),
};

const ActivityReportSuperiorReviewReducers: Reducer = baseReducer(initialState, {
    [ActivityReportSuperiorReviewActions.REQUEST_VIEW_SUPERIOR_REVIEW_FINISHED](
        state: IActivityReportSuperiorReviewState,
        action: IAction<ActivityReportViewEditSuperiorReview>
    ): IActivityReportSuperiorReviewState {
        return {
            ...state,
            data: action.payload!,
            error: false,
            refreshPage: false,
        };
    },
    [ActivityReportSuperiorReviewActions.REQUEST_UPDATE_SUPERIOR_REVIEW_FINISHED](
        state: IActivityReportSuperiorReviewState,
        action: IAction<ResultActions>
    ): IActivityReportSuperiorReviewState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false : true,
            resultActions: action.payload!,
        };
    },
});

export default ActivityReportSuperiorReviewReducers;