import { ReduxDispatch } from 'models/ReduxProps';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import * as ActivityReportActivityInformationEffects from './ActivityReportActivityInformationEffects';
import { ActivityReportViewEditActivityInformation } from 'stores/activity-report/models/view-edit';
import ResultActions from 'models/ResultActions';

type ActionUnion = undefined | 
    HttpErrorResponseModel | 
    ResultActions |
    ActivityReportViewEditActivityInformation;

export const REQUEST_VIEW_ACTIVITY_INFORMATION: string = 'ActivityReportActivityInformationActions.REQUEST_VIEW_ACTIVITY_INFORMATION';
export const REQUEST_VIEW_ACTIVITY_INFORMATION_FINISHED: string = 'ActivityReportActivityInformationActions.REQUEST_VIEW_ACTIVITY_INFORMATION_FINISHED';
export const requestViewActivityInformationById = (
    activityReportGenID: number, 
    userLoginID: number
): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportViewEditActivityInformation>(
            dispatch,
            REQUEST_VIEW_ACTIVITY_INFORMATION,
            ActivityReportActivityInformationEffects.requestViewActivityInformationById,
            activityReportGenID,
            userLoginID
        );
    };
};

export const REQUEST_UPDATE_ACTIVITY_INFORMATION: string = 'ActivityReportActivityInformationActions.REQUEST_UPDATE_ACTIVITY_INFORMATION';
export const REQUEST_UPDATE_ACTIVITY_INFORMATION_FINISHED: string = 'ActivityReportActivityInformationActions.REQUEST_UPDATE_ACTIVITY_INFORMATION_FINISHED';
export const putViewActivityInformation = (data: ActivityReportViewEditActivityInformation): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            REQUEST_UPDATE_ACTIVITY_INFORMATION,
            ActivityReportActivityInformationEffects.putViewActivityInformation,
            data
        );
    };
};