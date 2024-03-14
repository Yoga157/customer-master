import { BaseModel } from 'sjs-base-model';

interface IWorkflowItem{
  workflowHeaderGenID: number,
  workflowDetailGenID: number,
  stepName: string,
  status: string,
  employeeID: number,
  flagApprove: number,
  employeeName: string,
  employeeEmail: string,
  notes: string,
  tanggal: string,
}

interface IWorkflowList{
  commercialWorkflow :IWorkflowItem[],
  serviceWorkflow:IWorkflowItem[]
}


export default class SalesAnalystWorkflowModel extends BaseModel {
  resultObj: IWorkflowList

  constructor(data: Partial<SalesAnalystWorkflowModel>) {
    super();
    this.update(data);
  }

}
