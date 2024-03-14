import { BaseModel} from 'sjs-base-model';

export default class QuotaModelByEntryKey extends BaseModel {
  udcid: number = 0;
  entryKey: string = '';
  dateTime1: string = '';
  dateTime2: string = '';
    
    constructor(data: Partial<QuotaModelByEntryKey>) {
      super();
  
      this.update(data);
    }

  }
