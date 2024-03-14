import IEmployeeState from './models/IEmployeeState';
import * as EmployeeActions from './EmployeeActions';
import IAction from '../../models/IAction';
import EmployeeModel from './models/EmployeeModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import EmployeeDqAllModel from './models/EmployeeDqAllModel';
import SearchALLModel from './models/SearchALLModel';

export const initialState: IEmployeeState = {
  data: [],
  dataPMOS: [],
  dataFixAll: [],
  empHirarcy: [],
  dataEmployeeAssign: [],
  dataSubordinate: [],
  employeeSubDqAll: [],
  searchALL: []
};

const employeeReducer: Reducer = baseReducer(initialState, {
  [EmployeeActions.REQUEST_EMPLOYEE_FINISHED](state: IEmployeeState, action: IAction<EmployeeModel[]>): IEmployeeState {
    return {
      ...state,
      data: action.payload!,
    };
  },
  [EmployeeActions.REQUEST_EMPLOYEE_FIX_ALL_FINISHED](state: IEmployeeState, action: IAction<EmployeeModel[]>): IEmployeeState {
    return {
      ...state,
      dataFixAll: action.payload!,
    };
  },
  [EmployeeActions.REQUEST_USER_ASSIGN_FINISHED](state: IEmployeeState, action: IAction<EmployeeModel[]>): IEmployeeState {
    return {
      ...state,
      dataEmployeeAssign: action.payload!,
    };
  },
  [EmployeeActions.REQUEST_EMPLOYEE_BY_ROLE_FINISHED](state: IEmployeeState, action: IAction<EmployeeModel[]>): IEmployeeState {
    return {
      ...state,
      data: action.payload!,
    };
  },
  [EmployeeActions.REQUEST_EMPLOYEE_ROLE_PMOS_FINISHED](state: IEmployeeState, action: IAction<EmployeeModel[]>): IEmployeeState {
    return {
      ...state,
      dataPMOS: action.payload!,
    };
  },

  [EmployeeActions.REQUEST_EMPLOYEE_SUBORDINATE_DQALL_FINISHED](state: IEmployeeState, action: IAction<EmployeeDqAllModel[]>): IEmployeeState {
    return {
      ...state,
      employeeSubDqAll: action.payload!,
    };
  },

  [EmployeeActions.REQUEST_EMPLOYEE_SEARCH_ALL_FINISHED](state: IEmployeeState, action: IAction<SearchALLModel[]>): IEmployeeState {
    return {
      ...state,
      searchALL: action.payload!,
    };
  },

  [EmployeeActions.REQUEST_EMPLOYEE_BY_ROLE_SUBORDINATE_FINISHED](state: IEmployeeState, action: IAction<EmployeeModel[]>): IEmployeeState {
    return {
      ...state,
      data: action.payload!,
    };
  },

  [EmployeeActions.REQUEST_EMPLOYEE_BY_POC_TYPE_FINISHED](state: IEmployeeState, action: IAction<EmployeeModel[]>): IEmployeeState {
    return {
      ...state,
      data: action.payload!,
    };
  },

    [EmployeeActions.REQUEST_EMPLOYEE_SUBORDINATE_FINISHED](state:IEmployeeState, action:IAction<EmployeeModel[]>): IEmployeeState{
      return {
        ...state,
        dataSubordinate:action.payload!,
      }

    },
    [EmployeeActions.REQUEST_EMPLOYEE_DIRECT_SUBORDINATE_FINISHED](state:IEmployeeState, action:IAction<EmployeeModel[]>): IEmployeeState{
      return {
        ...state,
        dataSubordinate:action.payload!,
      }

    },
    [EmployeeActions.REQUEST_EMPLOYEES_BY_NAME_FINISHED](state:IEmployeeState, action:IAction<EmployeeModel[]>): IEmployeeState{
      return {
        ...state,
        data:action.payload!
      }

    },
    [EmployeeActions.REQUEST_EMP_HIRARCY_DQSEARCH_FINISHED](state:IEmployeeState, action:IAction<EmployeeModel[]>): IEmployeeState{
      return {
        ...state,
        empHirarcy:action.payload!
      }

    },
    [EmployeeActions.REQUEST_EMPLOYEES_ENGINEER_BY_NAME_FINISHED](state:IEmployeeState, action:IAction<EmployeeModel[]>): IEmployeeState{
      return {
        ...state,
        data:action.payload!,
      }

    },
    
  }
);

export default employeeReducer;
