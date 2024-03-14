import ResultActions from "models/ResultActions";
import ActivityReportViewEditNotes from "stores/activity-report/models/view-edit/ActivityReportViewEditNotes";

export default interface IActivityReportNotesState {
    readonly error: boolean;
    readonly refreshPage: boolean;
    readonly resultActions: ResultActions;
    readonly data: ActivityReportViewEditNotes,
}