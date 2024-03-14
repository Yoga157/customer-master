import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import EmployeeModel from './models/EmployeeModel';
import EmployeeDqAllModel from './models/EmployeeDqAllModel';
import SearchALLModel from './models/SearchALLModel';

export const requestEmployee = async (): Promise<EmployeeModel | HttpErrorResponseModel> => {
  const controllerName = `Employee`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<EmployeeModel>(EmployeeModel, endpoint);
};

export const requestEmployeeFixAll = async (): Promise<EmployeeModel | HttpErrorResponseModel> => {
  const controllerName = `Employee`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<EmployeeModel>(EmployeeModel, endpoint);
};

export const requestEmp = async (): Promise<EmployeeModel | HttpErrorResponseModel> => {
  const controllerName = `Employee`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<EmployeeModel>(EmployeeModel, endpoint);
};

export const requestEmployeeByRole = async (supportRoleID: number): Promise<EmployeeModel | HttpErrorResponseModel> => {
  const controllerName = `Employee/role=${supportRoleID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<EmployeeModel>(EmployeeModel, endpoint);
};


export const requestEmployeeSubordinateDqAll = async (
  operationtype: string, accountname: string
): Promise<EmployeeDqAllModel[] | HttpErrorResponseModel> => {
  const controllerName = `EmployeeHierarcy/DQAll?operationtype=${operationtype}&accountname=${accountname}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<EmployeeDqAllModel[]>(EmployeeDqAllModel, endpoint);
};

export const searchALL = async (
  EmployeeName: string, role: string
): Promise<SearchALLModel[] | HttpErrorResponseModel> => {
  const controllerName = `Employee/SearchALL?EmployeeName=${EmployeeName}&role=${role}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.postToModel<SearchALLModel[]>(SearchALLModel, endpoint);
};

export const requestEmployeeByRoleSubordinate = async (
  supportRoleID: number,
  employeeID: number
): Promise<EmployeeModel | HttpErrorResponseModel> => {
  const controllerName = `Employee/RoleHirarki/role=${supportRoleID}?userLoginID=${employeeID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<EmployeeModel>(EmployeeModel, endpoint);
};

export const requestEmployeeByPOCType = async (pocType: string): Promise<EmployeeModel | HttpErrorResponseModel> => {
  const controllerName = `Employee/pocType=${pocType}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<EmployeeModel>(EmployeeModel, endpoint);
};

export const requestSubordinate = async (email: string): Promise<EmployeeModel[] | HttpErrorResponseModel> => {
  const controllerName = `Employee/DropdownSalesAdvanceSearch?email=${email}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<EmployeeModel[]>(EmployeeModel, endpoint);
};

export const requestDirectSubordinate = async (employeeID: number): Promise<EmployeeModel[] | HttpErrorResponseModel> => {
  const controllerName = `ReportSummaryPlan/GetComboBoxSubordinate?userLoginID=${employeeID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<EmployeeModel[]>(EmployeeModel, endpoint);
};

export const requestEmployeeByName = async (employeeName: string, role?: string): Promise<EmployeeModel | HttpErrorResponseModel> => {
  const controllerName = `Employee/EmployeeName?EmployeeName=${employeeName}&role=${role}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<EmployeeModel>(EmployeeModel, endpoint);
};

export const reqEmployeeHierarcyDqSearch = async ( operationtype: string, accountname: string, search: string, isEmployeeActive = false): Promise<EmployeeModel | HttpErrorResponseModel> => {
  const controllerName = `EmployeeHierarcy/DQSearch?operationtype=${operationtype}&accountname=${accountname}&isEmployeeActive=${isEmployeeActive}&search=${search}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<EmployeeModel>(EmployeeModel, endpoint);
};

export const requestEmployeeEngineerByName = async (employeeName: string): Promise<EmployeeModel | HttpErrorResponseModel> => {
  const controllerName = `GenerateForm/EngineerPMName=${employeeName}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<EmployeeModel>(EmployeeModel, endpoint);
};





/**
 * This is only to trigger an error api response so we can use it for an example in the AboutPage
 */
export const requestError = async (): Promise<any | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.generic;
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data;
};
