import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelSASearchModel extends BaseModel {
  page: number = 0
  pageSize: number = 0
  formType: number = 0
  funnelGenID: string = ""
  saNo: string = ""
  projectName: string =  ""
  customerName:string = ""
  salesName: string = ""
  funnelDate: string =  ""
  saDate: string = ""
  so: string = '';
    
    constructor(data: Partial<FunnelSASearchModel>){
      super();
      this.update(data)
    } 

    public update(data: Partial<FunnelSASearchModel>): void {
        const conversionOptions: IConversionOption = {
            page:ConversionTypeEnum.Number,
            pageSize:ConversionTypeEnum.Number,
            formType:ConversionTypeEnum.Number,
            funnelGenID:ConversionTypeEnum.String,
            saNo:ConversionTypeEnum.String,
            projectName:ConversionTypeEnum.String,
            customerName:ConversionTypeEnum.String,
            salesName:ConversionTypeEnum.String,
            funnelDate:ConversionTypeEnum.String,
            saDate:ConversionTypeEnum.String,
            so: ConversionTypeEnum.String
        };
  
        super.update(data, conversionOptions);
    }
}
  