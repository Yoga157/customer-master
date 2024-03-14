import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';
import IOptionsDataString from './models/IOptionsDataString';
import EmployeeModel from '../../stores/employee/models/EmployeeModel';
import ISearchResult from './models/ISearchResult';
import CompetitorProductModel from 'stores/competitor-product/models/CompetitorProductModel';
import EmployeeDqAllModel from 'stores/employee/models/EmployeeDqAllModel';

const _selectDivision = (models: CompetitorProductModel[]): IOptionsDataString[] => {
  return models.map(
    (model: CompetitorProductModel): IOptionsDataString => ({
      text: model.textData,
      value: model.textData,
    })
  );
};

export const selectDivisionOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.bankGaransi.dataDivision,
  _selectDivision
);

const _selectEmployeeChangePM = (models: EmployeeModel[]): any[] => {
  return models.map(
    (model: EmployeeModel): any => ({
      text: model.employeeName,
      value: model.employeeID.toString(),
    })
  );
};

export const selectEmployeeOptionsChangePM: Selector<IStore, IOptionsData[]> = createSelector((state: IStore) => state.employee.data, _selectEmployeeChangePM);

const _selectEmployee = (models: EmployeeModel[]): IOptionsData[] => {
  return models.map(
    (model: EmployeeModel): IOptionsData => ({
      text: model.employeeName,
      value: model.employeeID,
    })
  );
};

export const selectEmployeeOptions: Selector<IStore, IOptionsData[]> = createSelector((state: IStore) => state.employee.data, _selectEmployee);
export const selectEmployeeRolePMOSOptions: Selector<IStore, IOptionsData[]> = createSelector((state: IStore) => state.employee.dataPMOS, _selectEmployee);

const _selectEmployeeEmail = (models: EmployeeModel[]): IOptionsDataString[] => {
  return models.map(
    (model: EmployeeModel): IOptionsDataString => ({
      text: model.employeeEmail,
      value: model.employeeEmail,
    })
  );
};

export const selectEmployeeEmailOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.employee.data,
  _selectEmployeeEmail
);

const _selectSubordinate = (models: EmployeeModel[]): IOptionsData[] => {
  return models.map(
    (model: EmployeeModel): IOptionsData => ({
      text: model.employeeName,
      value: model.employeeID,
    })
  );
};

export const selectSubordinateOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.employee.dataSubordinate,
  _selectSubordinate
);

const _selectEmployeeSearch = (models: EmployeeModel[]): ISearchResult[] => {
  return models.map(
    (model: EmployeeModel): ISearchResult => ({
      title: model.employeeEmail,
      descriptions: model.employeeID.toString() + '##' + model.employeeName,
      price: model.employeeEmail,
    })
  );
};

const _selectSingleSearchCustomerSearch = (models: any[]): any[] => {
  return models.map((model: any): any => ({
    title: model.employeeName,
    descriptions: model.employeeName,
    price: model.employeeID,
  }));
};

export const selectSingleSearchCustomerSearch: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.employee.data,
  _selectSingleSearchCustomerSearch
);

export const selectEmployeeSearchOptions: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.employee.data,
  _selectEmployeeSearch
);


const _selectEmployeeSearchEmail = (models: EmployeeModel[]): any => {
  return models.map(
    (model: any): any => ({
      title: model.employeeEmail,
      descriptions: model.employeeID.toString() + '##' + model.employeeName,
      price: String(model.employeeID),
      // price: model.employeeEmail,
    })
  );
};

export const selectEmployeeSearchEmail: Selector<IStore, any> = createSelector(
  (state: IStore) => state.employee.data,
  _selectEmployeeSearchEmail
);

export const selectEmpHirarcy: Selector<IStore, any> = createSelector(
  (state: IStore) => state.employee.empHirarcy!,
  _selectEmployeeSearchEmail
);

const _selectEmployeeSearchValEmail = (models: EmployeeModel[]): ISearchResult[] => {
  return models.map(
    (model: EmployeeModel): ISearchResult => ({
      title: model.employeeEmail,
      descriptions: model.employeeID.toString() + '##' + model.employeeName,
      price: model.employeeEmail,
    })
  );
};

