import ActivityReportProductModel from "stores/activity-report-product/models/ActivityReportProductModel";
import ActivityReportModelAdd from "./ActivityReportsModelAdd";

export default class ActivityReportsModel {
    public ActivityReport: ActivityReportModelAdd = new ActivityReportModelAdd({});
    public ActivityReportItem: ActivityReportProductModel[] = []
};