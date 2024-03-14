import * as ActivityReportEffects from './ActivityReportEffects';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import { ReduxDispatch } from 'models/ReduxProps';
import IStore from 'models/IStore';
import ActivityReportDashboardEnvelope from './models/ActivityReportDashboardEnvelope';
import ResultActions from 'models/ResultActions';
import ActivityReportsModel from './models/ActivityReportsModel';
import ActivityReportFilter from './models/ActivityReportFilter';
import ActivityReportCustomer from './models/ActivityReportCustomer';
import ActivityReportEngineer from './models/ActivityReportEngineer';
import ActivityReportTicketNumberOptions from './models/ActivityReportTicketNumberOptions';
import ActivityReportTicketNumber from './models/ActivityReportTicketNumber';
import ActivityReportCheckAllowEdit from './models/ActivityReportCheckAllowEdit';
import ActivityReportCheckSOExist from './models/ActivityReportCheckSOExist';
import ActivityReportSONumber from './models/ActivityReportSONumber';
import ActivityReportModelDelete from './models/ActivityReportModelDelete';
import ActivityReportFunnelDetail from './models/ActivityReportFunnelDetail';
import ActivityReportCheckFunnelGenIdExist from './models/ActivityReportCheckFunnelGenIdExist';

type ActionUnion = undefined | 
    HttpErrorResponseModel | 
    ResultActions |
    ActivityReportDashboardEnvelope |
    ActivityReportCustomer |
    ActivityReportEngineer |
    ActivityReportTicketNumberOptions |
    ActivityReportTicketNumber |
    ActivityReportCheckAllowEdit |
    ActivityReportCheckSOExist |
    ActivityReportSONumber |
    ActivityReportFunnelDetail |
    ActivityReportCheckFunnelGenIdExist;

// ============================================================================
export const REQUEST_ACTIVITY_REPORTS: string = 'ActivityReportActions.REQUEST_ACTIVITY_REPORTS';
export const REQUEST_ACTIVITY_REPORTS_FINISHED: string = 'ActivityReportActions.REQUEST_ACTIVITY_REPORTS_FINISHED';
export const requestActivityReports = (
    activePage: number, 
    pageSize: number, 
    column: string, 
    sorting: string,
    userLogin: string,
    userLoginId: number,
): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportDashboardEnvelope>(
            dispatch,
            REQUEST_ACTIVITY_REPORTS,
            ActivityReportEffects.requestActivityReports,
            activePage,
            pageSize,
            column,
            sorting,
            userLogin,
            userLoginId
        );
    };
};

