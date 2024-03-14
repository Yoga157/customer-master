import environment from 'environment';
import * as EffectUtility from '../../utilities/EffectUtility';
import HttpErrorResponseModel from "models/HttpErrorResponseModel";
import { ActivityReportViewEditNotes } from "stores/activity-report/models/view-edit";
import ResultActions from 'models/ResultActions';

export const requestViewNotesById = async (
    activityReportGenID: number,
    userLoginID: number
): Promise<ActivityReportViewEditNotes | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportViewEditNote?activityReportGenID=${activityReportGenID}&userLoginID=${userLoginID}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportViewEditNotes>(
        ActivityReportViewEditNotes, 
        endpoint);
};

export const putViewNotes = async (
    data: ActivityReportViewEditNotes
) : Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = 'ActivityReportViewEditNote';
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.putToModel<ResultActions>(
        ResultActions,
        endpoint,
        data
    );
};