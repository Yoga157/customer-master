import { BaseModel } from 'sjs-base-model';

export default class PMOViewEditStatus extends BaseModel {
  totalTask: number = 0;
  completeTask: number = 0;
  precentageTask: number = 0;
  firstActualStartDate: string = "";
  lastActualEndDate: string = "";

  constructor(data: Partial<PMOViewEditStatus>) {
    super();
    this.update(data);
  }
}
