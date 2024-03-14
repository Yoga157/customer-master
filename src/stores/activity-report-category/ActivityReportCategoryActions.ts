import * as ActivityReportCategoryEffects from './ActivityReportCategoryEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import ActivityReportCategoryModel from './models/ActivityReportCategoryModel';
import ActivityReportCategoryCheckAndAddModel from './models/ActivityReportCategoryCheckAndAddModel';

type ActionUnion = undefined 
    | HttpErrorResponseModel 
    | ActivityReportCategoryModel[] 
    | ActivityReportCategoryModel
    | ActivityReportCategoryCheckAndAddModel;

export const REQUEST_ACTIVITY_REPORT_CATEGORY: string = 'ActivityReportCategoryActions.REQUEST_ACTIVITY_REPORT_CATEGORY';
export const REQUEST_ACTIVITY_REPORT_CATEGORY_FINISHED: string = 'ActivityReportCategoryActions.REQUEST_ACTIVITY_REPORT_CATEGORY_FINISHED';

export const requestActivityReportCategory = (): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportCategoryModel[]>(
            dispatch, 
            REQUEST_ACTIVITY_REPORT_CATEGORY, 
            ActivityReportCategoryEffects.requestActivityReportCategory);
    };
};

export const REQUEST_POST_ACTIVITY_REPORT_CATEGORY: string = 'ActivityReportCategoryActions.REQUEST_POST_ACTIVITY_REPORT_CATEGORY';
export const REQUEST_POST_ACTIVITY_REPORT_CATEGORY_FINISHED: string = 'ActivityReportCategoryActions.REQUEST_POST_ACTIVITY_REPORT_CATEGORY_FINISHED';

export const requestPostActivityReportCategory = (data: ActivityReportCategoryModel): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportCategoryModel>(
            dispatch,
            REQUEST_POST_ACTIVITY_REPORT_CATEGORY,
            ActivityReportCategoryEffects.requestPostActivityReportCategory,
            data
        );
    };
};

export const REQUEST_POST_ACTIVITY_REPORT_CATEGORY_CHECK_AND_ADD: string = 'ActivityReportCategoryActions.REQUEST_POST_ACTIVITY_REPORT_CATEGORY_CHECK_AND_ADD';
export const REQUEST_POST_ACTIVITY_REPORT_CATEGORY_CHECK_AND_ADD_FINISHED: string = 'ActivityReportCategoryActions.REQUEST_POST_ACTIVITY_REPORT_CATEGORY_CHECK_AND_ADD_FINISHED';

export const requestPostActivityReportCategoryCheckAndAdd = (data: ActivityReportCategoryCheckAndAddModel): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportCategoryCheckAndAddModel>(
            dispatch,
            REQUEST_POST_ACTIVITY_REPORT_CATEGORY_CHECK_AND_ADD,
            ActivityReportCategoryEffects.requestPostActivityReportCategoryCheckAndAdd,
            data
        );
    };
};