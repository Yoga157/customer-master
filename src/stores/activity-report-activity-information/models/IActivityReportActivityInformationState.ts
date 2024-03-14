import ResultActions from "models/ResultActions";
import ActivityReportViewEditActivityInformation from "stores/activity-report/models/view-edit/ActivityReportViewEditActivityInformation";

export default interface IActivityReportActivityInformationState {
    readonly error: boolean;
    readonly refreshPage: boolean;
    readonly resultActions: ResultActions;
    readonly data: ActivityReportViewEditActivityInformation,
}