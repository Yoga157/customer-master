import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class QuotaBrandHardwareModelMaster extends BaseModel {
  quotaBrandID: number = 0;
  brandName: string = '';
  quotaPrincipal: number = 0;
  minQuota: number = 0;
  effectiveDate: string = '';
  expireDate: string = '';
    
    constructor(data: Partial<QuotaBrandHardwareModelMaster>) {
      super();
  
      this.update(data);
    }QuotaMaster

  }
