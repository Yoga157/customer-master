import { Reducer } from 'redux';
import IAction from '../../models/IAction';
import ResultActions from "models/ResultActions";
import baseReducer from '../../utilities/BaseReducer';
import IActivityReportNotesState from "stores/activity-report-notes/models/IActivityReportNotesState";
import { ActivityReportViewEditNotes } from 'stores/activity-report/models/view-edit';
import * as ActivityReportNotesActions from './ActivityReportNotesActions';

export const initialState: IActivityReportNotesState = {
    error: false,
    refreshPage: false,
    resultActions: new ResultActions({}),
    data: new ActivityReportViewEditNotes({}),
};

const ActivityReportNotesReducers: Reducer = baseReducer(initialState, {
    [ActivityReportNotesActions.REQUEST_VIEW_NOTES_FINISHED](
        state: IActivityReportNotesState,
        action: IAction<ActivityReportViewEditNotes>
    ): IActivityReportNotesState {
        return {
            ...state,
            data: action.payload!,
            error: false,
            refreshPage: false,
        }
    },
    [ActivityReportNotesActions.REQUEST_UPDATE_NOTES_FINISHED](
        state: IActivityReportNotesState,
        action: IAction<ResultActions>
    ): IActivityReportNotesState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false : true,
            resultActions: action.payload!,
        };
    },
});

export default ActivityReportNotesReducers;