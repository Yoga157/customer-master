import { BaseModel} from 'sjs-base-model';


export class RowHardwareSoftwareModel extends BaseModel {
      quotaBrandID: number = 0;
      brandName: string = '';
      quotaPrincipal: number = 0;
      minQuota: number = 0;
      brandChoice: number = 0;
      quotaGPM: number = 0;
      brandAchieve: number = 0;
      effectiveDate: string = '';
      expireDate: string = '';
  }
export class RowServiceModel extends BaseModel {
      quotaBrandID: number = 0;
      brandName: null | string = '';
      quotaCompany: number = 0;
      minQuota: number = 0;
      effectiveDate: string = '';
      expireDate: string = '';
  }

export class HardwareSoftwareModel extends BaseModel {
      quotaName: null | string = '';
      achieveInformation: string = '';
      minAchieve: number = 0;
      minChoice: number = 0;
      rows:RowHardwareSoftwareModel[];
  }
export class ServiceModel extends BaseModel {
      quotaName: null | string = '';
      achieveInformation: string = '';
      minAchieve: number = 0;
      minChoice: number = 0;
      rows:RowServiceModel[];
  }

export default class QuotaMasterModel extends BaseModel {
  salesID: number = 0;
  salesName: string = '';
  salesDomain: string = '';
  salesInfo: string = '';
  directorat: string = '';
  quotaGPM: number = 0;
  mustFullDistributed: number = 0;

  quotaSelling: number = 0;
  unsetQuotaPeople: number = 0;
  notFullDistributed: number = 0;
  
  quotaEffective: string = '';
  hardware: HardwareSoftwareModel;
  software: HardwareSoftwareModel;
  service: ServiceModel;
    
    constructor(data: Partial<QuotaMasterModel>) {
      super();
  
      this.update(data);
    }

  }