export const selectEmployeeSearchValEmail: Selector<IStore, any> = createSelector(
  (state: IStore) => state.employee.data,
  _selectEmployeeSearchValEmail
);

const _selectEmployeeSearchEmailFixAll = (models: EmployeeModel[]): any => {
  return models.map(
    (model: any): any => ({
      title: model.employeeEmail,
      descriptions: model.employeeID.toString() + '##' + model.employeeName,
      price: String(model.employeeID),
      // price: model.employeeEmail,
    })
  );
};

export const selectEmployeeEmailFixAll: Selector<IStore, any> = createSelector(
  (state: IStore) => state.employee.dataFixAll,
  _selectEmployeeSearchEmailFixAll
);

const _selectEmployeeSearchAll = (models: EmployeeModel[]): ISearchResult[] => {
  return models.map(
    (model: EmployeeModel): ISearchResult => ({
      title: model.employeeEmail,
      descriptions: model.employeeID.toString() + '##' + model.employeeName,
      price: model.employeeEmail,
    })
  );
};

export const selectEmployeeSearchAllOptions: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.employee.searchALL,
  _selectEmployeeSearchAll
);

const _selectEmployeeSubDqAll = (models: EmployeeDqAllModel[]): any => {
  if (models.length > 0) {
    return models.map((model: any, index): any => ({
      employeeID: model.employeeID && model.employeeID,
      employeeKey: model.employeeKey && model.employeeKey,
      effDate: model.effDate && model.effDate,
      employeeName: model.employeeName && model.employeeName,
      bu: model.bu && model.bu,
      deptID: model.deptID && model.deptID,
      employeeEmail: model.employeeEmail && model.employeeEmail,
      role: model.role && model.role,
      superiorID: model.superiorID && model.superiorID,
      deptLeadFlag: model.deptLeadFlag && model.deptLeadFlag,
      cocode: model.cocode && model.cocode,
      isLocked: model.isLocked && model.isLocked,
      beginDate: model.beginDate && model.beginDate,
      endDate: model.endDate && model.endDate,
      kpiList: model.kpiList && model.kpiList,
    }));
  }else{
    return []
  }
};

export const selectEmployeeSubDqAll: Selector<IStore, EmployeeDqAllModel[]> = createSelector(
  (state: IStore) => state.employee.employeeSubDqAll,
  _selectEmployeeSubDqAll
);

const _selectEmployeeSemantic = (models: any[]): any => {
  if (models.length > 0) {
    return models.map((model: any, index): any => ({
      title: model && model.employeeName,
      price: model && model.employeeID,
      userName: model && model.employeeEmail,
      employeeID: model && model.employeeID,
      key: index,
    }));
  }
};

const _selectEmployeeSearchQuota = (models: EmployeeModel[]): ISearchResult[] => {
  return models.map(
    (model: EmployeeModel): ISearchResult => ({
      title: model.employeeName,
      descriptions: model.employeeName,
      price: model.employeeID.toString(),
    })
  );
};

export const selectEmployeeSemantic: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.employee.data,
  _selectEmployeeSemantic
);

export const selectEmployeeSearch: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.employee.searchALL,
  _selectEmployeeSemantic
);

export const selectEmployeeSearchQuota: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.employee.data,
  _selectEmployeeSearchQuota
);

const _selectEmployeeFunnelSA = (models: any[]): any[] => {
  return models.map((model: any, index): any => ({
    title: model && model.employeeName,
    price: model && model.employeeID,
    key: index,
  }));
};

export const selectEmployeeFunnelSA: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.employee.data,
  _selectEmployeeFunnelSA
);

const _selectCCSearch = (models: EmployeeModel[]): ISearchResult[] => {
  return models.map(
    (model: EmployeeModel): ISearchResult => ({
      title: model.employeeEmail,
      descriptions: model.employeeID.toString() + '##' + model.employeeName,
      price: model.employeeEmail,
    })
  );
};

export const selectCCSearchOptions: Selector<IStore, ISearchResult[]> = createSelector((state: IStore) => state.employee.data, _selectCCSearch);
