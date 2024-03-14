import ResultActions from "models/ResultActions";
import IKpiSettingState from "./models/IKpiSettingState";
import KpiSettingModel from "./models/KpiSettingModel";
import { Reducer } from 'redux';
import baseReducer from '../../../utilities/BaseReducer';
import KpiDepartmentModel from "./models/DepartmentModel";
import * as KpiSettingActions from "./KpiSettingActions";
import KpiSettingDashboardEnvelope from "./models/KpiSettingDashboardEnvelope";
import IAction from "models/IAction";
import StatusOptions from "../kpi-setting/models/StatusOptions";
import MeasurementOptions from "../kpi-setting/models/MeasurementOptions";
import DireksiOptions from "../kpi-setting/models/DireksiOptions";
import DivisionOptions from "../kpi-setting/models/DivisionOptions";
import DepartmentOptions from "../kpi-setting/models/DepartmentOptions";
import FunctionOptions from "../kpi-setting/models/FunctionOptions";
import DivisionDropdownOptions from "../kpi-setting/models/DivisionDropdownOptions";
import DepartmentDropdownOptions from "../kpi-setting/models/DepartmentDropdownOptions";
import FunctionDropdownOptions from "../kpi-setting/models/FunctionDropdownOptions";
import EmployeeDropdownOptions from "../kpi-setting/models/EmployeeDropdownOptions";
import KpiEmployeeModel from "../kpi-employee/models/KpiEmployeeModel";
import KpiEmployeeEnvelope from "../kpi-employee/models/KpiEmployeeEnvelop";

export const initialState: IKpiSettingState = {
    data: [],
    listData: new KpiSettingDashboardEnvelope({}),
    firstData: new KpiSettingModel({}),
    error: false,
    refreshPage: false,
    settingList: [],
    resultActions: new ResultActions({}),
    kpiDepartments: [],
    kpiStatusOption: [],
    kpiMeasurementOption: [],
    kpiDireksiOption: [],
    divisionSearchOption: [],
    departmentSearchOption: [],
    functionSearchOption: [],
    divisionDropdownOption: [],
    departmentDropdownOption: [],
    functionDropdownOption: [],
    employeeDropdownOption:[],
    employeeSearchOption: [],
    employeeLocal: new KpiEmployeeEnvelope({}),
    conditionLocal: [],
};

