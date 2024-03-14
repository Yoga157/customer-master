import ResultActions from "models/ResultActions";
import ActivityReportViewEditProducts from "stores/activity-report/models/view-edit/ActivityReportViewEditProducts";
import ActivityReportProductEnvelope from "./ActivityReportProductEnvelope"

export default interface IActivityReportProductState {
    readonly data: ActivityReportProductEnvelope;
    readonly resultActions: ResultActions;
    readonly error: boolean;
    readonly rowTable: any[];
    readonly refreshPage: boolean;
    readonly selectedData: ActivityReportViewEditProducts;
};