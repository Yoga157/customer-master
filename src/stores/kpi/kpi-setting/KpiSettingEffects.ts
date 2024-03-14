import environment from 'environment';
import * as EffectUtility from 'utilities/EffectUtility';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import ResultActions from 'models/ResultActions';
import KpiSettingsModel from './models/KpiSettingsModel';
import KpiSettingDashboardEnvelope from './models/KpiSettingDashboardEnvelope';
// import KpiModel from '../models/KpiModel';
import KpiSettingModel from '../kpi-setting/models/KpiSettingModel';
import StatusOptions from '../kpi-setting/models/StatusOptions';
import MeasurementOptions from '../kpi-setting/models/MeasurementOptions';
import DireksiOptions from '../kpi-setting/models/DireksiOptions';
import DivisionSearchModel from '../kpi-setting/models/DivisionSearchModel';
import DepartmentSearchModel from '../kpi-setting/models/DepartmentSearchModel';
import FunctionSearchModel from '../kpi-setting/models/FunctionSearchModel';
import DivisionDropdownModel from '../kpi-setting/models/DivisionDropdownModel';
import DepartmentDropdownModel from '../kpi-setting/models/DepartmentDropdownModel';
import FunctionDropdownModel from '../kpi-setting/models/FunctionDropdownModel';
import EmployeeDropdownModel from '../kpi-setting/models/EmployeeDropdownModel';
import KpiEmployeeModel from '../kpi-employee/models/KpiEmployeeModel';
import KpiEmployeeEnvelope from '../kpi-employee/models/KpiEmployeeEnvelop';
import ConditionTableRowModel from '../kpi-condition/models/TableRowModel';
// import KpiSettingModel from './models/KpiSettingModel';

//#region KpiSetting SearchBar
export const requestKpiSettingSearch = async (
  textSearch: string,
  activePage: number,
  pageSize: number,
  sorting: string
): Promise<KpiSettingDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName = `Kpi/Search?page=${activePage}&pageSize=${pageSize}&text=${textSearch}&sorting=${sorting}`;

  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiSettingDashboardEnvelope>(KpiSettingDashboardEnvelope, endpoint);
};

export const requestKpiSettings = async (activePage: number, pageSize: number): Promise<KpiSettingDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName = `Kpi?page=${activePage}&pageSize=${pageSize}`;

  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiSettingDashboardEnvelope>(KpiSettingDashboardEnvelope, endpoint);
};
//#endregion

// Abie - 23/06/2021
export const requestKpiSettingById = async (kpiSettingID: number): Promise<KpiSettingModel | HttpErrorResponseModel> => {
  const controllerName = 'Kpi/' + kpiSettingID;
  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiSettingModel>(KpiSettingModel, endpoint);
};

//#region Post Kpi Setting to Server
// export const postKpiSetting = async(data: KpiModel): Promise<ResultActions | HttpErrorResponseModel> => {
//     // let controllerName = "kpi";
//     // const endpoint: string = environment.api.kpi.replace(":controller", controllerName);
//     // return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);

//     let controllerName = "Kpi";
//     const endpoint: string = `https://localhost:44319/api/Kpi`;
//     return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
// };

export const postKpiSetting = async (data: KpiSettingModel): Promise<ResultActions | HttpErrorResponseModel> => {
  // let controllerName = "kpi";
  // const endpoint: string = environment.api.kpi.replace(":controller", controllerName);
  // return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);

  const controllerName = 'Kpi';
  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};
//#endregion

//#region Select Options for Kpi Setting Form
export const requestKpiStatus = async (): Promise<StatusOptions[] | HttpErrorResponseModel> => {
  const controllerName = `Kpi/DropdownKpiStatus`;
  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<StatusOptions[]>(StatusOptions, endpoint);
};

// Abie - 14/06/2021
export const requestKpiMeasurement = async (): Promise<MeasurementOptions[] | HttpErrorResponseModel> => {
  const controllerName = `Kpi/DropdownKpiMeasurement`;
  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);

  return EffectUtility.getToModel<MeasurementOptions[]>(MeasurementOptions, endpoint);
};

// Abie - 14/06/2021
export const requestKpiDireksi = async (): Promise<DireksiOptions[] | HttpErrorResponseModel> => {
  const controllerName = `Kpi/DropdownKpiDireksi`;
  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<DireksiOptions[]>(DireksiOptions, endpoint);
};
//#endregion

