import { BaseModel } from 'sjs-base-model';



export class DataDetailMilestones extends BaseModel {
  taskId: number = 0;
  title: string = "";
  description: string = "";
  remark: string = "";
  actualStartDate: string = "";
  actualEndDate: string = "";
  precentageTask: number = 0;
  taskStatus: string = "";
  isMilestone: boolean = false;

  constructor(data: Partial<DataDetailMilestones>) {
    super();
    this.update(data);
  }
}


export default class PMOProgressDetailMilestone extends BaseModel {
  progresses: DataDetailMilestones[];

  constructor(data: Partial<PMOProgressDetailMilestone>) {
    super();
    this.update(data);
  }
}