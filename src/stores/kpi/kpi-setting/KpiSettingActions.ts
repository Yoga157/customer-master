import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import IStore from 'models/IStore';
import { ReduxDispatch } from 'models/ReduxProps';
import ResultActions from 'models/ResultActions';
import * as ActionUtility from 'utilities/ActionUtility';
import KpiConditionRequestModel from '../kpi-condition/models/KpiConditionRequestModel';
import ConditionTableRowModel from '../kpi-condition/models/TableRowModel';
import KpiEmployeeEnvelope from '../kpi-employee/models/KpiEmployeeEnvelop';
import KpiEmployeeModel from '../kpi-employee/models/KpiEmployeeModel';
import DepartmentDropdownModel from '../kpi-setting/models/DepartmentDropdownModel';
import DepartmentSearchModel from '../kpi-setting/models/DepartmentSearchModel';
import DivisionDropdownModel from '../kpi-setting/models/DivisionDropdownModel';
import DivisionSearchModel from '../kpi-setting/models/DivisionSearchModel';
import EmployeeDropdownModel from '../kpi-setting/models/EmployeeDropdownModel';
import FunctionDropdownModel from '../kpi-setting/models/FunctionDropdownModel';
import FunctionSearchModel from '../kpi-setting/models/FunctionSearchModel';
import DireksiOptions from '../kpi-setting/models/DireksiOptions';
import MeasurementOptions from '../kpi-setting/models/MeasurementOptions';
// import KpiModel from "../models/KpiModel";
import KpiSettingModel from '../kpi-setting/models/KpiSettingModel';
import StatusOptions from '../kpi-setting/models/StatusOptions';
// import KpiSettingsModel from "./models/KpiSettingsModel";
import * as KpiSettingEffects from './KpiSettingEffects';
import KpiSettingDashboardEnvelope from './models/KpiSettingDashboardEnvelope';
// import KpiSettingModel from "./models/KpiSettingModel";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | KpiSettingDashboardEnvelope
  | ResultActions
  | StatusOptions
  | StatusOptions[]
  | MeasurementOptions
  | MeasurementOptions[]
  | DireksiOptions
  | DireksiOptions[]
  | DivisionSearchModel
  | DivisionSearchModel[]
  | DepartmentSearchModel
  | DepartmentSearchModel[]
  | FunctionSearchModel
  | FunctionSearchModel[]
  | DivisionDropdownModel
  | DivisionDropdownModel[]
  | DepartmentDropdownModel
  | DepartmentDropdownModel[]
  | FunctionDropdownModel
  | FunctionDropdownModel[]
  | EmployeeDropdownModel
  | EmployeeDropdownModel[]
  | KpiEmployeeModel
  | KpiEmployeeModel[]
  | KpiEmployeeEnvelope
  | KpiEmployeeEnvelope[]
  | ConditionTableRowModel
  | ConditionTableRowModel[]
  | KpiConditionRequestModel
  | KpiSettingModel;

//#region KpiSetting Search
export const REQUEST_KPI_SETTING_SEARCH: string = 'KpiSettingActions.REQUEST_KPI_SETTING_SEARCH';
export const REQUEST_KPI_SETTING_SEARCH_FINISHED: string = 'KpiSettingActions.REQUEST_KPI_SETTING_SEARCH_FINISHED';

export const requestSearchKpiSetting = (searchText: string, activePage: number, pageSize: number, sorting: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiSettingDashboardEnvelope>(
      dispatch,
      REQUEST_KPI_SETTING_SEARCH,
      KpiSettingEffects.requestKpiSettingSearch,
      searchText,
      activePage,
      pageSize,
      sorting
    );
  };
};

export const REQUEST_KPI_SETTINGS: string = 'KpiSettingActions.REQUEST_KPI_SETTINGS';
export const REQUEST_KPI_SETTINGS_FINISHED: string = 'KpiSettingActions.REQUEST_KPI_SETTINGS_FINISHED';

export const requestKpiSettings = (activePage: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiSettingDashboardEnvelope>(
      dispatch,
      REQUEST_KPI_SETTINGS,
      KpiSettingEffects.requestKpiSettings,
      activePage,
      pageSize
    );
  };
};
//#endregion

