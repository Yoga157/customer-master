import environment from 'environment'
import * as EffectUtility from '../../utilities/EffectUtility';
import HttpErrorResponseModel from "models/HttpErrorResponseModel";
import ActivityReportViewCustomerSignature from 'stores/activity-report/models/view-edit/ActivityReportViewCustomerSignature';

export const requestViewCustomerSignatureById = async (
    activityReportGenID: number,
    userLoginID: number
): Promise<ActivityReportViewCustomerSignature | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportCustomerSignature?activityReportGenID=${activityReportGenID}&userLoginID=${userLoginID}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportViewCustomerSignature>(
        ActivityReportViewCustomerSignature, 
        endpoint);
};