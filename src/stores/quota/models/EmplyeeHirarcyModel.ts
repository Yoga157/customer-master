import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class EmplyeeHirarcyModel extends BaseModel {
  employeeID: number = 0;
  employeeKey: number = 0;
  role: number = 0;
  superiorID: number = 0;
  deptLeadFlag: number = 0;
  cocode: number = 0;
  isLocked: number = 0;
  employeeName: string = '';
  bu: string = '';
  deptID: string = '';
  employeeEmail: string = '';
  dashboardSecurity: string = '';
  kpiList: string = '';
  effDate: string = '';
  endDate: string = '';
  beginDate: string = '';
    
    constructor(data: Partial<EmplyeeHirarcyModel>) {
      super();
  
      this.update(data);
    }

  }


