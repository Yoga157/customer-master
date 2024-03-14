import { BaseModel } from 'sjs-base-model';

export default class PMOProjectActivity extends BaseModel {  
  
  activityTitle: string = '';
  assignTo: string = '';
  assignCc: string = '';
  activityStart: string = null;
  activityEnd: string = null;
  activityText: string = '';
  activityRemark: string = '';
  docNumber: string = '';

  constructor(data: Partial<PMOProjectActivity>) {
    super();

    this.update(data);
  }
}
