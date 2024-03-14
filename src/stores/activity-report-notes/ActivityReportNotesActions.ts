import { ReduxDispatch } from 'models/ReduxProps';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import ResultActions from 'models/ResultActions';
import * as ActivityReportNotesEffects from './ActivityReportNotesEffects';
import { ActivityReportViewEditNotes } from 'stores/activity-report/models/view-edit';

type ActionUnion = undefined | 
    HttpErrorResponseModel | 
    ResultActions |
    ActivityReportViewEditNotes;

export const REQUEST_VIEW_NOTES: string = 'ActivityReportNotesActions.REQUEST_VIEW_NOTES';
export const REQUEST_VIEW_NOTES_FINISHED: string = 'ActivityReportNotesActions.REQUEST_VIEW_NOTES_FINISHED';
export const requestViewNotesById = (
    activityReportGenID: number,
    userLoginID: number
): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ActivityReportViewEditNotes>(
            dispatch,
            REQUEST_VIEW_NOTES,
            ActivityReportNotesEffects.requestViewNotesById,
            activityReportGenID,
            userLoginID
        );
    };
};

export const REQUEST_UPDATE_NOTES: string = 'ActivityReportNotesActions.REQUEST_UPDATE_NOTES';
export const REQUEST_UPDATE_NOTES_FINISHED: string = 'ActivityReportNotesActions.REQUEST_UPDATE_NOTES_FINISHED';
export const putViewNotes = (data: ActivityReportViewEditNotes): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            REQUEST_UPDATE_NOTES,
            ActivityReportNotesEffects.putViewNotes,
            data
        );
    };
};