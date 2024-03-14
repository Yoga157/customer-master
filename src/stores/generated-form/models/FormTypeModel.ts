import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FormTypeModel extends BaseModel {
  textData: string = '';
  valueData: number = 0;
    
    constructor(data: Partial<FormTypeModel>) {
      super();
  
      this.update(data);
    }

  }


