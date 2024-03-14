import ResultActions from "models/ResultActions";
import ActivityReportViewEditTotalCustomerExperience from "stores/activity-report/models/view-edit/ActivityReportViewEditTotalCustomerExperience";

export default interface IActivityReportTotalCustomerExperienceState {
    readonly error: boolean;
    readonly refreshPage: boolean;
    readonly resultActions: ResultActions;
    readonly data: ActivityReportViewEditTotalCustomerExperience,
}