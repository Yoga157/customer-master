import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

 export default class SoftwareToolModelAdd extends BaseModel {
    value:string = '';
    empID:number = 0;

  constructor(data: Partial<SoftwareToolModelAdd>){
    super();
    this.update(data)
  }

  public update(data: Partial<SoftwareToolModelAdd>): void {
      const conversionOptions: IConversionOption = {
        value:ConversionTypeEnum.String,
        empID:ConversionTypeEnum.Number,
      };

      super.update(data, conversionOptions);
  }
 }
