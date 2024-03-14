import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelSAObjectModel extends BaseModel {
  textData: string = '';
  valueData: number = 0;
    
    constructor(data: Partial<FunnelSAObjectModel>) {
      super();
  
      this.update(data);
    }

  }


