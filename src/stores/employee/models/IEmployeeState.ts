import EmployeeModel from './EmployeeModel';
import EmployeeDqAllModel from './EmployeeDqAllModel';
import SearchALLModel from './SearchALLModel';

export default interface IEmployeeState {
  readonly data: EmployeeModel[];
  readonly empHirarcy: EmployeeModel[];
  readonly dataPMOS: EmployeeModel[];
  readonly dataFixAll: EmployeeModel[];
  readonly dataEmployeeAssign: EmployeeModel[];
  readonly dataSubordinate: EmployeeModel[];
  readonly employeeSubDqAll: EmployeeDqAllModel[]
  readonly searchALL: SearchALLModel[]
}