// Abie - 23/06/201
export const REQUEST_KPI_SETTING_BY_ID: string = 'KpiSettingActions.REQUEST_KPI_SETTING_BY_ID';
export const REQUEST_KPI_SETTING_BY_ID_FINISHED: string = 'KpiSettingActions.REQUEST_KPI_SETTING_BY_ID_FINISHED';
export const requestKpiSettingById = (kpiSettingID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiSettingModel>(
      dispatch,
      REQUEST_KPI_SETTING_BY_ID,
      KpiSettingEffects.requestKpiSettingById,
      kpiSettingID
    );
  };
};

// Abie - 14/06/2021
// export const REQUEST_POST_KPI_SETTING: string = "KpiSettingActions.REQUEST_POST_KPI_SETTING";
// export const REQUEST_POST_KPI_SETTING_FINISHED: string = "KpiSettingActions.REQUEST_POST_KPI_SETTING_FINISHED";

// export const postKpiSetting = (data: KpiModel): any => {
//     return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//         await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_KPI_SETTING, KpiSettingEffects.postKpiSetting, data);
//     }
// };

export const REQUEST_POST_KPI_SETTING: string = 'KpiSettingActions.REQUEST_POST_KPI_SETTING';
export const REQUEST_POST_KPI_SETTING_FINISHED: string = 'KpiSettingActions.REQUEST_POST_KPI_SETTING_FINISHED';

export const postKpiSetting = (data: KpiSettingModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_KPI_SETTING, KpiSettingEffects.postKpiSetting, data);
  };
};

export const REQUEST_KPI_STATUS: string = 'KpiSettingActions.REQUEST_KPI_STATUS';
export const REQUEST_KPI_STATUS_FINISHED: string = 'KpiSettingActions.REQUEST_KPI_STATUS_FINISHED';

export const requestKpiStatus = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<StatusOptions[]>(dispatch, REQUEST_KPI_STATUS, KpiSettingEffects.requestKpiStatus);
  };
};

export const REQUEST_KPI_DIREKSI: string = 'KpiSettingActions.REQUEST_KPI_DIREKSI';
export const REQUEST_KPI_DIREKSI_FINISHED: string = 'KpiSettingActions.REQUEST_KPI_DIREKSI_FINISHED';

export const requestKpiDireksi = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DireksiOptions[]>(dispatch, REQUEST_KPI_DIREKSI, KpiSettingEffects.requestKpiDireksi);
  };
};

export const REQUEST_KPI_MEASUREMENT: string = 'KpiSettingActions.REQUEST_KPI_MEASUREMENT';
export const REQUEST_KPI_MEASUREMENT_FINISHED: string = 'KpiSettingActions.REQUEST_KPI_MEASUREMENT_FINISHED';

export const requestKpiMeasurement = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<MeasurementOptions[]>(dispatch, REQUEST_KPI_MEASUREMENT, KpiSettingEffects.requestKpiMeasurement);
  };
};

export const REQUEST_SEARCH_DIVISIONS: string = 'KpiSettingActions.REQUEST_SEARCH_DIVISIONS';
export const REQUEST_SEARCH_DIVISIONS_FINISHED: string = 'KpiSettingActions.REQUEST_SEARCH_DIVISIONS_FINISHED';

export const requestSearchDivisions = (search?: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DivisionSearchModel[]>(
      dispatch,
      REQUEST_SEARCH_DIVISIONS,
      KpiSettingEffects.requestSearchDivisions,
      search
    );
  };
};

export const REQUEST_SEARCH_DEPARTMENTS: string = 'KpiSettingActions.REQUEST_SEARCH_DEPARTMENTS';
export const REQUEST_SEARCH_DEPARTMENTS_FINISHED: string = 'KpiSettingActions.REQUEST_SEARCH_DEPARTMENTS_FINISHED';

export const requestSearchDepartments = (search?: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DepartmentSearchModel[]>(
      dispatch,
      REQUEST_SEARCH_DEPARTMENTS,
      KpiSettingEffects.requestSearchDepartments,
      search
    );
  };
};

