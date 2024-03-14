import ResultActions from "models/ResultActions";
import ActivityReportViewEditSuperiorReview from "stores/activity-report/models/view-edit/ActivityReportViewEditSuperiorReview";

export default interface IActivityReportSuperiorReviewState {
    readonly error: boolean;
    readonly refreshPage: boolean;
    readonly resultActions: ResultActions;
    readonly data: ActivityReportViewEditSuperiorReview,
}