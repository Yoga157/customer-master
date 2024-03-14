import { BaseModel } from 'sjs-base-model';

export default class WorkListDetailModel extends BaseModel {
  taskId: number = 0;
  taskUID: string = "";
  pmoName: string = "";
  pmoId: number = 0;
  pmoEmail: string = "";
  projectId: number = 0;
  funnelGenId: number = 0;
  customerName: string = "";
  projectName: string = "";
  projectStatus: string = "";
  projectAlias: string = "";
  workType: string = "";
  estStartDate: string | Date = "";
  estEndDate: string | Date = "";
  actualStartDate: string | Date = "";
  actualEndDate: string | Date = "";
  taskTitle: string = "";
  taskDescription: string = "";
  taskStatus: string = "";
  primaryResources: string = "";
  secondaryResources: string = "";
  slaAssignment: string = "";
  remark: string = "";
  category: string = "";
  subcategory: string = "";
  issueType: string = "";
  issueSubtype: string = "";
  so: string = "";
  brand: string = "";
  subBrand: string = "";
  emailReceiver: string = "";
  emailCc: string = "";
  customerPhone: string = "";
  customerAddress: string = "";
  customerPicName: string = "";


  constructor(data: Partial<WorkListDetailModel>) {
    super();
    this.update(data);
  }
}
