import { ReduxDispatch } from 'models/ReduxProps';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import * as ActivityReportTicketInformationEffects from './ActivityReportTicketInformationEffects';
import { ActivityReportViewEditTicketInformation } from 'stores/activity-report/models/view-edit';
import ResultActions from 'models/ResultActions';

type ActionUnion = undefined | 
    HttpErrorResponseModel | 
    ResultActions |
    ActivityReportViewEditTicketInformation;

export const REQUEST_VIEW_TICKET_INFORMATION: string = 'ActivityReportTicketInformationActions.REQUEST_VIEW_TICKET_INFORMATION';
export const REQUEST_VIEW_TICKET_INFORMATION_FINISHED: string = 'ActivityReportTicketInformationActions.REQUEST_VIEW_TICKET_INFORMATION_FINISHED';
export const requestViewTicketInformationById = (
    activityReportGenID: number,
    userLoginID: number
): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportViewEditTicketInformation>(
            dispatch,
            REQUEST_VIEW_TICKET_INFORMATION,
            ActivityReportTicketInformationEffects.requestViewTicketInformationById,
            activityReportGenID,
            userLoginID
        );
    };
};

export const REQUEST_UPDATE_TICKET_INFORMATION: string = 'ActivityReportTicketInformationActions.REQUEST_UPDATE_TICKET_INFORMATION';
export const REQUEST_UPDATE_TICKET_INFORMATION_FINISHED: string = 'ActivityReportTicketInformationActions.REQUEST_UPDATE_TICKET_INFORMATION_FINISHED';
export const putViewTicketInformation = (data: ActivityReportViewEditTicketInformation): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            REQUEST_UPDATE_TICKET_INFORMATION,
            ActivityReportTicketInformationEffects.putViewTicketInformation,
            data
        );
    };
};