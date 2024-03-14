import environment from 'environment';
import * as EffectUtility from '../../utilities/EffectUtility';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import ResultActions from 'models/ResultActions';
import ActivityReportsModel from './models/ActivityReportsModel';
import { ActivityReportViewEditActivityInformation, ActivityReportViewEditNotes, ActivityReportViewEditSuperiorReview, ActivityReportViewEditTicketInformation, ActivityReportViewEditTotalCustomerExperience } from './models/view-edit';
import ActivityReportViewCustomerSignature from './models/view-edit/ActivityReportViewCustomerSignature';
import ActivityReportDashboardEnvelope from './models/ActivityReportDashboardEnvelope';
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

// ============================================================================
export const requestActivityReports = async (
    activePage: number, 
    pageSize: number, 
    column: string, 
    sorting: string,
    userLogin: string, 
    userLoginId: number
): Promise<ActivityReportDashboardEnvelope | HttpErrorResponseModel> => {
    const controllerName = `ActivityReport/Dashboard?page=${activePage}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&userLogin=${userLogin}&userLoginId=${userLoginId}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportDashboardEnvelope>(ActivityReportDashboardEnvelope, endpoint);
};

export const requestPostActivityReport = async (data: ActivityReportsModel): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = 'ActivityReport';
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};
// ============================================================================
export const requestDeleteActivityReport = async (data: ActivityReportModelDelete): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = 'ActivityReport/Delete';
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    // const endpoint: string = "http://192.168.1.112:5003/api/" + controllerName;
    return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data); 
}
// ============================================================================
export const requestSearchActivityReport = async (
    page: number,
    pageSize: number,
    column: string,
    sorting: string,
    search: string,
    userLogin: string,
    userLoginId: number
) : Promise<ActivityReportDashboardEnvelope | HttpErrorResponseModel> => {
    const controllerName = `ActivityReport/Search?column=${column}&sorting=${sorting}&page=${page}&pageSize=${pageSize}&search=${search}&userLogin=${userLogin}&userLoginId=${userLoginId}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportDashboardEnvelope>(ActivityReportDashboardEnvelope, endpoint)
};
// ============================================================================
export const requestFilterSearchActivityReport = async (data: ActivityReportFilter) : Promise<ActivityReportDashboardEnvelope | HttpErrorResponseModel> => {
    const controllerName = `ActivityReport/FilterSearch`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.postToModel<ActivityReportDashboardEnvelope>(ActivityReportDashboardEnvelope, endpoint, data);
};
// ============================================================================
export const requestActivityReportCustomer = async(userLogin: string) : Promise<ActivityReportCustomer | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportCustomer?userLogin=${userLogin}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportCustomer>(ActivityReportCustomer, endpoint);
};
// ============================================================================
export const requestActivityReportEngineer = async(userLogin: string) : Promise<ActivityReportEngineer | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportEngineer?userLogin=${userLogin}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportEngineer>(ActivityReportEngineer, endpoint);
};
// ============================================================================
export const requestActivityReportTicketNumber = async(
    empEmail: string,
    search: string
) : Promise<ActivityReportTicketNumberOptions | HttpErrorResponseModel> => {
    const controllerName = `Autotask/GetTicketAndTaskByEmpEmail?empEmail=${empEmail}&search=${search}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportTicketNumberOptions>(ActivityReportTicketNumberOptions, endpoint);
};
// ============================================================================
export const requestViewActivityReportTicketNumber = async(
    empEmail: string,
    ticketNumber: string
): Promise<ActivityReportTicketNumber| HttpErrorResponseModel> => {
    const controllerName = `Autotask/GetTicketOrTaskInformation?empEmail=${empEmail}&ticketOrTaskNumber=${ticketNumber}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportTicketNumber>(ActivityReportTicketNumber, endpoint);
};
// ============================================================================
export const checkAllowEdit = async(
    activityReportGenID: number,
    userLoginID: number
): Promise<ActivityReportCheckAllowEdit | HttpErrorResponseModel> => {
    const controllerName = `ActivityReport/CheckAllowEdit?id=${activityReportGenID}&userLoginID=${userLoginID}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.postToModel<ActivityReportCheckAllowEdit>(
        ActivityReportCheckAllowEdit,
        endpoint
    );
};
// ============================================================================
export const checkSOExist = async(
    soNumber: string
): Promise<ActivityReportCheckSOExist | HttpErrorResponseModel> => {
    const controllerName = `SO/CheckSOExist?soNumber=${soNumber}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportCheckSOExist>(
        ActivityReportCheckSOExist,
        endpoint
    );
};
// ============================================================================
export const requestViewActivityReportSONumber = async(
    soNumber: string
): Promise<ActivityReportSONumber | HttpErrorResponseModel> => {
    const controllerName = `SO/GetInformation?soNumber=${soNumber}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportSONumber>(
        ActivityReportSONumber,
        endpoint
    );
};
// ============================================================================
export const requestActivityReportFunnelGenId = async(
    search: string
) : Promise<ActivityReportTicketNumberOptions | HttpErrorResponseModel> => {
    const controllerName = `ActivityReport/GetFunnel?search=${search}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportTicketNumberOptions>(ActivityReportTicketNumberOptions, endpoint);
};
// ============================================================================
export const requestActivityReportFunnelGenDetail = async(
    funnelGenId: number
) : Promise<ActivityReportFunnelDetail | HttpErrorResponseModel> => {
    const controllerName = `ActivityReport/GetDetailFunnel?funnelGenId=${funnelGenId}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportFunnelDetail>(ActivityReportFunnelDetail, endpoint);
};
// ============================================================================
export const checkFunnelGenIdExist = async(
    funnelGenId: number
): Promise<ActivityReportCheckFunnelGenIdExist | HttpErrorResponseModel> => {
    const controllerName = `ActivityReport/CheckFunnelExist?funnelGenId=${funnelGenId}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportCheckFunnelGenIdExist>(
        ActivityReportCheckFunnelGenIdExist,
        endpoint
    );
};