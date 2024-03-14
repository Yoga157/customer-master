import { BaseModel } from 'sjs-base-model';

export default class DepartmentModel extends BaseModel {
    deptname:string = '';
  
    constructor(data: Partial<DepartmentModel>){
      super();
      this.update(data)
    } 
}
  