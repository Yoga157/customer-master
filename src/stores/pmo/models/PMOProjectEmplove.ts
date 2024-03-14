import { BaseModel } from 'sjs-base-model';
import PMOProject from './PMOProject';
import PMOProjectActivity from './PMOProjectActivity';

export default class PMOProjectEmplove extends BaseModel {  
  pmoProject: PMOProject;
  pmoActivity: PMOProjectActivity;
  createDate: string = '';
  createUserID: number  = 0;

  constructor(data: Partial<PMOProjectEmplove>) {
    super();
    this.update(data);
  }
}
