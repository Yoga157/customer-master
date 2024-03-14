import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelSALinkToModel extends BaseModel {
  funnelGenID: string = ""
  saNo: string = ""
  customerGenID: string = ""
  projectName: string =  ""
  customerName:string = ""
  salesName: string = ""
  projectAmount: number = 0
  customerAddress: string = ""
  funnelDate: string =  ""
  saDate: string = ""
  so: string = ""
    
    constructor(data: Partial<FunnelSALinkToModel>){
      super();
      this.update(data)
    } 

    public update(data: Partial<FunnelSALinkToModel>): void {
        const conversionOptions: IConversionOption = {
            funnelGenID:ConversionTypeEnum.String,
            saNo:ConversionTypeEnum.String,
            customerGenID:ConversionTypeEnum.String,
            projectName:ConversionTypeEnum.String,
            customerName:ConversionTypeEnum.String,
            salesName:ConversionTypeEnum.String,
            saDate:ConversionTypeEnum.String,
            funnelDate:ConversionTypeEnum.String,
            so:ConversionTypeEnum.String,
            customerAddress:ConversionTypeEnum.String,
            projectAmount:ConversionTypeEnum.Number
        };
  
        super.update(data, conversionOptions);
    }
}
  