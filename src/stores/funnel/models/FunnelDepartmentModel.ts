import { BaseModel } from 'sjs-base-model';

export default class FunnelDepartmentModel extends BaseModel {
  deptname: string = '';

  constructor(data: Partial<FunnelDepartmentModel>) {
    super();
    this.update(data);
  }
}