export const requestSearchDivisions = async (search: string): Promise<DivisionSearchModel[] | HttpErrorResponseModel> => {
  const controllerName = `EmployeeHierarcy/DropdownDivision?search=${search}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<DivisionSearchModel[]>(DivisionSearchModel, endpoint);
};

export const requestSearchDepartments = async (search: string): Promise<DepartmentSearchModel[] | HttpErrorResponseModel> => {
  const controllerName = 'EmployeeHierarcy/DropdownDepartment?search=';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<DepartmentSearchModel[]>(DepartmentSearchModel, endpoint);
};

export const requestSearchDepartmentsByDivisionId = async (divisionIds: number[]): Promise<DepartmentSearchModel[] | HttpErrorResponseModel> => {
  let queryParam = '';
  divisionIds.forEach((divisionId, index) => {
    if (divisionIds.length - 1 !== index) {
      queryParam += 'divisionIds='.concat('', divisionId.toString());
      queryParam += '&';
    } else if (divisionIds.length - 1 === index) {
      queryParam += 'divisionIds='.concat('', divisionId.toString());
    }
  });

  const controllerName = `EmployeeHierarcy/DropdownDepartmentByDivisionId?${queryParam}`;

  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<DepartmentSearchModel[]>(DepartmentSearchModel, endpoint);
};

export const requestSearchFunctions = async (search: string): Promise<FunctionSearchModel[] | HttpErrorResponseModel> => {
  const controllerName = `EmployeeHierarcy/DropdownFunction?search=${search}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunctionSearchModel[]>(FunctionSearchModel, endpoint);
};

export const requestDivisionsDropdown = async (search: string): Promise<DivisionDropdownModel[] | HttpErrorResponseModel> => {
  const controllerName = `EmployeeHierarcy/DropdownDivision?search=${search}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<DivisionDropdownModel[]>(DivisionDropdownModel, endpoint);
};

// Abie - 16/06/2021
export const requestDepartmentsDropdown = async (search: string): Promise<DepartmentDropdownModel[] | HttpErrorResponseModel> => {
  const controllerName = `EmployeeHierarcy/DropdownDepartment?search=${search}`;

  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<DepartmentDropdownModel[]>(DepartmentDropdownModel, endpoint);
};

// Abie - 16/06/2021
export const requestFunctionsDropdown = async (search: string): Promise<FunctionDropdownModel[] | HttpErrorResponseModel> => {
  const controllerName = `EmployeeHierarcy/DropdownFunction?search=${search}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunctionDropdownModel[]>(FunctionDropdownModel, endpoint);
};

// Abie - 16/06/2021
export const requestEmployeesDropdown = async (employeeName?: string): Promise<EmployeeDropdownModel[] | HttpErrorResponseModel> => {
  const controllerName = `EmployeeHierarcy/GetEmployeesWithDivision?search=${employeeName}`;

  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<EmployeeDropdownModel[]>(EmployeeDropdownModel, endpoint);
};

