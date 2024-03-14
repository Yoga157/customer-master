import * as EmployeeEffect from './EmployeeEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import EmployeeModel from './models/EmployeeModel';
import EmployeeDqAllModel from './models/EmployeeDqAllModel';
import SearchALLModel from './models/SearchALLModel';

type ActionUnion = undefined | HttpErrorResponseModel | EmployeeModel | EmployeeDqAllModel[] | EmployeeModel[] | SearchALLModel[];

export const REQUEST_EMPLOYEE: string = 'EmployeeActions.REQUEST_EMPLOYEE';
export const REQUEST_EMPLOYEE_FINISHED: string = 'EmployeeActions.REQUEST_EMPLOYEE_FINISHED';

export const requestEmployee = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeModel>(dispatch, REQUEST_EMPLOYEE, EmployeeEffect.requestEmployee);
  };
};

export const REQUEST_EMPLOYEE_FIX_ALL: string = 'EmployeeActions.REQUEST_EMPLOYEE_FIX_ALL';
export const REQUEST_EMPLOYEE_FIX_ALL_FINISHED: string = 'EmployeeActions.REQUEST_EMPLOYEE_FIX_ALL_FINISHED';

export const requestEmployeeFixAll = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeModel>(dispatch, REQUEST_EMPLOYEE_FIX_ALL, EmployeeEffect.requestEmployeeFixAll);
  };
};

export const REQUEST_USER_ASSIGN: string = 'EmployeeActions.REQUEST_USER_ASSIGN';
export const REQUEST_USER_ASSIGN_FINISHED: string = 'EmployeeActions.REQUEST_USER_ASSIGN_FINISHED';

export const requestEmpAssign = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeModel>(dispatch, REQUEST_USER_ASSIGN, EmployeeEffect.requestEmployee);
  };
};

export const REQUEST_EMPLOYEE_BY_ROLE: string = 'EmployeeActions.REQUEST_EMPLOYEE_BY_ROLE';
export const REQUEST_EMPLOYEE_BY_ROLE_FINISHED: string = 'EmployeeActions.REQUEST_EMPLOYEE_BY_ROLE_FINISHED';

export const requestEmployeeByRole = (supportRoleID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeModel>(dispatch, REQUEST_EMPLOYEE_BY_ROLE, EmployeeEffect.requestEmployeeByRole, supportRoleID);
  };
};

export const REQUEST_EMPLOYEE_ROLE_PMOS: string = 'EmployeeActions.REQUEST_EMPLOYEE_ROLE_PMOS';
export const REQUEST_EMPLOYEE_ROLE_PMOS_FINISHED: string = 'EmployeeActions.REQUEST_EMPLOYEE_ROLE_PMOS_FINISHED';

export const requestEmployeeByRolePmos = (supportRoleID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeModel>(dispatch, REQUEST_EMPLOYEE_ROLE_PMOS, EmployeeEffect.requestEmployeeByRole, supportRoleID);
  };
};

export const REQUEST_EMPLOYEE_SUBORDINATE_DQALL: string = 'EmployeeActions.REQUEST_EMPLOYEE_SUBORDINATE_DQALL';
export const REQUEST_EMPLOYEE_SUBORDINATE_DQALL_FINISHED: string = 'EmployeeActions.REQUEST_EMPLOYEE_SUBORDINATE_DQALL_FINISHED';

export const requestEmployeeSubordinateDqAll = (operationtype: string, accountname: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeDqAllModel[]>(
      dispatch,
      REQUEST_EMPLOYEE_SUBORDINATE_DQALL,
      EmployeeEffect.requestEmployeeSubordinateDqAll,
      operationtype,
      accountname
    );
  };
};

export const REQUEST_EMPLOYEE_SEARCH_ALL: string = 'EmployeeActions.REQUEST_EMPLOYEE_SEARCH_ALL';
export const REQUEST_EMPLOYEE_SEARCH_ALL_FINISHED: string = 'EmployeeActions.REQUEST_EMPLOYEE_SEARCH_ALL_FINISHED';

export const searchALL = (EmployeeName: string, role: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SearchALLModel[]>(
      dispatch,
      REQUEST_EMPLOYEE_SEARCH_ALL,
      EmployeeEffect.searchALL,
      EmployeeName,
      role
    );
  };
};

