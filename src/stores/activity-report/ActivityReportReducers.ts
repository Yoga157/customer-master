import * as ActivityReportActions from './ActivityReportActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import IActivityReportState from './models/IActivityReportState';
import TableRowModel from '../activity-report-product/models/TableRowModel';
import ActivityReportModel from './models/ActivityReportModel';
import ActivityReportDashboardEnvelope from './models/ActivityReportDashboardEnvelope';
import ResultActions from 'models/ResultActions';
import { ActivityReportViewEditSuperiorReview, ActivityReportViewEditTicketInformation, ActivityReportViewEditTotalCustomerExperience } from './models/view-edit';
import ActivityReportViewCustomerSignature from './models/view-edit/ActivityReportViewCustomerSignature';
import ActivityReportCustomer from './models/ActivityReportCustomer';
import ActivityReportEngineer from './models/ActivityReportEngineer';
import ActivityReportTicketNumberOptions from './models/ActivityReportTicketNumberOptions';
import ActivityReportTicketNumber from './models/ActivityReportTicketNumber';
import ActivityReportCheckAllowEdit from './models/ActivityReportCheckAllowEdit';
import ActivityReportCheckSOExist from './models/ActivityReportCheckSOExist';
import ActivityReportSONumber from './models/ActivityReportSONumber';
import ActivityReportFunnelDetail from './models/ActivityReportFunnelDetail';
import ActivityReportCheckFunnelGenIdExist from './models/ActivityReportCheckFunnelGenIdExist';

export const initialState: IActivityReportState = {
    data: [],
    firstData: new ActivityReportModel({}),
    listData: new ActivityReportDashboardEnvelope({}),
    error: false,
    refreshPage: false,
    resultActions: new ResultActions({}),
    activityReportCustomer: [],
    activityReportEngineer: [],
    activityReportTicketNumberOptions: [],
    activityReportFunnelGenId: [],
    activityReportTicketNumber: new ActivityReportTicketNumber({}),
    activityReportCheckAllowEdit: new ActivityReportCheckAllowEdit({}),
    activityReportCheckSoExist: new ActivityReportCheckSOExist({}),
    activityReportSONumber: new ActivityReportSONumber({}),
    activityReportFunnelDetail: new ActivityReportFunnelDetail({}),
    activityReportCheckFunnelExist: new ActivityReportCheckFunnelGenIdExist({})
};

const ActivityReportReducer: Reducer = baseReducer(initialState, {
    [ActivityReportActions.REQUEST_ACTIVITY_REPORTS_FINISHED](
        state: IActivityReportState, 
        action: IAction<ActivityReportDashboardEnvelope>
    ): IActivityReportState {
        return {
            ...state,
            listData: action.payload!,
            error: action.error!,
            refreshPage: false,
        };
    },
    [ActivityReportActions.REQUEST_POST_ACTIVITY_REPORT_FINISHED](
        state: IActivityReportState,
        action: IAction<ResultActions>
    ): IActivityReportState {
        return {
            ...state,
            resultActions: action.payload!,
            refreshPage: action.error ? false : true,
            error: action.error!,
        };
    },
    [ActivityReportActions.REQUEST_DELETE_ACTIVITY_REPORT_FINISHED](
        state: IActivityReportState,
        action: IAction<ResultActions>
    ): IActivityReportState {
        return {
            ...state,
            resultActions: action.payload!,
            refreshPage: action.error ? false : true,
            error: action.error!,
        };
    },
    [ActivityReportActions.REQUEST_SEARCH_ACTIVITY_REPORT_FINISHED](
        state: IActivityReportState,
        action: IAction<ActivityReportDashboardEnvelope>
    ): IActivityReportState {
        return {
            ...state,
            listData: action.payload!,
            error: false, 
            refreshPage: false,
        };
    },
    [ActivityReportActions.REQUEST_FILTER_SEARCH_ACTIVITY_REPORT_FINISHED](
        state: IActivityReportState,
        action: IAction<ActivityReportDashboardEnvelope>
    ): IActivityReportState {
        return {
            ...state,
            listData: action.payload!,
            error: false, 
            refreshPage: false,
        };
    },
    [ActivityReportActions.REQUEST_ACTIVITY_REPORT_CUSTOMER_FINISHED](
        state: IActivityReportState,
        action: IAction<ActivityReportCustomer[]>
    ) : IActivityReportState {
        return {
            ...state,
            error: action.error!,
            activityReportCustomer: action.payload!,
            refreshPage: false,
        };
    },
    [ActivityReportActions.REQUEST_ACTIVITY_REPORT_ENGINEER_FINISHED](
        state: IActivityReportState,
        action: IAction<ActivityReportEngineer[]>
    ) : IActivityReportState {
        return {
            ...state,
            error: action.error!,
            activityReportEngineer: action.payload!,
            refreshPage: false,
        };
    },
    [ActivityReportActions.REQUEST_ACTIVITY_REPORT_TICKET_NUMBER_FINISHED](
        state: IActivityReportState,
        action: IAction<ActivityReportTicketNumberOptions[]>
    ) : IActivityReportState {
        return {
            ...state,
            error: action.error!,
            activityReportTicketNumberOptions: action.payload!,
            refreshPage: false,
        };
    },
    [ActivityReportActions.REQUEST_VIEW_ACTIVITY_REPORT_TICKET_NUMBER_FINISHED](
        state: IActivityReportState,
        action: IAction<ActivityReportTicketNumber>
    ) : IActivityReportState {
        return {
            ...state,
            error: action.error!,
            activityReportTicketNumber: action.payload!,
            refreshPage: false,
        };
    },
    [ActivityReportActions.REQUEST_POST_ACTIVITY_REPORT_CHECK_ALLOW_EDIT_FINISHED](
        state: IActivityReportState,
        action: IAction<ActivityReportCheckAllowEdit>
    ): IActivityReportState {
        return {
            ...state, 
            activityReportCheckAllowEdit: action.payload!,
        };
    },
    [ActivityReportActions.REQUEST_CHECK_SO_EXIST_FINISHED](
        state: IActivityReportState,
        action: IAction<ActivityReportCheckSOExist>
    ): IActivityReportState {
        return {
            ...state, 
            activityReportCheckSoExist: action.payload!,            
        };
    },
    [ActivityReportActions.REQUEST_ACTIVITY_REPORT_SO_NUMBER_FINISHED](
        state: IActivityReportState,
        action: IAction<ActivityReportSONumber>
    ): IActivityReportState {
        return {
            ...state,
            activityReportSONumber: action.payload!
        }
    },
    [ActivityReportActions.REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_ID_FINISHED](
        state: IActivityReportState,
        action: IAction<ActivityReportTicketNumberOptions[]>
    ) : IActivityReportState {
        return {
            ...state,
            error: action.error!,
            activityReportFunnelGenId: action.payload!,
            refreshPage: false,
        };
    },
    [ActivityReportActions.REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_DETAIL_FINISHED](
        state: IActivityReportState,
        action: IAction<ActivityReportFunnelDetail>
    ): IActivityReportState {
        return {
            ...state,
            activityReportFunnelDetail: action.payload!,
            error: action.error!,
            refreshPage: false,
        }
    },
    [ActivityReportActions.REQUEST_CHECK_FUNNEL_EXIST_FINISHED](
        state: IActivityReportState,
        action: IAction<ActivityReportCheckFunnelGenIdExist>
    ): IActivityReportState {
        return {
            ...state, 
            activityReportCheckFunnelExist: action.payload!,            
        };
    },
});

export default ActivityReportReducer;