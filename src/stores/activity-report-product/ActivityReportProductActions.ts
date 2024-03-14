import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import IStore from 'models/IStore';
import * as ActionUtility from 'utilities/ActionUtility';
import { ReduxDispatch } from 'models/ReduxProps';
import ResultActions from 'models/ResultActions';
import * as ActivityReportProductEffects from './ActivityReportProductEffects';
import ActivityReportProductEnvelope from './models/ActivityReportProductEnvelope';
import ActivityReportProductModel from './models/ActivityReportProductModel';
import ActivityReportProductUpdateModel from './models/ActivityReportProductUpdateModel';
import TableRowModel from './models/TableRowModel';
import ActivityReportViewEditProducts from 'stores/activity-report/models/view-edit/ActivityReportViewEditProducts';

type ActionUnion = undefined | 
    HttpErrorResponseModel | 
    ResultActions | 
    ActivityReportProductEnvelope |
    ActivityReportProductUpdateModel |
    TableRowModel |
    TableRowModel[] |
    ActivityReportProductModel |
    ActivityReportViewEditProducts;

// ---------------------------------------------------------------------------
export const REQUEST_ACTIVITY_REPORT_PRODUCT_LOCAL_TABLEROW: string = 'ActivityReportProductActions.REQUEST_ACTIVITY_REPORT_PRODUCT_LOCAL_TABLEROW';
export const REQUEST_ACTIVITY_REPORT_PRODUCT_LOCAL_TABLEROW_FINISHED: string = 'ActivityReportProductActions.REQUEST_ACTIVITY_REPORT_PRODUCT_LOCAL_TABLEROW_FINISHED';

export const getActivityReportProductLocal = (): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
      await ActionUtility.createThunkEffect<TableRowModel>(
          dispatch, 
          REQUEST_ACTIVITY_REPORT_PRODUCT_LOCAL_TABLEROW, 
          ActivityReportProductEffects.getActivityReportProductLocal);
    };
};

export const REQUEST_VIEW_ACTIVITY_REPORT_PRODUCT: string = 'ActivityReportProductActions.REQUEST_VIEW_ACTIVITY_REPORT_PRODUCT';
export const REQUEST_VIEW_ACTIVITY_REPORT_PRODUCT_FINISHED: string = 'ActivityReportProductActions.REQUEST_VIEW_ACTIVITY_REPORT_PRODUCT_FINISHED';

export const requestViewProductByActivityReportGenID = (
    activityReportGenID: number
): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<TableRowModel>(
            dispatch,
            REQUEST_VIEW_ACTIVITY_REPORT_PRODUCT,
            ActivityReportProductEffects.requestViewProductByActivityReportGenID,
            activityReportGenID
        );
    };
};

export const REQUEST_POST_ACTIVITY_REPORT_PRODUCT: string = 'ActivityReportProductActions.REQUEST_POST_ACTIVITY_REPORT_PRODUCT';
export const REQUEST_POST_ACTIVITY_REPORT_PRODUCT_FINISHED: string = 'ActivityReportProductActions.REQUEST_POST_ACTIVITY_REPORT_PRODUCT_FINISHED';

export const postActivityProduct = (data: ActivityReportProductModel): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch, 
            REQUEST_POST_ACTIVITY_REPORT_PRODUCT, 
            ActivityReportProductEffects.postActivityProduct,
            data
        );
    };
};

export const REQUEST_PUT_ACTIVITY_REPORT_PRODUCT: string = 'ActivityReportProductActions.REQUEST_PUT_ACTIVITY_REPORT_PRODUCT';
export const REQUEST_PUT_ACTIVITY_REPORT_PRODUCT_FINISHED: string = 'ActivityReportProductActions.REQUEST_PUT_ACTIVITY_REPORT_PRODUCT_FINISHED';

export const putActivityProduct = (data: ActivityReportProductUpdateModel): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch, 
            REQUEST_PUT_ACTIVITY_REPORT_PRODUCT, 
            ActivityReportProductEffects.putActivityProduct,
            data
        );
    };
};

export const REQUEST_DELETE_ACTIVITY_REPORT_PRODUCT: string = 'ActivityReportProductActions.REQUEST_DELETE_ACTIVITY_REPORT_PRODUCT';
export const REQUEST_DELETE_ACTIVITY_REPORT_PRODUCT_FINISHED: string = 'ActivityReportProductActions.REQUEST_DELETE_ACTIVITY_REPORT_PRODUCT_FINISHED';

export const deleteActivityProduct = (activityReportGenID: number, activityReportProductGenID: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch, 
            REQUEST_DELETE_ACTIVITY_REPORT_PRODUCT, 
            ActivityReportProductEffects.deleteActivityProduct,
            activityReportGenID,
            activityReportProductGenID
        );
    };
};

export const REQUEST_VIEW_ACTIVITY_REPORT_PRODUCT_CHECK_ALLOW_ACCESS: string = 'ActivityReportProductActions.REQUEST_VIEW_ACTIVITY_REPORT_PRODUCT_CHECK_ALLOW_ACCESS';
export const REQUEST_VIEW_ACTIVITY_REPORT_PRODUCT_CHECK_ALLOW_ACCESS_FINISHED: string = 'ActivityReportProductActions.REQUEST_VIEW_ACTIVITY_REPORT_PRODUCT_CHECK_ALLOW_ACCESS_FINISHED';

export const requestViewProductCheckAllowAccessByActivityReportGenID = (
    activityReportGenID: number,
    userLoginID: number,
): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportViewEditProducts>(
            dispatch,
            REQUEST_VIEW_ACTIVITY_REPORT_PRODUCT_CHECK_ALLOW_ACCESS,
            ActivityReportProductEffects.requestViewProductCheckAllowAccessByActivityReportGenID,
            activityReportGenID,
            userLoginID
        );
    };
};