export const REQUEST_EMPLOYEE_BY_ROLE_SUBORDINATE: string = 'EmployeeActions.REQUEST_EMPLOYEE_BY_ROLE_SUBORDINATE';
export const REQUEST_EMPLOYEE_BY_ROLE_SUBORDINATE_FINISHED: string = 'EmployeeActions.REQUEST_EMPLOYEE_BY_ROLE_SUBORDINATE_FINISHED';

export const requestEmployeeByRoleSubordinate = (supportRoleID: number, employeeID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeModel>(
      dispatch,
      REQUEST_EMPLOYEE_BY_ROLE_SUBORDINATE,
      EmployeeEffect.requestEmployeeByRoleSubordinate,
      supportRoleID,
      employeeID
    );
  };
};

export const REQUEST_EMPLOYEE_BY_POC_TYPE: string = 'EmployeeActions.REQUEST_EMPLOYEE_BY_POC_TYPE';
export const REQUEST_EMPLOYEE_BY_POC_TYPE_FINISHED: string = 'EmployeeActions.REQUEST_EMPLOYEE_BY_POC_TYPE_FINISHED';

export const requestEmployeeByPOCType = (pocType: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeModel>(dispatch, REQUEST_EMPLOYEE_BY_POC_TYPE, EmployeeEffect.requestEmployeeByPOCType, pocType);
  };
};

export const REQUEST_EMPLOYEE_SUBORDINATE: string = 'EmployeeActions.REQUEST_EMPLOYEE_SUBORDINATE';
export const REQUEST_EMPLOYEE_SUBORDINATE_FINISHED: string = 'EmployeeActions.REQUEST_EMPLOYEE_SUBORDINATE_FINISHED';

export const requestSubordinate = (email: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeModel[]>(dispatch, REQUEST_EMPLOYEE_SUBORDINATE, EmployeeEffect.requestSubordinate, email);
  };
};

export const REQUEST_EMPLOYEE_DIRECT_SUBORDINATE: string = 'EmployeeActions.REQUEST_EMPLOYEE_DIRECT_SUBORDINATE';
export const REQUEST_EMPLOYEE_DIRECT_SUBORDINATE_FINISHED: string = 'EmployeeActions.REQUEST_EMPLOYEE_DIRECT_SUBORDINATE_FINISHED';

export const requestDirectSubordinate = (employeeID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeModel[]>(
      dispatch,
      REQUEST_EMPLOYEE_DIRECT_SUBORDINATE,
      EmployeeEffect.requestDirectSubordinate,
      employeeID
    );
  };
};

export const REQUEST_EMPLOYEES_BY_NAME: string = 'EmployeeActions.REQUEST_EMPLOYEES_BY_NAME';
export const REQUEST_EMPLOYEES_BY_NAME_FINISHED: string = 'EmployeeActions.REQUEST_EMPLOYEES_BY_NAME_FINISHED';

export const requestEmployeeByName = (employeeName: string, role?: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeModel>(dispatch, REQUEST_EMPLOYEES_BY_NAME, EmployeeEffect.requestEmployeeByName, employeeName, role);
  };
};

export const REQUEST_EMP_HIRARCY_DQSEARCH: string = 'EmployeeActions.REQUEST_EMP_HIRARCY_DQSEARCH';
export const REQUEST_EMP_HIRARCY_DQSEARCH_FINISHED: string = 'EmployeeActions.REQUEST_EMP_HIRARCY_DQSEARCH_FINISHED';

export const reqEmployeeHierarcyDqSearch = (operationtype: string, accountname: string, search: string, isEmployeeActive = false): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeModel>(
      dispatch, 
      REQUEST_EMP_HIRARCY_DQSEARCH, 
      EmployeeEffect.reqEmployeeHierarcyDqSearch , 
      operationtype, 
      accountname,
      search,
      isEmployeeActive,
      );
  };
};

export const REQUEST_EMPLOYEES_ENGINEER_BY_NAME: string = 'EmployeeActions.REQUEST_EMPLOYEES_ENGINEER_BY_NAME';
export const REQUEST_EMPLOYEES_ENGINEER_BY_NAME_FINISHED: string = 'EmployeeActions.REQUEST_EMPLOYEES_ENGINEER_BY_NAME_FINISHED';

export const requestEmployeeEngineerByName = (employeeName:string, role:string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeModel>(
      dispatch,
      REQUEST_EMPLOYEES_ENGINEER_BY_NAME,
      EmployeeEffect.requestEmployeeEngineerByName,
      employeeName,
      role
    );
  };
};