const kpiSettingReducer: Reducer = baseReducer(initialState, {
    [KpiSettingActions.REQUEST_KPI_SETTING_SEARCH_FINISHED](state: IKpiSettingState, action: IAction<KpiSettingDashboardEnvelope>): IKpiSettingState {
        return {
            ...state,
            listData: action.payload!,
            error: false,
            refreshPage: false
        }
    },
    [KpiSettingActions.REQUEST_KPI_SETTINGS_FINISHED](state: IKpiSettingState, action: IAction<KpiSettingDashboardEnvelope>): IKpiSettingState {
        return {
            ...state,
            listData: action.payload!,
            error: false,
            refreshPage: false
        }
    },
    [KpiSettingActions.REQUEST_KPI_SETTING_BY_ID_FINISHED](state: IKpiSettingState, action: IAction<KpiSettingModel>): IKpiSettingState {
        return {
            ...state,
            firstData: action.payload!,
            error: false,
            refreshPage: false
        }
    },
    [KpiSettingActions.REQUEST_KPI_STATUS_FINISHED](state: IKpiSettingState, action: IAction<StatusOptions[]>): IKpiSettingState {
        return {
            ...state,
            kpiStatusOption: action.payload!,
            error: action.error!,
            refreshPage: false
        }
    },
    [KpiSettingActions.REQUEST_KPI_MEASUREMENT_FINISHED](state: IKpiSettingState, action: IAction<MeasurementOptions[]>): IKpiSettingState {
        return {
            ...state,
            kpiMeasurementOption: action.payload!,
            error: action.error!,
            refreshPage: false
        }
    },
    [KpiSettingActions.REQUEST_KPI_DIREKSI_FINISHED](state: IKpiSettingState, action: IAction<DireksiOptions[]>): IKpiSettingState {
        return {
            ...state,
            kpiDireksiOption: action.payload!,
            error: action.error!,
            refreshPage: false
        }
    },
    [KpiSettingActions.REQUEST_SEARCH_DIVISIONS_FINISHED](state: IKpiSettingState, action: IAction<DivisionOptions[]>): IKpiSettingState {
        return {
            ...state,
            divisionSearchOption: action.payload!,
            error: action.error!,
            refreshPage: false
        }
    },
    [KpiSettingActions.REQUEST_SEARCH_DEPARTMENTS_FINISHED](state: IKpiSettingState, action: IAction<DepartmentOptions[]>): IKpiSettingState {
        return {
            ...state, 
            departmentSearchOption: action.payload!,
            error: action.error!,
            refreshPage: false
        }
    },
    [KpiSettingActions.REQUEST_SEARCH_DEPARTMENTS_BY_DIVISION_ID_FINISHED](state: IKpiSettingState, action: IAction<DepartmentOptions[]>): IKpiSettingState {
        return {
            ...state,
            departmentSearchOption: action.payload!,
            error: action.error!,
            refreshPage: false
        }
    },
    [KpiSettingActions.REQUEST_SEARCH_FUNCTIONS_FINISHED](state: IKpiSettingState, action: IAction<FunctionOptions[]>): IKpiSettingState {
        return {
            ...state,
            functionSearchOption: action.payload!,
            error: action.error!,
            refreshPage: false
        }
    },
    [KpiSettingActions.REQUEST_DIVISIONS_DROPDOWN_FINISHED](state: IKpiSettingState, action: IAction<DivisionDropdownOptions[]>): IKpiSettingState {
        return {
            ...state,
            divisionDropdownOption: action.payload!,
            error: action.error!,
            refreshPage: false
        }
    },
    [KpiSettingActions.REQUEST_DEPARTMENTS_DROPDOWN_FINISHED](state: IKpiSettingState, action: IAction<DepartmentDropdownOptions[]>): IKpiSettingState {
        return {
            ...state,
            departmentDropdownOption: action.payload!,
            error: action.error!,
            refreshPage: false
        }
    },
    [KpiSettingActions.REQUEST_FUNCTIONS_DROPDOWN_FINISHED](state: IKpiSettingState, action: IAction<FunctionDropdownOptions[]>): IKpiSettingState {
        return {
            ...state, 
            functionDropdownOption: action.payload!,
            error: action.error!,
            refreshPage: false
        }
    },
    [KpiSettingActions.REQUEST_EMPLOYEES_DROPDOWN_FINISHED](state: IKpiSettingState, action: IAction<EmployeeDropdownOptions[]>): IKpiSettingState {
        return {
            ...state,
            employeeDropdownOption: action.payload!,
            error: action.error!,
            refreshPage: false
        }
    },
    [KpiSettingActions.REQUEST_EMPLOYEES_BY_NAME_FINISHED](state: IKpiSettingState, action: IAction<KpiEmployeeModel[]>): IKpiSettingState {
        return {
            ...state,
            employeeSearchOption: action.payload!
        }
    },
    [KpiSettingActions.REQUEST_KPI_EMPLOYEE_LOCAL_FINISHED](state: IKpiSettingState, action: IAction<KpiEmployeeEnvelope>): IKpiSettingState {
        return {
            ...state,
            employeeLocal: action.payload!,
            error: false,
            refreshPage: false,
        }
    },
    [KpiSettingActions.REQUEST_POST_KPI_EMPLOYEE_LOCAL_FINISHED](state: IKpiSettingState, action: IAction<KpiEmployeeModel>):IKpiSettingState {
        return {
            ...state,
            error: action.error!,
            refreshPage: (action.error) ? false : true
        }
    },
    [KpiSettingActions.REQUEST_DELETE_KPI_EMPLOYEE_LOCAL_FINISHED](state: IKpiSettingState,
        action: IAction<KpiEmployeeModel>): IKpiSettingState {
        return {
            ...state,
            error: action.error!,
            refreshPage: (action.error) ? false : true
        }
    },
    [KpiSettingActions.REQUEST_KPI_CONDITION_TABLEROW_LOCAL_FINISHED](state:IKpiSettingState, action:IAction<any>):IKpiSettingState {
        return {
            ...state,
            error: action.error!,
            refreshPage:(action.error) ? false : true,
            conditionLocal: action.payload!
        }
    },
});

export default kpiSettingReducer;