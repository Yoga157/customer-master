import { BaseModel } from 'sjs-base-model';

export default class EmployeeHierarcyModel extends BaseModel {  
  public readonly employeeKey: string = '';
  public readonly employeeName: string = '';
  public readonly emailAddr: string = '';

  constructor(data: Partial<EmployeeHierarcyModel>) {
    super();
    this.update(data);
  }
}
