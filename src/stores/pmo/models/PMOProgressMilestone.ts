import { BaseModel } from 'sjs-base-model';

export default class PMOProgressMilestone extends BaseModel {
  totalTask: number = 0;
  completeTask: number = 0;
  precentageTask: number = 0;
  firstActualStartDate: string = "";
  lastActualEndDate: string = "";
  lastTaskId: number = 0;
  lastIsMilestone: number = 0;
  lastTitle: string = "";
  lastDescription: string = "";

  
  constructor(data: Partial<PMOProgressMilestone>) {
    super();
    this.update(data);
  }
}
