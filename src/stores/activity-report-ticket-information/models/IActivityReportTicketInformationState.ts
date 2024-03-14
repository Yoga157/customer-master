import ResultActions from "models/ResultActions";
import ActivityReportViewEditTicketInformation from "stores/activity-report/models/view-edit/ActivityReportViewEditTicketInformation";

export default interface IActivityReportTicketInformationState {
    readonly error: boolean;
    readonly refreshPage: boolean;
    readonly resultActions: ResultActions;
    readonly data: ActivityReportViewEditTicketInformation,
}