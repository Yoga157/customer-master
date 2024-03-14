import environment from 'environment';
import * as EffectUtility from '../../utilities/EffectUtility';
import HttpErrorResponseModel from "models/HttpErrorResponseModel";
import { ActivityReportViewEditSuperiorReview } from "stores/activity-report/models/view-edit";
import ResultActions from 'models/ResultActions';

export const requestViewSuperiorReviewById = async (
    activityReportGenID: number,
    userLoginID: number
): Promise<ActivityReportViewEditSuperiorReview | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportViewEditSuperiorReview?activityReportGenID=${activityReportGenID}&userLoginID=${userLoginID}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportViewEditSuperiorReview>(
        ActivityReportViewEditSuperiorReview, 
        endpoint);
};

export const putViewSuperiorReview = async (
    data: ActivityReportViewEditSuperiorReview
) : Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = 'ActivityReportViewEditSuperiorReview';
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.putToModel<ResultActions>(
        ResultActions,
        endpoint,
        data
    );
};