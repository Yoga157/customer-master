import ResultActions from "models/ResultActions";
import ActivityReportCheckAllowEdit from "./ActivityReportCheckAllowEdit";
import ActivityReportCheckSOExist from "./ActivityReportCheckSOExist";
import ActivityReportCustomer from "./ActivityReportCustomer";
import ActivityReportDashboardEnvelope from "./ActivityReportDashboardEnvelope";
import ActivityReportEngineer from "./ActivityReportEngineer";
import ActivityReportModel from "./ActivityReportModel";
import ActivityReportSONumber from "./ActivityReportSONumber";
import ActivityReportTicketNumber from "./ActivityReportTicketNumber";
import ActivityReportFunnelDetail from "./ActivityReportFunnelDetail";
import ActivityReportCheckFunnelGenIdExist from "./ActivityReportCheckFunnelGenIdExist";

export default interface IActivityReportState {
    readonly data: ActivityReportModel[];
    readonly firstData: ActivityReportModel;
    readonly listData: ActivityReportDashboardEnvelope;
    readonly error: boolean;
    readonly refreshPage: boolean;
    readonly resultActions: ResultActions;
    readonly activityReportCustomer: ActivityReportCustomer[],
    readonly activityReportEngineer: ActivityReportEngineer[],
    readonly activityReportTicketNumberOptions: any[],
    readonly activityReportFunnelGenId: any[],
    readonly activityReportTicketNumber: ActivityReportTicketNumber,
    readonly activityReportCheckAllowEdit: ActivityReportCheckAllowEdit,
    readonly activityReportCheckSoExist: ActivityReportCheckSOExist,
    readonly activityReportSONumber: ActivityReportSONumber,
    readonly activityReportFunnelDetail: ActivityReportFunnelDetail,
    readonly activityReportCheckFunnelExist: ActivityReportCheckFunnelGenIdExist
};
  