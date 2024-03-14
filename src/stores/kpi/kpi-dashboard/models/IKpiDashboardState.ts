import ResultActions from "models/ResultActions";
import KpiDashboardModel from "./KpiDashboardModel";

export default interface IKpiDashboardState {
    readonly data: any;
    readonly firstData: KpiDashboardModel;
    readonly error: boolean;
    readonly refreshPage: boolean;
    readonly summaryByPic: any;
    readonly picListByDept: any;
    readonly resultActions: ResultActions;
};