import { BaseModel } from 'sjs-base-model';
import EmployeeModel from './EmployeeModel';

export default class EmployeeDqAllModel extends EmployeeModel {  
  public readonly beginDate: string = '';
  public readonly endDate: string = '';
  public readonly kpiList: string = '';
  public readonly dashboardSecurity: string = '';

  constructor(data: Partial<EmployeeDqAllModel>) {
    super(data);
    this.update(data);
  }
}
