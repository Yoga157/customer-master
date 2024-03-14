import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelPOSearchModel extends BaseModel {
  page: number = 0
  pageSize: number = 0
  po: string = ""
  customer: string = ""
  supplier: string =  ""
  projectName: string =  ""
  projectAmount: number = 0
  bu:string = ""
    
    constructor(data: Partial<FunnelPOSearchModel>){
      super();
      this.update(data)
    } 

    public update(data: Partial<FunnelPOSearchModel>): void {
        const conversionOptions: IConversionOption = {
            page:ConversionTypeEnum.Number,
            pageSize:ConversionTypeEnum.Number,
            po:ConversionTypeEnum.String,
            customer:ConversionTypeEnum.String,
            supplier:ConversionTypeEnum.String,
            bu:ConversionTypeEnum.String,
            projectName:ConversionTypeEnum.String,
            projectAmount:ConversionTypeEnum.Number,
        };
  
        super.update(data, conversionOptions);
    }
}
  