import IStore from "models/IStore";
import { createSelector, Selector, ParametricSelector } from "reselect";
import IOptionsData from "selectors/select-options/models/IOptionsData";
import IOptionsDataString from "selectors/select-options/models/IOptionsDataString";
import ISearchResult from "selectors/select-options/models/ISearchResult";
import KpiEmployeeModel from "stores/kpi/kpi-employee/models/KpiEmployeeModel";
import KpiSettingDashboardEnvelope from "stores/kpi/kpi-setting/models/KpiSettingDashboardEnvelope";
import KpiSettingDashboardModel from "stores/kpi/kpi-setting/models/KpiSettingDashboardModel";
import KpiSettingModel from "stores/kpi/kpi-setting/models/KpiSettingModel";
import DepartmentDropdownModel from "stores/kpi/kpi-setting/models/DepartmentDropdownModel";
import DepartmentSearchModel from "stores/kpi/kpi-setting/models/DepartmentSearchModel";
import DivisionDropdownModel from "stores/kpi/kpi-setting/models/DivisionDropdownModel";
import DivisionSearchModel from "stores/kpi/kpi-setting/models/DivisionSearchModel";
import EmployeeDropdownModel from "stores/kpi/kpi-setting/models/EmployeeDropdownModel";
import FunctionDropdownModel from "stores/kpi/kpi-setting/models/FunctionDropdownModel";
import FunctionSearchModel from "stores/kpi/kpi-setting/models/FunctionSearchModel";
import DireksiOptions from "stores/kpi/kpi-setting/models/DireksiOptions";
import MeasurementOptions from "stores/kpi/kpi-setting/models/MeasurementOptions";
// import KpiModel from "stores/kpi/kpi-setting/models/KpiSettingModel";
import StatusOptions from "stores/kpi/kpi-setting/models/StatusOptions";
import IKpiEmployeeSearchInputList from "../models/IKpiEmployeeSearchInputList";
import IKpiSettingTableRow from "../models/IKpiSettingTableRow";
import IKpiSettingTable from "./models/IKpiSettingTable";

const _selectKpiSettings = (models: KpiSettingDashboardEnvelope): IKpiSettingTable => {
    return {
        totalRow: models.totalRows,
        rows: _createTableRows(models.rows),
    };
};

const _createTableRows = (models: KpiSettingDashboardModel[]): IKpiSettingTableRow[] => {
    return models.map(
        (model: KpiSettingDashboardModel): IKpiSettingTableRow => (_mappingObjectTableRow(model))
    );
};

export const selectKpiSettings: ParametricSelector<IStore, string[], IKpiSettingTable> = createSelector(
    (state: IStore) => state.kpiSetting.listData!,
    (state: IStore, actionTypes: string[]) => actionTypes,
    _selectKpiSettings
);

const _mappingObjectTableRow = (model: KpiSettingDashboardModel): IKpiSettingTableRow => {
    return {
        kpiID: model.kpiID,
        divisionNameList: model.divisionNameList,
        keyActivity: model.keyActivity,
        departmentNameList: model.departmentNameList,
        functionNameList: model.functionNameList,
        kpiDireksiName: model.kpiDireksiName,
        measurementName: model.measurementName,
        weight: model.weight,
        point: model.point,
        statusName: model.statusName
    };
};

// Abie - 14/06/2021
const _selectKpiStatus = (models: StatusOptions[]): IOptionsData[] => {
    return models.map(
        (model: StatusOptions): IOptionsData => ({
            text: model.textData,
            value: model.valueData
        })
    );
}

// Abie - 14/06/2021
export const selectKpiStatusOptions: Selector<IStore, IOptionsData[]> = createSelector(
    (state: IStore) => state.kpiSetting.kpiStatusOption,
    _selectKpiStatus
);

const _selectKpiMeasurement = (models: MeasurementOptions[]): IOptionsData[] => {
    return models.map(
        (model: MeasurementOptions): IOptionsData => ({
            text: model.textData,
            value: model.valueData
        })
    );
};

// Abie - 14/06/2021
export const selectKpiMeasurementOptions: Selector<IStore, IOptionsData[]> = createSelector(
    (state: IStore) => state.kpiSetting.kpiMeasurementOption,
    _selectKpiMeasurement
);

const _selectKpiDireksi = (models: DireksiOptions[]): IOptionsData[] => {
    return models.map(
        (model: DireksiOptions): IOptionsData => ({
            text: model.textData,
            value: model.valueData
        })
    );
};

// Abie - 14/06/2021
export const selectKpiDireksiOptions: Selector<IStore, IOptionsData[]> = createSelector(
    (state: IStore) => state.kpiSetting.kpiDireksiOption,
    _selectKpiDireksi
);

const _selectDivisionSearch = (models: DivisionSearchModel[]): ISearchResult[] => {
    return models.map(
        (model: DivisionSearchModel): ISearchResult => ({
            title: model.textData,
            descriptions: model.valueData.toString(),
            price: model.valueData.toString()
        })
    );
};

