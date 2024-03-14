import environment from 'environment';
import * as EffectUtility from '../../utilities/EffectUtility';
import HttpErrorResponseModel from "models/HttpErrorResponseModel";
import { ActivityReportViewEditTicketInformation } from "stores/activity-report/models/view-edit";
import ResultActions from 'models/ResultActions';

export const requestViewTicketInformationById = async (
    activityReportGenID: number,
    userLoginID: number
): Promise<ActivityReportViewEditTicketInformation | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportViewEditTicket?activityReportGenID=${activityReportGenID}&userLoginID=${userLoginID}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportViewEditTicketInformation>(
        ActivityReportViewEditTicketInformation, 
        endpoint);
};

export const putViewTicketInformation = async (
    data: ActivityReportViewEditTicketInformation
) : Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = 'ActivityReportViewEditTicket';
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.putToModel<ResultActions>(
        ResultActions,
        endpoint,
        data
    );
};