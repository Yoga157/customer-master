import { BaseModel} from 'sjs-base-model';

export default class SummaryQuotaModel extends BaseModel {
  salesID: number = 0;
  quotaGPM: number = 0;
  unsetQuotaPeople: number = 0;
  notFullDistributed: number = 0;
    
    constructor(data: Partial<SummaryQuotaModel>) {
      super();
  
      this.update(data);
    }

  }
