import { BaseModel } from 'sjs-base-model';

export default class EmployeeFreelancePermanent extends BaseModel {
  public readonly employeeID: string = '';
  public readonly employeeEmail: string = '';
  public readonly employeeName: string = '';
  
  constructor(data: Partial<EmployeeFreelancePermanent>) {
    super();
    this.update(data);
  }
}