export const selectDivisionSearchOptions: Selector<IStore, ISearchResult[]> = createSelector(
    (state: IStore) => state.kpiSetting.divisionSearchOption,
    _selectDivisionSearch
);

const _selectDepartmentSearch = (models: DepartmentSearchModel[]): ISearchResult[] => {
    return models.map(
        (model: DepartmentSearchModel): ISearchResult => ({
            title: model.textData,
            descriptions: model.valueData.toString(),
            price: model.valueData.toString()
        })
    );
};

export const selectDepartmentSearchOptions: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.kpiSetting.departmentSearchOption,
  _selectDepartmentSearch
);

const _selectFunctionSearch = (models: FunctionSearchModel[]): ISearchResult[] => {
    return models.map(
        (model: FunctionSearchModel): ISearchResult => ({
            title: model.textData,
            descriptions: model.textData,
            price: model.valueData.toString()
        })
    );
};

export const selectFunctionSearchOptions: Selector<IStore, ISearchResult[]> = createSelector(
    (state: IStore) => state.kpiSetting.functionSearchOption,
    _selectFunctionSearch
);

// Abie - 15/06/2021
const _selectKpiEmployeeSearchInputList = (models: KpiEmployeeModel[]): IKpiEmployeeSearchInputList[] => {
    return models.map(
        (model: KpiEmployeeModel): IKpiEmployeeSearchInputList => ({
            title: model.employeeEmail,
            descriptions: model.employeeID.toString(),
            price:model.employeeEmail,
            employeeId: model.employeeID,
            employeeName: model.employeeName,
            deptId: model.deptID,
            divisionName: model.divisionName,
            employeeKey: model.employeeKey
        })
    );
};

// Abie - 15/06/2021
export const selectKpiEmployeeSearchInputList: Selector<IStore, IKpiEmployeeSearchInputList[]> = createSelector(
    (state: IStore) => state.kpiSetting.employeeSearchOption,
    _selectKpiEmployeeSearchInputList
);

// Abie - 16/06/2021
const _selectDivisionDropdownOptions = (models: DivisionDropdownModel[]): IOptionsDataString[] => {
    return models.map(
        (model: DivisionDropdownModel): IOptionsDataString => ({
            text: model.textData,
            value: model.valueData
        })
    );
};

// Abie - 16/06/2021
export const selectDivisionDropdownOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
    (state: IStore) => state.kpiSetting.divisionDropdownOption,
    _selectDivisionDropdownOptions
);

// Abie - 16/06/2021
export const _selectDepartmentDropdownOptions = (models: DepartmentDropdownModel[]): IOptionsDataString[] => {
    return models.map(
        (model: DepartmentDropdownModel): IOptionsDataString => ({
            text: model.textData,
            value: model.valueData
        })
    );
};

// Abie - 16/06/2021
export const selectDepartmentDropdownOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
    (state: IStore) => state.kpiSetting.departmentDropdownOption,
    _selectDepartmentDropdownOptions
);

export const _selectFunctionDropdownOptions = (models: FunctionDropdownModel[]): IOptionsDataString[] => {
    return models.map(
        (model: FunctionDropdownModel): IOptionsDataString => ({
            text: model.textData,
            value: model.valueData
        })
    );
};

// Abie - 16/06/2021
export const selectFunctionDropdownOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
    (state: IStore) => state.kpiSetting.functionDropdownOption,
    _selectFunctionDropdownOptions
);

export const _selectEmployeeDropdownOptions = (models: EmployeeDropdownModel[]): IOptionsDataString[] => {
    return models.map(
        (model: EmployeeDropdownModel): IOptionsDataString => ({
            text: model.textData,
            value: model.valueData
        })
    );
};

// Abie - 16/06/2021
export const selectEmployeeDropdownOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
    (state: IStore) => state.kpiSetting.employeeDropdownOption,
    _selectEmployeeDropdownOptions
);

// Abie - 24/06/2021
// export const _selectKpiSettingById = (models: KpiSettingModel[]): KpiSettingModel[] => {
//     return models.map(
//         (model: KpiSettingModel): KpiSettingModel => ({
//             kpiSettingID: model.kpiSettingID,
//             keyActivity: model.keyActivity,
//             divisionList: model.divisionList,
//             departmentList: model.departmentList,
//             functionList: model.functionList,
//             employeeInclude: model.employeeInclude,
//             employeeExclude: model.employeeExclude,
//             kpiDireksi: model.kpiDireksi,
//             measurement: model.measurement,
//             weight: model.weight,
//             point: model.point,
//             status: model.status,
//             // conditionList: model.conditionList,
//             createUserID: model.createUserID,
//             // modifyUserID: model.modifyUserID,
//             // modifyDate: model.modifyDate,
//             // createDate: model.createDate
//         })
//     );
// }

// export const selectKpiSettingsById: Selector<IStore, KpiSettingModel[]> = createSelector(
//     (state: IStore) => state.kpiSetting.firstData,
//     _selectKpiSettingById
// );