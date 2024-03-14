import ResultActions from "models/ResultActions";
import ActivityReportViewCustomerSignature from "stores/activity-report/models/view-edit/ActivityReportViewCustomerSignature";

export default interface IActivityReportCustomerSignatureState {
    readonly error: boolean;
    readonly refreshPage: boolean;
    readonly resultActions: ResultActions;
    readonly data: ActivityReportViewCustomerSignature,
}