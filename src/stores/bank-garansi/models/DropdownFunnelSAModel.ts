import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class DropdownFunnelSAModel extends BaseModel {
  textData: string = ""
  valueData: string = ""
    
    constructor(data: Partial<DropdownFunnelSAModel>){
      super();
      this.update(data)
    } 

    public update(data: Partial<DropdownFunnelSAModel>): void {
        const conversionOptions: IConversionOption = {
            textData:ConversionTypeEnum.String,
            valueData:ConversionTypeEnum.String,
        };
  
        super.update(data, conversionOptions);
    }
}
  