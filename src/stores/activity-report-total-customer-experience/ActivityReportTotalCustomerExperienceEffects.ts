import environment from 'environment';
import * as EffectUtility from '../../utilities/EffectUtility';
import HttpErrorResponseModel from "models/HttpErrorResponseModel";
import { ActivityReportViewEditTotalCustomerExperience } from "stores/activity-report/models/view-edit";
import ResultActions from 'models/ResultActions';

export const requestViewTotalCustomerExperienceById = async (
    activityReportGenID: number,
    userLoginID: number
): Promise<ActivityReportViewEditTotalCustomerExperience | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportViewEditTotalCustomerExperience?activityReportGenID=${activityReportGenID}&userLoginID=${userLoginID}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportViewEditTotalCustomerExperience>(
        ActivityReportViewEditTotalCustomerExperience, 
        endpoint);
};

export const putViewTotalCustomerExperience = async (
    data: ActivityReportViewEditTotalCustomerExperience
) : Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = 'ActivityReportViewEditTotalCustomerExperience';
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);    
    return EffectUtility.putToModel<ResultActions>(
        ResultActions,
        endpoint,
        data
    );
};