export const REQUEST_SEARCH_DEPARTMENTS_BY_DIVISION_ID: string = 'KpiSettingActions.REQUEST_SEARCH_DEPARTMENTS_BY_DIVISION_ID';
export const REQUEST_SEARCH_DEPARTMENTS_BY_DIVISION_ID_FINISHED: string = 'KpiSettingActions.REQUEST_SEARCH_DEPARTMENTS_BY_DIVISION_ID_FINISHED';

export const requestSearchDepartmentsByDivisionId = (divisionIds: number[]): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DepartmentSearchModel[]>(
      dispatch,
      REQUEST_SEARCH_DEPARTMENTS_BY_DIVISION_ID,
      KpiSettingEffects.requestSearchDepartmentsByDivisionId,
      divisionIds
    );
  };
};

export const REQUEST_SEARCH_FUNCTIONS: string = 'KpiSettingActions.REQUEST_SEARCH_FUNCTIONS';
export const REQUEST_SEARCH_FUNCTIONS_FINISHED: string = 'KpiSettingActions.REQUEST_SEARCH_FUNCTIONS_FINISHED';

export const requestSearchFunctions = (search?: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<FunctionSearchModel[]>(
      dispatch,
      REQUEST_SEARCH_FUNCTIONS,
      KpiSettingEffects.requestSearchFunctions,
      search
    );
  };
};

export const REQUEST_DIVISIONS_DROPDOWN: string = 'KpiSettingActions.REQUEST_DIVISIONS_DROPDOWN';
export const REQUEST_DIVISIONS_DROPDOWN_FINISHED: string = 'KpiSettingActions.REQUEST_DIVISIONS_DROPDOWN_FINISHED';

// Abie - 16/06/2021
export const requestDivisionsDropdown = (search?: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DivisionDropdownModel[]>(
      dispatch,
      REQUEST_DIVISIONS_DROPDOWN,
      KpiSettingEffects.requestDivisionsDropdown,
      search
    );
  };
};

export const REQUEST_DEPARTMENTS_DROPDOWN: string = 'KpiSettingActions.REQUEST_DEPARTMENTS_DROPDOWN';
export const REQUEST_DEPARTMENTS_DROPDOWN_FINISHED: string = 'KpiSettingActions.REQUEST_DEPARTMENTS_DROPDOWN_FINISHED';

// Abie - 16/06/2021
export const requestDepartmentsDropdown = (search?: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DepartmentDropdownModel[]>(
      dispatch,
      REQUEST_DEPARTMENTS_DROPDOWN,
      KpiSettingEffects.requestDepartmentsDropdown,
      search
    );
  };
};

export const REQUEST_FUNCTIONS_DROPDOWN: string = 'KpiSettingActions.REQUEST_FUNCTIONS_DROPDOWN';
export const REQUEST_FUNCTIONS_DROPDOWN_FINISHED: string = 'KpiSettingActions.REQUEST_FUNCTIONS_DROPDOWN_FINISHED';

// Abie - 16/06/2021
export const requestFunctionsDropdown = (search?: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<FunctionDropdownModel[]>(
      dispatch,
      REQUEST_FUNCTIONS_DROPDOWN,
      KpiSettingEffects.requestFunctionsDropdown,
      search
    );
  };
};

export const REQUEST_EMPLOYEES_DROPDOWN: string = 'KpiSettingActions.REQUEST_EMPLOYEES_DROPDOWN';
export const REQUEST_EMPLOYEES_DROPDOWN_FINISHED: string = 'KpiSettingActions.REQUEST_EMPLOYEES_DROPDOWN_FINISHED';

// Abie - 16/06/2021
export const requestEmployeesDropdown = (employeeName?: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeDropdownModel[]>(
      dispatch,
      REQUEST_EMPLOYEES_DROPDOWN,
      KpiSettingEffects.requestEmployeesDropdown,
      employeeName
    );
  };
};

export const REQUEST_EMPLOYEES_BY_NAME: string = 'KpiSettingActions.REQUEST_EMPLOYEES_BY_NAME';
export const REQUEST_EMPLOYEES_BY_NAME_FINISHED: string = 'KpiSettingActions.REQUEST_EMPLOYEES_BY_NAME_FINISHED';
// untuk yang search halaman add new setting
export const requestEmployeeByName = (employeeName: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiEmployeeModel>(
      dispatch,
      REQUEST_EMPLOYEES_BY_NAME,
      KpiSettingEffects.requestEmployeeByName,
      employeeName
    );
  };
};

