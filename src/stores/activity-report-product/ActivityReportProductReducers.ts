import ResultActions from 'models/ResultActions';
import { Reducer } from 'redux';
import baseReducer from '../../utilities/BaseReducer';
import * as ActivityReportProductActions from './ActivityReportProductActions';
import ActivityReportProductEnvelope from './models/ActivityReportProductEnvelope';
import IActivityReportProductState from './models/IActivityReportProductState';
import IAction from 'models/IAction';
import ActivityReportViewEditProducts from 'stores/activity-report/models/view-edit/ActivityReportViewEditProducts';

export const initialState: IActivityReportProductState = {
    data: new ActivityReportProductEnvelope({}),
    resultActions: new ResultActions({}),
    rowTable: [],
    error: false,
    refreshPage: false,
    selectedData: new ActivityReportViewEditProducts({}),
};

const ActivityReportProductReducers: Reducer = baseReducer(initialState, {
    [ActivityReportProductActions.REQUEST_ACTIVITY_REPORT_PRODUCT_LOCAL_TABLEROW_FINISHED](
        state: IActivityReportProductState,
        action: IAction<any>
    ) : IActivityReportProductState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false : true,
            rowTable: action.payload!,
        }
    },
    // [ActivityReportProductActions.REQUEST_ACTIVITY_REPORT_PRODUCT_TABLEROW_FINISHED](
    //     state: IActivityReportProductState,
    //     action: IAction<ActivityReportProductEnvelope>
    // ) : IActivityReportProductState {
    //     return {
    //         ...state,
    //         data: action.payload!,
    //         error: action.error!
    //     };
    // },
    [ActivityReportProductActions.REQUEST_VIEW_ACTIVITY_REPORT_PRODUCT_FINISHED](
        state: IActivityReportProductState,
        action: any
    ) : IActivityReportProductState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false : true,
            rowTable: action.payload!,
        };
    },
    [ActivityReportProductActions.REQUEST_VIEW_ACTIVITY_REPORT_PRODUCT_CHECK_ALLOW_ACCESS_FINISHED](
        state: IActivityReportProductState,
        action: any
    ) : IActivityReportProductState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false : true,
            selectedData: action.payload!,
        };
    },
    [ActivityReportProductActions.REQUEST_POST_ACTIVITY_REPORT_PRODUCT_FINISHED](
        state: IActivityReportProductState,
        action: IAction<ResultActions>
    ) : IActivityReportProductState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false : true,
            resultActions: action.payload!
        };
    },
    [ActivityReportProductActions.REQUEST_PUT_ACTIVITY_REPORT_PRODUCT_FINISHED](
        state: IActivityReportProductState,
        action: IAction<ResultActions>
    ) : IActivityReportProductState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false :true,
            resultActions: action.payload!,
        };
    },
    [ActivityReportProductActions.REQUEST_DELETE_ACTIVITY_REPORT_PRODUCT_FINISHED](
        state: IActivityReportProductState,
        action: IAction<ResultActions>
    ) : IActivityReportProductState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false :true,
            resultActions: action.payload!,
        };
    },
});

export default ActivityReportProductReducers;