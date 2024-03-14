import { BaseModel } from 'sjs-base-model';



export class quotaTeams extends BaseModel{
  salesID: number = 0;
  salesDomain: string = '';
  quotaGPM: number = 0;
  quotaSelling: number = 0;
}

export default class PostQuotaTeamModel extends BaseModel {
  salesID: number = 0;
  salesDomain: string = '';
  effectiveDate: Date;
  createUserID: number = 0;
  quotaTeams: quotaTeams[];
    
    constructor(data: Partial<PostQuotaTeamModel>) {
      super();
      this.update(data);
    }

  }

