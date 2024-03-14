import { BaseModel } from 'sjs-base-model';

export default class WorkFlowHeaderModel extends BaseModel {
    public workflowHeaderGenID: number = 0;
    public workflowDetailGenID: number = 0;
    public stepName: string = '';
    public status: string = '';
    public employeeID: number = 0;
    public employeeName: string = '';
    public employeeEmail: string = '';
    public notes: string = '';
    public tanggal: string = '';
    public stepTelerik: string = '';
    public flagApprove: number = 0;
  
    constructor(data: Partial<WorkFlowHeaderModel>) {
      super();
      this.update(data);
    }
}