export const REQUEST_POST_ACTIVITY_REPORT: string = 'ActivityReportActions.REQUEST_POST_ACTIVITY_REPORT';
export const REQUEST_POST_ACTIVITY_REPORT_FINISHED: string = 'ActivityReportActions.REQUEST_POST_ACTIVITY_REPORT_FINISHED';
export const requestPostActivityReport = (data: ActivityReportsModel): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_ACTIVITY_REPORT, ActivityReportEffects.requestPostActivityReport, data)
    };    
};
// ============================================================================
export const REQUEST_DELETE_ACTIVITY_REPORT: string = 'ActivityReportActions.REQUEST_DELETE_ACTIVITY_REPORT';
export const REQUEST_DELETE_ACTIVITY_REPORT_FINISHED: string = 'ActivityReportActions.REQUEST_DELETE_ACTIVITY_REPORT_FINISHED';
export const requestDeleteActivityReport = (data: ActivityReportModelDelete): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_DELETE_ACTIVITY_REPORT, ActivityReportEffects.requestDeleteActivityReport, data)
    };
};
// ============================================================================
export const REQUEST_SEARCH_ACTIVITY_REPORT: string = 'ActivityReportActions.REQUEST_SEARCH_ACTIVITY_REPORT';
export const REQUEST_SEARCH_ACTIVITY_REPORT_FINISHED: string = 'ActivityReportActions.REQUEST_SEARCH_ACTIVITY_REPORT_FINISHED';
export const requestActivityReportSearch = (
    page: number,
    pageSize: number,
    column: string,
    sorting: string,
    search: string,
    userLogin: string,
    userLoginId: number
): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportDashboardEnvelope>(
            dispatch,
            REQUEST_SEARCH_ACTIVITY_REPORT,
            ActivityReportEffects.requestSearchActivityReport,
            page, 
            pageSize,
            column,
            sorting,
            search,
            userLogin,
            userLoginId
        );
    };
};
// ============================================================================
export const REQUEST_FILTER_SEARCH_ACTIVITY_REPORT: string = 'ActivityReportActions.REQUEST_FILTER_SEARCH_ACTIVITY_REPORT';
export const REQUEST_FILTER_SEARCH_ACTIVITY_REPORT_FINISHED: string = 'ActivityReportActions.REQUEST_FILTER_SEARCH_ACTIVITY_REPORT_FINISHED';
export const requestActivityReportFilterSearch = (data: ActivityReportFilter): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportDashboardEnvelope>(
            dispatch,
            REQUEST_FILTER_SEARCH_ACTIVITY_REPORT,
            ActivityReportEffects.requestFilterSearchActivityReport,
            data
        );
    };
};
// ============================================================================
export const REQUEST_ACTIVITY_REPORT_CUSTOMER: string = 'ActivityReportActions.REQUEST_ACTIVITY_REPORT_CUSTOMER';
export const REQUEST_ACTIVITY_REPORT_CUSTOMER_FINISHED: string = 'ActivityReportActions.REQUEST_ACTIVITY_REPORT_CUSTOMER_FINISHED';
export const requestActivityReportCustomer = (userLogin: string): any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportCustomer>(
            dispatch,
            REQUEST_ACTIVITY_REPORT_CUSTOMER,
            ActivityReportEffects.requestActivityReportCustomer,
            userLogin
        );
    };
}
// ============================================================================
export const REQUEST_ACTIVITY_REPORT_ENGINEER: string = 'ActivityReportActions.REQUEST_ACTIVITY_REPORT_ENGINEER';
export const REQUEST_ACTIVITY_REPORT_ENGINEER_FINISHED: string = 'ActivityReportActions.REQUEST_ACTIVITY_REPORT_ENGINEER_FINISHED';
export const requestActivityReportEngineer = (userLogin: string): any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportEngineer>(
            dispatch,
            REQUEST_ACTIVITY_REPORT_ENGINEER,
            ActivityReportEffects.requestActivityReportEngineer,
            userLogin
        );
    };
}
// ============================================================================
export const REQUEST_ACTIVITY_REPORT_TICKET_NUMBER: string = 'ActivityReportActions.REQUEST_ACTIVITY_REPORT_TICKET_NUMBER';
export const REQUEST_ACTIVITY_REPORT_TICKET_NUMBER_FINISHED: string = 'ActivityReportActions.REQUEST_ACTIVITY_REPORT_TICKET_NUMBER_FINISHED';
export const requestActivityReportTicketNumber = (empEmail: string, search: string) : any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportTicketNumberOptions>(
            dispatch,
            REQUEST_ACTIVITY_REPORT_TICKET_NUMBER,
            ActivityReportEffects.requestActivityReportTicketNumber,
            empEmail,
            search
        );
    };
};
// ============================================================================
export const REQUEST_VIEW_ACTIVITY_REPORT_TICKET_NUMBER: string = 'ActivityReportActions.REQUEST_VIEW_ACTIVITY_REPORT_TICKET_NUMBER';
export const REQUEST_VIEW_ACTIVITY_REPORT_TICKET_NUMBER_FINISHED: string = 'ActivityReportActions.REQUEST_VIEW_ACTIVITY_REPORT_TICKET_NUMBER_FINISHED';
export const requestViewActivityReportTicketNumber = (empEmail: string, ticketNumber: string) : any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportTicketNumber>(
            dispatch,
            REQUEST_VIEW_ACTIVITY_REPORT_TICKET_NUMBER,
            ActivityReportEffects.requestViewActivityReportTicketNumber,
            empEmail,
            ticketNumber
        );
    };
};
// ============================================================================
export const REQUEST_POST_ACTIVITY_REPORT_CHECK_ALLOW_EDIT: string = 'ActivityReportActions.REQUEST_POST_ACTIVITY_REPORT_CHECK_ALLOW_EDIT';
export const REQUEST_POST_ACTIVITY_REPORT_CHECK_ALLOW_EDIT_FINISHED: string = 'ActivityReportActions.REQUEST_POST_ACTIVITY_REPORT_CHECK_ALLOW_EDIT_FINISHED';
export const checkAllowEdit = (
    activityReportGenID: number,
    userLoginID: number
) : any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportCheckAllowEdit>(
            dispatch,
            REQUEST_POST_ACTIVITY_REPORT_CHECK_ALLOW_EDIT,
            ActivityReportEffects.checkAllowEdit,
            activityReportGenID,
            userLoginID
        );
    };
};
// ============================================================================
export const REQUEST_CHECK_SO_EXIST: string = 'ActivityReportActions.REQUEST_CHECK_SO_EXIST';
export const REQUEST_CHECK_SO_EXIST_FINISHED: string = 'ActivityReportActions.REQUEST_CHECK_SO_EXIST_FINISHED';
export const checkSOExist = (soNumber: string) : any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportCheckSOExist>(
            dispatch,
            REQUEST_CHECK_SO_EXIST,
            ActivityReportEffects.checkSOExist,
            soNumber  
        );
    };
};
// ============================================================================
export const REQUEST_ACTIVITY_REPORT_SO_NUMBER: string = 'ActivityReportActions.REQUEST_ACTIVITY_REPORT_SO_NUMBER';
export const REQUEST_ACTIVITY_REPORT_SO_NUMBER_FINISHED: string = 'ActivityReportActions.REQUEST_ACTIVITY_REPORT_SO_NUMBER_FINISHED';
export const requestViewActivityReportSONumber = (soNumber: string): any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportSONumber>(
            dispatch,
            REQUEST_ACTIVITY_REPORT_SO_NUMBER,
            ActivityReportEffects.requestViewActivityReportSONumber,
            soNumber  
        );
    }
};
// ============================================================================
export const REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_ID: string = 'ActivityReportActions.REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_ID';
export const REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_ID_FINISHED: string = 'ActivityReportActions.REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_ID_FINISHED';
export const requestActivityReportFunnelGenId = (search: string) : any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportTicketNumberOptions>(
            dispatch,
            REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_ID,
            ActivityReportEffects.requestActivityReportFunnelGenId,
            search
        );
    };
};
// ============================================================================
export const REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_DETAIL: string = 'ActivityReportActions.REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_DETAIL';
export const REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_DETAIL_FINISHED: string = 'ActivityReportActions.REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_DETAIL_FINISHED';
export const requestActivityReportFunnelGenDetail = (funnelGenId: number) : any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportFunnelDetail>(
            dispatch,
            REQUEST_ACTIVITY_REPORT_FUNNEL_GEN_DETAIL,
            ActivityReportEffects.requestActivityReportFunnelGenDetail,
            funnelGenId
        );
    };
};
// ============================================================================
export const REQUEST_CHECK_FUNNEL_EXIST: string = 'ActivityReportActions.REQUEST_CHECK_FUNNEL_EXIST';
export const REQUEST_CHECK_FUNNEL_EXIST_FINISHED: string = 'ActivityReportActions.REQUEST_CHECK_FUNNEL_EXIST_FINISHED';
export const checkFunnelGenIdExist = (funnelGenId: number) : any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportCheckFunnelGenIdExist>(
            dispatch,
            REQUEST_CHECK_FUNNEL_EXIST,
            ActivityReportEffects.checkFunnelGenIdExist,
            funnelGenId  
        );
    };
};