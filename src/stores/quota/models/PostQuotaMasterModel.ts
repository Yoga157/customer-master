import { BaseModel } from 'sjs-base-model';

export default class PostQuotaMasterModel extends BaseModel {
  salesID: number = 0;
  salesDomain: string = '';
  effectiveDate: Date;
  quotaGPM: number = 0;
  quotaSelling: number = 0;
  brandHardware: string = '';
  brandSoftware: string = '';
  createUserID: number = 0;
    
    constructor(data: Partial<PostQuotaMasterModel>) {
      super();
      this.update(data);
    }

  }