//#region Employee Local Storage
export const REQUEST_KPI_EMPLOYEE_LOCAL: string = 'KpiSettingActions.REQUEST_KPI_EMPLOYEE_LOCAL';
export const REQUEST_KPI_EMPLOYEE_LOCAL_FINISHED: string = 'KpiSettingActions.REQUEST_KPI_EMPLOYEE_LOCAL_FINISHED';

export const requestKpiEmployeeLocal = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiEmployeeEnvelope>(dispatch, REQUEST_KPI_EMPLOYEE_LOCAL, KpiSettingEffects.requestKpiEmployeeLocal);
  };
};

export const REQUEST_POST_KPI_EMPLOYEE_LOCAL: string = 'KpiSettingActions.REQUEST_POST_KPI_EMPLOYEE_LOCAL';
export const REQUEST_POST_KPI_EMPLOYEE_LOCAL_FINISHED: string = 'KpiSettingActions.REQUEST_POST_KPI_EMPLOYEE_LOCAL_FINISHED';

export const postKpiEmployeeLocal = (data: KpiEmployeeModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiEmployeeModel>(dispatch, REQUEST_POST_KPI_EMPLOYEE_LOCAL, KpiSettingEffects.postKpiEmployeeLocal, data);
  };
};

export const REQUEST_DELETE_KPI_EMPLOYEE_LOCAL: string = 'KpiSettingActions.REQUEST_DELETE_KPI_EMPLOYEE_LOCAL';
export const REQUEST_DELETE_KPI_EMPLOYEE_LOCAL_FINISHED: string = 'KpiSettingActions.REQUEST_DELETE_KPI_EMPLOYEE_LOCAL_FINISHED';

export const deleteKpiEmployeeLocal = (data: KpiEmployeeModel, id: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiEmployeeModel>(
      dispatch,
      REQUEST_DELETE_KPI_EMPLOYEE_LOCAL,
      KpiSettingEffects.deleteKpiEmployeeLocal,
      data,
      id
    );
  };
};
//#endregion

//#region Condition Local Storage
export const REQUEST_KPI_CONDITION_TABLEROW_LOCAL: string = 'KpiSettingActions.REQUEST_KPI_CONDITION_TABLEROW_LOCAL';
export const REQUEST_KPI_CONDITION_TABLEROW_LOCAL_FINISHED: string = 'KpiSettingActions.REQUEST_KPI_CONDITION_TABLEROW_LOCAL_FINISHED';

export const getKpiConditionByIdLocal = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ConditionTableRowModel>(
      dispatch,
      REQUEST_KPI_CONDITION_TABLEROW_LOCAL,
      KpiSettingEffects.getKpiConditionByIdLocal
    );
  };
};

export const POST_KPI_CONDITION_LOCAL: string = 'KpiSettingActions.POST_KPI_CONDITION_LOCAL';
export const POST_KPI_CONDITION_LOCAL_FINISHED: string = 'KpiSettingActions.POST_KPI_CONDITION_LOCAL_FINISHED';

export const postKpiConditionLocal = (data: KpiConditionRequestModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiConditionRequestModel>(
      dispatch,
      POST_KPI_CONDITION_LOCAL,
      KpiSettingEffects.postKpiConditionLocal,
      data
    );
  };
};

export const DEL_KPI_CONDITION_LOCAL: string = 'KpiSettingActions.DEL_KPI_CONDITION_LOCAL';
export const DEL_KPI_CONDITION_LOCAL_FINISHED: string = 'KpiSettingActions.DEL_KPI_CONDITION_LOCAL_FINISHED';

export const deleteKpiConditionLocal = (data: ConditionTableRowModel, kpiConditionID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ConditionTableRowModel>(
      dispatch,
      DEL_KPI_CONDITION_LOCAL,
      KpiSettingEffects.deleteKpiConditionLocal,
      data,
      kpiConditionID
    );
  };
};
//#endregion
