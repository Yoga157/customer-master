import ResultActions from "models/ResultActions";
import ActivityReportDashboardEnvelope from "stores/activity-report/models/ActivityReportDashboardEnvelope";
import EmployeeFreelanceCheckEmailExist from "./EmployeeFreelanceCheckEmailExist";
import EmployeeFreelanceCheckNIKKTPExist from "./EmployeeFreelanceCheckNIKKTPExist";
import EmployeeFreelanceDashboardEnvelope from "./EmployeeFreelanceDashboardEnvelope";
import EmployeeFreelanceMenuAccess from "./EmployeeFreelanceMenuAccess";
import EmployeeFreelanceModel from "./EmployeeFreelanceModel";

export default interface IEmployeeFreelanceState {
    readonly data: EmployeeFreelanceModel;
    readonly listData: EmployeeFreelanceDashboardEnvelope;
    readonly error: boolean;
    readonly refreshPage: boolean;
    readonly resultActions: ResultActions;
    readonly employeeFreelanceCheckEmailExist: EmployeeFreelanceCheckEmailExist,
    readonly employeeFreelanceCheckNIKKTPExist: EmployeeFreelanceCheckNIKKTPExist,
    readonly employeeFreelanceMenuAccess: EmployeeFreelanceMenuAccess,
};