// // Abie - 15/06/2021
export const requestEmployeeByName = async (employeeName: string): Promise<KpiEmployeeModel | HttpErrorResponseModel> => {
  const controllerName = `EmployeeHierarcy/GetEmployeesWithDivision?search=${employeeName}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiEmployeeModel>(KpiEmployeeModel, endpoint);
};

export const requestKpiEmployeeLocal = async (): Promise<KpiEmployeeEnvelope | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('kpiEmployeeIncludeExclude');
  let listEmployeeIncludeExclude: KpiEmployeeModel[] = [];
  let total: number = 0;
  if (jsonString !== null) {
    listEmployeeIncludeExclude = JSON.parse(jsonString);
    total = listEmployeeIncludeExclude.length;
  }
  const result = new KpiEmployeeEnvelope({ totalRows: total, rows: listEmployeeIncludeExclude });
  return result;
};

export const postKpiEmployeeLocal = async (data: KpiEmployeeModel): Promise<KpiEmployeeModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('kpiEmployeeIncludeExclude');
  let listEmployeeIncludeExclude: KpiEmployeeModel[] = [];
  let idKpi;

  if (jsonString !== null && jsonString !== '[]') {
    listEmployeeIncludeExclude = JSON.parse(jsonString);

    console.log('=== postKpiEmployeeLocal: listEmployeeIncludeExclude ', listEmployeeIncludeExclude);

    listEmployeeIncludeExclude.map((item) => {
      return (idKpi = item.kpiEmployeeIncludeExcludeID);
    });
    data.kpiEmployeeIncludeExcludeID = Number(idKpi) + 1;
  } else {
    data.kpiEmployeeIncludeExcludeID = 1;
  }

  const employeeIncludeExclude = new KpiEmployeeModel(data);
  listEmployeeIncludeExclude.push(employeeIncludeExclude);
  localStorage.setItem('kpiEmployeeIncludeExclude', JSON.stringify(listEmployeeIncludeExclude));
  return employeeIncludeExclude;
};

export const deleteKpiEmployeeLocal = async (data: KpiEmployeeModel, id: any): Promise<KpiEmployeeModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('kpiEmployeeIncludeExclude');
  let listEmployeeIncludeExclude: KpiEmployeeModel[] = [];
  let idKpi;

  if (jsonString !== null && jsonString !== '[]') {
    listEmployeeIncludeExclude = JSON.parse(jsonString);
    listEmployeeIncludeExclude.map((item) => {
      return (idKpi = item.kpiEmployeeIncludeExcludeID);
    });
    data.kpiEmployeeIncludeExcludeID = Number(idKpi) + 1;
  } else {
    data.kpiEmployeeIncludeExcludeID = 1;
  }

  const employeeIncludeExclude = new KpiEmployeeModel(data);

  const newValue = listEmployeeIncludeExclude.filter((item: any) => {
    return item.kpiEmployeeIncludeExcludeID !== id;
  });

  listEmployeeIncludeExclude.push(employeeIncludeExclude);

  localStorage.setItem('kpiEmployeeIncludeExclude', JSON.stringify(newValue));
  return employeeIncludeExclude;
};

//#region Condition Local
export const getKpiConditionByIdLocal = async (): Promise<any> => {
  const listKpiCondition: ConditionTableRowModel[] = [];
  const jsonString = localStorage.getItem('kpiCondition');
  if (jsonString !== null) {
    const objects = JSON.parse(jsonString);

    for (const object of objects) {
      const result = new ConditionTableRowModel({
        kpiConditionID: object.kpiConditionID,
        description: object.description,
        point: object.point,
        createDate: object.createDate,
        createUserID: object.createUserID,
        modifyUserID: object.modifyUserID,
        modifyDate: object.modifyDate,
      });

      listKpiCondition.push(result);
    }
  } else {
  }

  return listKpiCondition;
};

export const postKpiConditionLocal = async (data: ConditionTableRowModel): Promise<ConditionTableRowModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('kpiCondition');
  let listKpiCondition: ConditionTableRowModel[] = [];
  let idKpi;

  if (jsonString !== null && jsonString != '[]') {
    listKpiCondition = JSON.parse(jsonString);
    listKpiCondition.map((item) => {
      return (idKpi = item.kpiConditionID);
    });
    data.kpiConditionID = Number(idKpi) + 1;
  } else {
    data.kpiConditionID = 1;
  }

  const kpiService = new ConditionTableRowModel(data);
  listKpiCondition.push(kpiService);
  localStorage.setItem('kpiCondition', JSON.stringify(listKpiCondition));
  return kpiService;
};

export const deleteKpiConditionLocal = async (data: ConditionTableRowModel, id: any): Promise<ConditionTableRowModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('kpiCondition');

  let listKpiCondition: ConditionTableRowModel[] = [];
  let idKpi;

  if (jsonString !== null && jsonString !== '[]') {
    listKpiCondition = JSON.parse(jsonString);
    listKpiCondition.map((item) => {
      return (idKpi = item.kpiConditionID);
    });
    data.kpiConditionID = Number(idKpi) + 1;
  } else {
    data.kpiConditionID = 1;
  }

  const kpiService = new ConditionTableRowModel(data);

  const newValue = listKpiCondition.filter((item: any) => {
    return item.kpiConditionID !== id;
  });

  listKpiCondition.push(kpiService);

  localStorage.setItem('kpiCondition', JSON.stringify(newValue));
  return kpiService;
};

export const putKpiConditionLocal = async (data: ConditionTableRowModel, id: any): Promise<any> => {
  const jsonString = localStorage.getItem('kpiCondition');
  let listKpiCondition: ConditionTableRowModel[] = [];

  if (jsonString !== null && jsonString !== '[]') {
    listKpiCondition = JSON.parse(jsonString);
  }

  const kpiCondition = new ConditionTableRowModel(data);
  kpiCondition.kpiConditionID = Number(id);

  const newValue = listKpiCondition.filter((item: any) => {
    return item.kpiConditionID !== Number(id);
  });

  newValue.push(kpiCondition);

  localStorage.setItem('kpiCondition', JSON.stringify(newValue));
  console.log(newValue);
};
//#endregion
