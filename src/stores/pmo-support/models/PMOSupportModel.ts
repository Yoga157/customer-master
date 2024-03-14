import { BaseModel } from 'sjs-base-model';

export default class PMOSupportModel extends BaseModel {
  public readonly salesDeptID: string = '';
  public readonly salesDeptName: string = '';
  public readonly pmoEmployeeKey: number = 0;
  public readonly pmoName: string = '';
  public readonly pmoEmail: string = '';
  public readonly pmoDeptID: string = '';

  constructor(data: Partial<PMOSupportModel>) {
    super();

    this.update(data);
  }
}
