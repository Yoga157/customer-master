import environment from 'environment';
import * as EffectUtility from '../../utilities/EffectUtility';
import HttpErrorResponseModel from "models/HttpErrorResponseModel";
import { ActivityReportViewEditActivityInformation } from "stores/activity-report/models/view-edit";
import ResultActions from 'models/ResultActions';

export const requestViewActivityInformationById = async (
    activityReportGenID: number,
    userLoginID: number
): Promise<ActivityReportViewEditActivityInformation | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportViewEditActivity?activityReportGenID=${activityReportGenID}&userLoginID=${userLoginID}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportViewEditActivityInformation>(
        ActivityReportViewEditActivityInformation, 
        endpoint
    );
};

export const putViewActivityInformation = async (
    data: ActivityReportViewEditActivityInformation
): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = 'ActivityReportViewEditActivity';
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.putToModel<ResultActions>(
        ResultActions,
        endpoint,
        data
    );
};