import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import ResultActions from "models/ResultActions";
import EmployeeFreelanceDashboardEnvelope from "./models/EmployeeFreelanceDashboardEnvelope";
import IEmployeeFreelanceState from "./models/IEmployeeFreelanceState";
import * as EmployeeFreelanceActions from './EmployeeFreelanceActions';
import EmployeeFreelanceModel from './models/EmployeeFreelanceModel';
import EmployeeFreelanceCheckEmailExist from './models/EmployeeFreelanceCheckEmailExist';
import EmployeeFreelanceCheckNIKKTPExist from './models/EmployeeFreelanceCheckNIKKTPExist';
import EmployeeFreelanceMenuAccess from './models/EmployeeFreelanceMenuAccess';

export const initialState: IEmployeeFreelanceState = {
    data: new EmployeeFreelanceModel({}),
    listData: new EmployeeFreelanceDashboardEnvelope({}),
    error: false,
    refreshPage: false,
    resultActions: new ResultActions({}),
    employeeFreelanceCheckEmailExist: new EmployeeFreelanceCheckEmailExist({}),
    employeeFreelanceCheckNIKKTPExist: new EmployeeFreelanceCheckNIKKTPExist({}),
    employeeFreelanceMenuAccess: new EmployeeFreelanceMenuAccess({}),
};

const EmployeeFreelanceReducers: Reducer = baseReducer(initialState, {
    [EmployeeFreelanceActions.REQUEST_EMPLOYEE_FREELANCES_FINISHED](
        state: IEmployeeFreelanceState,
        action: IAction<EmployeeFreelanceDashboardEnvelope>
    ): IEmployeeFreelanceState {
        return {
            ...state,
            listData: action.payload!,
            error: action.error!,
            refreshPage: false,
        };
    },
    [EmployeeFreelanceActions.REQUEST_POST_EMPLOYEE_FREELANCE_FINISHED](
        state: IEmployeeFreelanceState,
        action: IAction<ResultActions>
    ): IEmployeeFreelanceState {
        return {
            ...state,
            resultActions: action.payload!,
            refreshPage: action.error ? false : true,
            error: action.error!,
        };
    },
    [EmployeeFreelanceActions.REQUEST_VIEW_EMPLOYEE_FREELANCE_FINISHED](
        state: IEmployeeFreelanceState,
        action: IAction<EmployeeFreelanceModel>
    ): IEmployeeFreelanceState {
        return {
            ...state,
            data: action.payload!,
            error: false,
            refreshPage: false,
        };
    },
    [EmployeeFreelanceActions.REQUEST_PUT_EMPLOYEE_FREELANCE_FINISHED](
        state: IEmployeeFreelanceState,
        action: IAction<ResultActions>
    ): IEmployeeFreelanceState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false : true,
            resultActions: action.payload!,
        };
    },
    [EmployeeFreelanceActions.REQUEST_CHECK_EMAIL_EXIST_FINISHED](
        state: IEmployeeFreelanceState,
        action: IAction<EmployeeFreelanceCheckEmailExist>
    ): IEmployeeFreelanceState {
        return {
            ...state,
            employeeFreelanceCheckEmailExist: action.payload!,
        };
    },
    [EmployeeFreelanceActions.REQUEST_CHECK_NIKKTP_EXIST_FINISHED](
        state: IEmployeeFreelanceState,
        action: IAction<EmployeeFreelanceCheckNIKKTPExist>
    ): IEmployeeFreelanceState {
        return {
            ...state,
            employeeFreelanceCheckNIKKTPExist: action.payload!,
        };
    },
    [EmployeeFreelanceActions.REQUEST_SEARCH_EMPLOYEE_FREELANCE_FINISHED](
        state: IEmployeeFreelanceState,
        action: IAction<EmployeeFreelanceDashboardEnvelope>
    ): IEmployeeFreelanceState {
        return {
            ...state,
            listData: action.payload!,
            error: false,
            refreshPage: false,
        };
    },
    [EmployeeFreelanceActions.REQUEST_FILTER_SEARCH_EMPLOYEE_FREELANCE_FINISHED](
        state: IEmployeeFreelanceState,
        action: IAction<EmployeeFreelanceDashboardEnvelope>
    ): IEmployeeFreelanceState {
        return {
            ...state,
            listData: action.payload!,
            error: false,
            refreshPage: false,
        };
    },
    [EmployeeFreelanceActions.REQUEST_MENU_ACCESS_EMPLOYEE_FREELANCE_FINISHED](
        state: IEmployeeFreelanceState,
        action: IAction<EmployeeFreelanceMenuAccess>
    ): IEmployeeFreelanceState {
        return {
            ...state,
            employeeFreelanceMenuAccess: action.payload!,
        };
    },
    [EmployeeFreelanceActions.REQUEST_GET_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL_FINISHED](
        state: IEmployeeFreelanceState,
        action: IAction<EmployeeFreelanceMenuAccess>
    ): IEmployeeFreelanceState {
        return {
            ...state,
            employeeFreelanceMenuAccess: action.payload!,
        };
    },
    [EmployeeFreelanceActions.REQUEST_REMOVE_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL_FINISHED](
        state: IEmployeeFreelanceState,
        action: IAction<EmployeeFreelanceMenuAccess>
    ): IEmployeeFreelanceState {
        return {
            ...state,
            employeeFreelanceMenuAccess: action.payload!,
        };
    },
});

export default EmployeeFreelanceReducers;