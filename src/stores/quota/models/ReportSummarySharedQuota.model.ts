
import { BaseModel} from 'sjs-base-model';

export default class ReportSummarySharedQuota extends BaseModel {
  textData: string = '';
  valueData: string = ''
    
    constructor(data: Partial<ReportSummarySharedQuota>) {
      super();
  
      this.update(data);
    }

  }