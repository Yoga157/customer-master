import { Selector } from "react-redux";
import { createSelector } from "reselect";
import IStore from "models/IStore";
import EmployeeModel from "stores/employee/models/EmployeeModel";

// "employeeID": 4007,
//   "employeeKey": 1908,
//   "effDate": "2020-02-06T00:00:00",
//   "employeeName": "Jerfi Jerfi",
//   "bu": "1030",
//   "deptID": "1070100000",
//   "employeeEmail": "Jerfi.Tan@berca.co.id",
//   "role": 27,
//   "superiorID": 2073,
//   "deptLeadFlag": 1,
//   "cocode": 1,
//   "isLocked": 0,
//   "beginDate": "2006-03-01T00:00:00",
//   "endDate": "9999-12-31T00:00:00",
//   "kpiList": null,
//   "dashboardSecurity": null,
//   "position": null,
//   "handphone": null

const _selectEmployeeDeptId = (model: EmployeeModel): any => {
  return {
    employeeID: model.employeeID,
    employeeName: model.employeeName,
    bu: model.bu,
    deptID: model.deptID,
    buToCompare: model.deptID?.slice(0, -5) + "00000",
  };
};

export const selectEmployeeDeptId: Selector<IStore, any> = createSelector(
  (state: IStore) => state.employee.employeeById,
  _selectEmployeeDeptId
);
