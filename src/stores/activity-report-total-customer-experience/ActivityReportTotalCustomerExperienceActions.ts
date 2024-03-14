import { ReduxDispatch } from 'models/ReduxProps';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import * as ActivityReportTotalCustomerExperienceEffects from './ActivityReportTotalCustomerExperienceEffects';
import { ActivityReportViewEditTotalCustomerExperience } from 'stores/activity-report/models/view-edit';
import ResultActions from 'models/ResultActions';

type ActionUnion = undefined | 
    HttpErrorResponseModel | 
    ResultActions |
    ActivityReportViewEditTotalCustomerExperience;

export const REQUEST_VIEW_TOTAL_CUSTOMER_EXPERIENCE: string = 'ActivityReportTotalCustomerExperienceActions.REQUEST_VIEW_TOTAL_CUSTOMER_EXPERIENCE';
export const REQUEST_VIEW_TOTAL_CUSTOMER_EXPERIENCE_FINISHED: string = 'ActivityReportTotalCustomerExperienceActions.REQUEST_VIEW_TOTAL_CUSTOMER_EXPERIENCE_FINISHED';
export const requestViewTotalCustomerExperienceById = (
    activityReportGenID: number,
    userLoginID: number
): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportViewEditTotalCustomerExperience>(
            dispatch,
            REQUEST_VIEW_TOTAL_CUSTOMER_EXPERIENCE,
            ActivityReportTotalCustomerExperienceEffects.requestViewTotalCustomerExperienceById,
            activityReportGenID,
            userLoginID
        );
    };
};

export const REQUEST_UPDATE_TOTAL_CUSTOMER_EXPERIENCE: string = 'ActivityReportTotalCustomerExperienceActions.REQUEST_UPDATE_TOTAL_CUSTOMER_EXPERIENCE';
export const REQUEST_UPDATE_TOTAL_CUSTOMER_EXPERIENCE_FINISHED: string = 'ActivityReportTotalCustomerExperienceActions.REQUEST_UPDATE_TOTAL_CUSTOMER_EXPERIENCE_FINISHED';
export const putViewTotalCustomerExperience = (data: ActivityReportViewEditTotalCustomerExperience): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            REQUEST_UPDATE_TOTAL_CUSTOMER_EXPERIENCE,
            ActivityReportTotalCustomerExperienceEffects.putViewTotalCustomerExperience,
            data
        );
    };
};