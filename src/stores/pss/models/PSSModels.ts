import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class PSSModels extends BaseModel {
  customerName: string = '';
  projectName: string = '';
  projectID: string = '';
  reference: string = '';
  preparedBy: string = '';
  docVersionNumber: string = '';
  docVersionDate: string = '';
  email: string = '';
  salesName: string = '';
  salesEmail: string = '';
  presalesName: string = '';
  presalesEmail: string = '';
  customerPICName: string = '';
  customerPICEmail: string = '';
    
    constructor(data: Partial<PSSModels>) {
      super();
  
      this.update(data);
    }

  }


