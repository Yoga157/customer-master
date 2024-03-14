import IStore from "models/IStore";
import { createSelector, ParametricSelector, Selector } from "reselect";
import KpiEmployeeEnvelope from "stores/kpi/kpi-employee/models/KpiEmployeeEnvelop";
import KpiEmployeeModel from "stores/kpi/kpi-employee/models/KpiEmployeeModel";
import IKpiEmployeeTable from "./models/IKpiEmployeeTable";
import IKpiEmployeeTableRow from "./models/IKpiEmployeeTableRow";

const _selectRows = (models: KpiEmployeeEnvelope): IKpiEmployeeTable => {
    return {
        totalRow: models.totalRows,
        rows: _createTableRows(models.rows)
    };
};

const _createTableRows = (models: KpiEmployeeModel[]): IKpiEmployeeTableRow[] => {
    return models.map(
        (model: KpiEmployeeModel): IKpiEmployeeTableRow => (_mappingObjectTableRow(model))
    );
}

const _mappingObjectTableRow = (model: KpiEmployeeModel): IKpiEmployeeTableRow => {
    return {
        kpiEmployeeIncludeExcludeID: (model.kpiEmployeeIncludeExcludeID.toString() === "NaN" ? 0 : model.kpiEmployeeIncludeExcludeID),
        employeeName: (model.employeeName === "undefined" ? "" : model.employeeName),
        divName: (model.divisionName === "undefined" ? "" : model.divisionName),
        type: (model.type === "undefined" ? "" : model.type),
        createUserID: model.createUserID
    };
};

// export const selectKpiEmployee: ParametricSelector<IStore, string[], IKpiEmployeeTable> = createSelector(
//     (state: IStore) => state.kpiEmployeeTable.listData,
//     (state:IStore, actionTypes: string[]) => actionTypes,
//     _selectRows
// );

export const selectKpiEmployee: ParametricSelector<IStore, string[], IKpiEmployeeTable> = createSelector(
    (state: IStore) => state.kpiSetting.employeeLocal,
    (state:IStore, actionTypes: string[]) => actionTypes,
    _selectRows
);

// Abie - 14/06/2021
