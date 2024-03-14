import { ReduxDispatch } from 'models/ReduxProps';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import * as ActivityReportSuperiorReviewEffects from './ActivityReportSuperiorReviewEffects';
import { ActivityReportViewEditSuperiorReview } from 'stores/activity-report/models/view-edit';
import ResultActions from 'models/ResultActions';

type ActionUnion = undefined | 
    HttpErrorResponseModel | 
    ResultActions |
    ActivityReportViewEditSuperiorReview;

export const REQUEST_VIEW_SUPERIOR_REVIEW: string = 'ActivityReportSuperiorReviewActions.REQUEST_VIEW_SUPERIOR_REVIEW';
export const REQUEST_VIEW_SUPERIOR_REVIEW_FINISHED: string = 'ActivityReportSuperiorReviewActions.REQUEST_VIEW_SUPERIOR_REVIEW_FINISHED';
export const requestViewSuperiorReviewById = (
    activityReportGenID: number,
    userLoginID: number
): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportViewEditSuperiorReview>(
            dispatch,
            REQUEST_VIEW_SUPERIOR_REVIEW,
            ActivityReportSuperiorReviewEffects.requestViewSuperiorReviewById,
            activityReportGenID,
            userLoginID
        );
    };
};

export const REQUEST_UPDATE_SUPERIOR_REVIEW: string = 'ActivityReportSuperiorReviewActions.REQUEST_UPDATE_SUPERIOR_REVIEW';
export const REQUEST_UPDATE_SUPERIOR_REVIEW_FINISHED: string = 'ActivityReportSuperiorReviewActions.REQUEST_UPDATE_SUPERIOR_REVIEW_FINISHED';
export const putViewSuperiorReview = (data: ActivityReportViewEditSuperiorReview): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            REQUEST_UPDATE_SUPERIOR_REVIEW,
            ActivityReportSuperiorReviewEffects.putViewSuperiorReview,
            data
        );
    };
};