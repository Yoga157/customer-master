import { BaseModel } from 'sjs-base-model';

export default class EmployeeModel extends BaseModel {
  public readonly employeeID: number = 0;
  public readonly employeeKey: number = 0;
  public readonly effDate: string = '';
  public readonly employeeName: string = '';
  public readonly bu: string = '';
  public readonly deptID: string = '';
  public readonly employeeEmail: string = '';
  public readonly role: number = 0;
  public readonly superiorID: number = 0;
  public readonly deptLeadFlag: number = 0;
  public readonly cocode: number = 0;
  public readonly isLocked: number = 0;
  //Dropdown Get Value Dedicated Resources
  public readonly value: number = 0;

  constructor(data: Partial<EmployeeModel>) {
    super();
    this.update(data);
  }
}
