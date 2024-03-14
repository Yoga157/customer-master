import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class QuotaServiceModelMaster extends BaseModel {
  quotaBrandID: number = 0;
  brandName: string = '';
  quotaCompany: number = 0;
  minQuota: number = 0;
  effectiveDate: string = '';
  expireDate: string = '';
    
    constructor(data: Partial<QuotaServiceModelMaster>) {
      super();
  
      this.update(data);
    }

  }


